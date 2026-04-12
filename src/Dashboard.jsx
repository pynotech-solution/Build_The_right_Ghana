import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { createUserWithEmailAndPassword, signOut, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { auth, db, secondaryAuth } from './firebase';
import AdminsSection from './Components/Dashboard/AdminsSection';
import DashboardHeader from './Components/Dashboard/DashboardHeader';
import DashboardSidebar from './Components/Dashboard/DashboardSidebar';
import PaymentSection from './Components/Dashboard/PaymentSection';
import PostFormPanel from './Components/Dashboard/PostFormPanel';
import PostList from './Components/Dashboard/PostList';
import PostPreviewCard from './Components/Dashboard/PostPreviewCard';
import { EMPTY_PAYMENT_FORM, EMPTY_POST_FORM, PREDEFINED_CATEGORIES } from './Components/Dashboard/constants';
import AddAdminModal from './Components/Dashboard/Modals/AddAdminModal';
import ChangePasswordModal from './Components/Dashboard/Modals/ChangePasswordModal';
import ConfirmationModal from './Components/Dashboard/Modals/ConfirmationModal';
import NotificationModal from './Components/Dashboard/Modals/NotificationModal';
import RemoveAdminInstructionsModal from './Components/Dashboard/Modals/RemoveAdminInstructionsModal';
import { createSlug, normalizeEmail } from './Components/Dashboard/utils';

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dnzff0rjy';
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'BUILD_THE_RIGHT_GHANA';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [formData, setFormData] = useState(EMPTY_POST_FORM);
  const [paymentForm, setPaymentForm] = useState(EMPTY_PAYMENT_FORM);
  const [loading, setLoading] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editPaymentId, setEditPaymentId] = useState(null);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [allAdmins, setAllAdmins] = useState([]);
  const [dynamicSuperAdmins, setDynamicSuperAdmins] = useState([]);
  const [accessDenied, setAccessDenied] = useState(false);
  const [loggedInAdminData, setLoggedInAdminData] = useState(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [trackEmail, setTrackEmail] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminRole, setNewAdminRole] = useState('admin');
  const [adminStatus, setAdminStatus] = useState({ type: '', message: '' });
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [removeAdminModal, setRemoveAdminModal] = useState({ show: false, email: '' });
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordStatus, setPasswordStatus] = useState({ type: '', message: '' });
  const [confirmation, setConfirmation] = useState({
    show: false,
    title: '',
    message: '',
    action: null,
    isDestructive: false,
    withInput: false,
    inputPlaceholder: '',
    inputValue: '',
    isProcessing: false,
  });
  const [notification, setNotification] = useState({
    show: false,
    type: '',
    message: '',
    actionLabel: '',
    onAction: null,
  });

  const navigate = useNavigate();
  const previewDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const currentUserEmail = auth.currentUser?.email || '';
  const formattedCurrentUserEmail = normalizeEmail(currentUserEmail);
  const superAdminEmails = useMemo(
    () =>
      (import.meta.env.VITE_SUPER_ADMIN_EMAILS || '')
        .split(',')
        .map((email) => normalizeEmail(email))
        .filter(Boolean),
    []
  );

  const isRootAdmin = superAdminEmails.includes(formattedCurrentUserEmail);
  const isSuperAdmin = isRootAdmin || dynamicSuperAdmins.includes(formattedCurrentUserEmail);
  const currentUserCanCreateSuperAdmin = isRootAdmin || loggedInAdminData?.canCreateSuperAdmin === true;

  const combinedAdmins = useMemo(
    () => [
      ...(isRootAdmin
        ? superAdminEmails.map((email) => ({
            email,
            isRoot: true,
            isDisabled: false,
            canCreateSuperAdmin: true,
          }))
        : []),
      ...allAdmins
        .filter((admin) => !superAdminEmails.includes(admin.email))
        .map((admin) => ({
          email: admin.email,
          isRoot: false,
          isDisabled: Boolean(admin.isDisabled),
          canCreateSuperAdmin: Boolean(admin.canCreateSuperAdmin),
          createdBy: admin.createdBy,
          statusModifiedBy: admin.statusModifiedBy,
          permissionModifiedBy: admin.permissionModifiedBy,
          roleModifiedBy: admin.roleModifiedBy,
          disableReason: admin.disableReason,
        })),
    ],
    [allAdmins, isRootAdmin, superAdminEmails]
  );

  const showNotification = useCallback((type, message, options = {}) => {
    setNotification({
      show: true,
      type,
      message,
      actionLabel: options.actionLabel || '',
      onAction: options.onAction || null,
    });
  }, []);

  const closeNotification = () => {
    setNotification({ show: false, type: '', message: '', actionLabel: '', onAction: null });
  };

  const triggerConfirmation = (title, message, action, isDestructive = false, withInput = false, inputPlaceholder = '') => {
    setConfirmation({ show: true, title, message, action, isDestructive, withInput, inputPlaceholder, inputValue: '', isProcessing: false });
  };

  const closeConfirmation = () => {
    setConfirmation({ show: false, title: '', message: '', action: null, isDestructive: false, withInput: false, inputPlaceholder: '', inputValue: '', isProcessing: false });
  };

  const handleConfirmAction = async () => {
    setConfirmation((prev) => ({ ...prev, isProcessing: true }));
    try {
      if (confirmation.action) {
        await confirmation.action(confirmation.inputValue);
      }
    } finally {
      closeConfirmation();
    }
  };

  const resetPostForm = () => {
    setFormData(EMPTY_POST_FORM);
    setIsCustomCategory(false);
    setEditId(null);
  };

  const resetPaymentForm = () => {
    setPaymentForm(EMPTY_PAYMENT_FORM);
    setEditPaymentId(null);
  };

  const fetchPosts = useCallback(async () => {
    try {
      const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(postsQuery);
      setPosts(querySnapshot.docs.map((snapshot) => ({ id: snapshot.id, ...snapshot.data() })));
    } catch (error) {
      console.error('Error fetching posts:', error);
      showNotification('error', 'Failed to load posts.');
    }
  }, [showNotification]);

  const fetchPaymentMethods = useCallback(async () => {
    try {
      const paymentQuery = query(collection(db, 'paymentMethods'));
      const querySnapshot = await getDocs(paymentQuery);
      setPaymentMethods(querySnapshot.docs.map((snapshot) => ({ id: snapshot.id, ...snapshot.data() })));
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      showNotification('error', 'Failed to load payment methods.');
    }
  }, [showNotification]);

  const fetchDynamicSuperAdmins = useCallback(async () => {
    try {
      const superAdminQuery = query(collection(db, 'superAdmins'));
      const querySnapshot = await getDocs(superAdminQuery);
      setDynamicSuperAdmins(querySnapshot.docs.map((snapshot) => snapshot.id));
    } catch (error) {
      console.error('Error fetching super admins:', error);
      showNotification('error', 'Failed to load super admin permissions.');
    }
  }, [showNotification]);

  const fetchAllAdmins = useCallback(async () => {
    try {
      const adminQuery = query(collection(db, 'allAdmins'));
      const querySnapshot = await getDocs(adminQuery);
      setAllAdmins(querySnapshot.docs.map((snapshot) => snapshot.data()));
    } catch (error) {
      if (error.code !== 'permission-denied') {
        console.error('Error fetching all admins:', error);
        showNotification('error', 'Failed to load the admin directory.');
      }
    }
  }, [showNotification]);

  useEffect(() => {
    const checkDisabledStatus = async () => {
      const email = auth.currentUser?.email;
      if (!email) {
        setIsCheckingStatus(false);
        return;
      }

      const formattedEmail = normalizeEmail(email);
      if (superAdminEmails.includes(formattedEmail)) {
        setLoggedInAdminData({ email: formattedEmail, isDisabled: false, canCreateSuperAdmin: true });
        setIsCheckingStatus(false);
        return;
      }

      try {
        const adminDoc = await getDoc(doc(db, 'allAdmins', formattedEmail));
        if (adminDoc.exists()) {
          const data = adminDoc.data();
          setLoggedInAdminData(data);
          setAccessDenied(Boolean(data.isDisabled));
        } else {
          setLoggedInAdminData({ email: formattedEmail, isDisabled: false, canCreateSuperAdmin: false });
        }
      } catch (error) {
        console.error('Error checking disabled status:', error);
        setLoggedInAdminData({ email: formattedEmail, isDisabled: false, canCreateSuperAdmin: false });
      } finally {
        setIsCheckingStatus(false);
      }
    };

    checkDisabledStatus();
    fetchPosts();
    fetchPaymentMethods();
    fetchDynamicSuperAdmins();
    fetchAllAdmins();
  }, [fetchAllAdmins, fetchDynamicSuperAdmins, fetchPaymentMethods, fetchPosts, superAdminEmails]);

  const handleLogout = () => {
    triggerConfirmation('Logout', 'Are you sure you want to logout?', async () => {
      await signOut(auth);
      navigate('/admin/login');
    });
  };

  const openAdminModal = () => {
    setAdminModalOpen(true);
    setIsSidebarOpen(false);
  };

  const closeAdminModal = () => {
    setAdminModalOpen(false);
    setAdminStatus({ type: '', message: '' });
  };

  const handleCreateAdmin = async (event) => {
    event.preventDefault();
    setAdminStatus({ type: 'loading', message: 'Creating admin...' });

    const formattedEmail = normalizeEmail(newAdminEmail);
    if (!formattedEmail || !newAdminPassword.trim()) {
      setAdminStatus({ type: 'error', message: 'Email and password are required.' });
      return;
    }

    try {
      await createUserWithEmailAndPassword(secondaryAuth, formattedEmail, newAdminPassword);
      await signOut(secondaryAuth);

      if (newAdminRole === 'superadmin') {
        await setDoc(doc(db, 'superAdmins', formattedEmail), {
          email: formattedEmail,
          createdAt: serverTimestamp(),
          upgradedBy: currentUserEmail,
        });
      }

      await setDoc(
        doc(db, 'allAdmins', formattedEmail),
        {
          email: formattedEmail,
          createdAt: serverTimestamp(),
          canCreateSuperAdmin: false,
          createdBy: currentUserEmail,
        },
        { merge: true }
      );

      setAdminStatus({ type: 'success', message: 'New admin successfully created!' });
      setNewAdminEmail('');
      setNewAdminPassword('');
      setNewAdminRole('admin');
      await Promise.all([fetchDynamicSuperAdmins(), fetchAllAdmins()]);

      window.setTimeout(() => {
        closeAdminModal();
      }, 2000);
    } catch (error) {
      console.error('Error creating admin:', error);
      setAdminStatus({ type: 'error', message: error.message || 'Failed to create admin.' });
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    if (!passwordForm.currentPassword) {
      setPasswordStatus({ type: 'error', message: 'Current password is required.' });
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordStatus({ type: 'error', message: 'Passwords do not match.' });
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordStatus({ type: 'error', message: 'Password must be at least 6 characters.' });
      return;
    }

    setPasswordStatus({ type: 'loading', message: 'Verifying & updating password...' });
    try {
      const credential = EmailAuthProvider.credential(auth.currentUser.email, passwordForm.currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      
      await updatePassword(auth.currentUser, passwordForm.newPassword);
      setPasswordStatus({ type: 'success', message: 'Password updated successfully!' });
      setTimeout(() => {
        setPasswordModalOpen(false);
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setPasswordStatus({ type: '', message: '' });
      }, 2000);
    } catch (error) {
      console.error('Error updating password:', error);
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        setPasswordStatus({ type: 'error', message: 'Incorrect current password.' });
      } else if (error.code === 'auth/requires-recent-login') {
        setPasswordStatus({ type: 'error', message: 'This operation requires a recent login. Please log out and log back in to change your password.' });
      } else {
        setPasswordStatus({ type: 'error', message: error.message || 'Failed to update password.' });
      }
    }
  };

  const handleUpgradeAdmin = (email) => {
    triggerConfirmation('Upgrade to Super Admin', `Are you sure you want to grant Super Admin privileges to ${email}?`, async () => {
      try {
        await setDoc(doc(db, 'superAdmins', email), {
          email,
          createdAt: serverTimestamp(),
          upgradedBy: currentUserEmail,
        });
        await setDoc(
          doc(db, 'allAdmins', email),
          {
            roleModifiedBy: currentUserEmail,
            roleModifiedAt: serverTimestamp(),
          },
          { merge: true }
        );
        await Promise.all([fetchDynamicSuperAdmins(), fetchAllAdmins()]);
        showNotification('success', `${email} is now a Super Admin!`);
      } catch (error) {
        console.error('Error upgrading admin:', error);
        showNotification('error', 'Failed to upgrade admin.');
      }
    });
  };

  const handleTrackAdmin = async (event) => {
    event.preventDefault();
    const formattedEmail = normalizeEmail(trackEmail);
    if (!formattedEmail) return;

    setIsTracking(true);
    try {
      await setDoc(
        doc(db, 'allAdmins', formattedEmail),
        {
          email: formattedEmail,
          createdAt: serverTimestamp(),
          canCreateSuperAdmin: false,
          createdBy: currentUserEmail,
        },
        { merge: true }
      );
      setTrackEmail('');
      await fetchAllAdmins();
      showNotification('success', `${formattedEmail} added to the tracking list!`);
    } catch (error) {
      console.error('Error tracking admin:', error);
      showNotification('error', 'Failed to track admin.');
    } finally {
      setIsTracking(false);
    }
  };

  const handleRevokeSuperAdmin = (email) => {
    triggerConfirmation(
      'Revoke Super Admin',
      `Are you sure you want to revoke Super Admin privileges from ${email}? They will become a regular admin.`,
      async () => {
        try {
          await deleteDoc(doc(db, 'superAdmins', email));
          await setDoc(
            doc(db, 'allAdmins', email),
            {
              roleModifiedBy: currentUserEmail,
              roleModifiedAt: serverTimestamp(),
            },
            { merge: true }
          );
          await Promise.all([fetchDynamicSuperAdmins(), fetchAllAdmins()]);
          showNotification('success', 'Privileges revoked successfully!');
        } catch (error) {
          console.error('Error revoking super admin:', error);
          showNotification('error', 'Failed to revoke super admin privileges.');
        }
      },
      true
    );
  };

  const handleRemoveAdmin = (email) => {
    if (!isRootAdmin) {
      showNotification('error', 'Only the Root Admin can permanently remove other admins.');
      return;
    }

    triggerConfirmation(
      'Remove Admin Access',
      `Are you sure you want to remove ${email}? They will be disabled immediately, but you must manually delete their account in Firebase to fully complete the removal.`,
      async () => {
        try {
          await setDoc(
            doc(db, 'allAdmins', email),
            {
              isDisabled: true,
              statusModifiedBy: currentUserEmail,
              statusModifiedAt: serverTimestamp(),
            },
            { merge: true }
          );
          if (dynamicSuperAdmins.includes(email)) {
            await deleteDoc(doc(db, 'superAdmins', email));
          }
          await Promise.all([fetchAllAdmins(), fetchDynamicSuperAdmins()]);
          setRemoveAdminModal({ show: true, email });
        } catch (error) {
          console.error('Error removing admin:', error);
          showNotification('error', 'Failed to remove admin.');
        }
      },
      true
    );
  };

  const handleToggleDisableAdmin = (email, currentlyDisabled) => {
    const isSelf = currentUserEmail && email === normalizeEmail(currentUserEmail);
    const isDisabling = !currentlyDisabled;

    triggerConfirmation(
      currentlyDisabled ? 'Enable Admin' : (isSelf ? 'Disable Your Account' : 'Disable Admin'),
      isSelf 
        ? 'Are you sure you want to disable your own account? You will be immediately logged out and locked out of the dashboard. You will need another Super Admin to re-enable your access.'
        : `Are you sure you want to ${currentlyDisabled ? 'enable' : 'disable'} ${email}? ${currentlyDisabled ? 'They will regain access to manage the platform.' : 'They will be completely blocked from creating, editing, or deleting anything.'}`,
      async (reason) => {
        try {
          const updateData = {
            isDisabled: !currentlyDisabled,
            statusModifiedBy: currentUserEmail,
            statusModifiedAt: serverTimestamp(),
          };

          if (isDisabling && reason && reason.trim() !== '') {
            updateData.disableReason = reason.trim();
          } else if (!isDisabling) {
            updateData.disableReason = null; // Clear reason if re-enabled
          }
          
          await setDoc(doc(db, 'allAdmins', email), updateData, { merge: true });
          
          if (isSelf && !currentlyDisabled) {
            showNotification('success', 'Your account has been successfully disabled. Logging you out securely...');
            setTimeout(async () => {
              await signOut(auth);
              navigate('/admin/login');
            }, 3500);
            return;
          }

          await fetchAllAdmins();
          showNotification('success', `Admin successfully ${currentlyDisabled ? 'enabled' : 'disabled'}!`);
        } catch (error) {
          console.error('Error toggling admin status:', error);
          showNotification('error', 'Failed to update admin status.');
        }
      },
      isDisabling,
      isDisabling,
      isDisabling ? (isSelf ? 'Optional: Why are you disabling your account?' : 'Optional: Reason for disabling') : ''
    );
  };

  const handleToggleCreateSuperAdmin = (email, currentStatus) => {
    triggerConfirmation(
      currentStatus ? 'Revoke Super Admin Creation' : 'Allow Super Admin Creation',
      `Are you sure you want to ${currentStatus ? 'revoke' : 'grant'} permission for ${email} to create other Super Admins?`,
      async () => {
        try {
          await setDoc(
            doc(db, 'allAdmins', email),
            {
              canCreateSuperAdmin: !currentStatus,
              permissionModifiedBy: currentUserEmail,
              permissionModifiedAt: serverTimestamp(),
            },
            { merge: true }
          );
          await fetchAllAdmins();
          showNotification('success', 'Permission successfully updated!');
        } catch (error) {
          console.error('Error toggling permission:', error);
          showNotification('error', 'Failed to update permission.');
        }
      }
    );
  };

  const handleDisableSelf = () => {
    triggerConfirmation(
      'Disable Your Account',
      'Are you sure you want to disable your own account? You will be immediately logged out and locked out of the dashboard. You will need a Super Admin to re-enable your access.',
      async (reason) => {
        try {
          const updateData = {
            isDisabled: true,
            statusModifiedBy: formattedCurrentUserEmail,
            statusModifiedAt: serverTimestamp(),
          };

          if (reason && reason.trim() !== '') {
            updateData.disableReason = reason.trim();
          }

          await setDoc(doc(db, 'allAdmins', formattedCurrentUserEmail), updateData, { merge: true });
          showNotification('success', 'Your account has been successfully disabled. Logging you out securely...');
          setTimeout(async () => {
            await signOut(auth);
            navigate('/admin/login');
          }, 3500);
        } catch (error) {
          console.error('Error disabling self:', error);
          showNotification('error', 'Failed to disable your account.');
        }
      },
      true,
      true,
      'Optional: Why are you disabling your account?'
    );
  };

  const updatePostField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const updatePaymentField = (field, value) => {
    setPaymentForm((current) => ({ ...current, [field]: value }));
  };

  const handleCategoryChange = (value) => {
    if (value === 'Other') {
      setIsCustomCategory(true);
      updatePostField('category', '');
      return;
    }
    setIsCustomCategory(false);
    updatePostField('category', value);
  };

  const uploadFile = async (file) => {
    if (!file) return;

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      showNotification('error', 'Cloudinary configuration is missing. Please check your .env file.');
      return;
    }

    setUploading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    data.append('cloud_name', CLOUDINARY_CLOUD_NAME);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: data,
      });
      const fileData = await response.json();

      if (!response.ok || !fileData.secure_url) {
        throw new Error(fileData.error?.message || 'Cloudinary upload failed.');
      }

      updatePostField('imageUrl', fileData.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
      showNotification('error', error.message || 'Error uploading image.');
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await uploadFile(file);
  };

  const handlePaste = async (event) => {
    const items = event.clipboardData?.items || [];
    for (const item of items) {
      if (item.type.includes('image')) {
        event.preventDefault();
        await uploadFile(item.getAsFile());
        break;
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = formData.title.trim();
    const trimmedCategory = formData.category.trim();
    const trimmedExcerpt = formData.excerpt.trim();
    const trimmedContent = formData.content.trim();
    const trimmedImageUrl = formData.imageUrl.trim();

    if (!trimmedTitle || !trimmedCategory || !trimmedExcerpt || !trimmedContent) {
      showNotification('error', 'Please complete all post fields before saving.');
      return;
    }

    if (!trimmedImageUrl) {
      showNotification('error', 'Please upload an image for the post.');
      return;
    }

    triggerConfirmation(editId ? 'Update Post' : 'Publish Post', `Are you sure you want to ${editId ? 'update' : 'publish'} this post?`, processSubmit);
  };

  const processSubmit = async () => {
    setLoading(true);
    const sanitizedPost = {
      title: formData.title.trim(),
      category: formData.category.trim(),
      excerpt: formData.excerpt.trim(),
      imageUrl: formData.imageUrl.trim(),
      content: formData.content.trim(),
    };

    try {
      const slug = createSlug(sanitizedPost.title);
      if (!slug) {
        throw new Error('Please enter a valid title before saving.');
      }

      if (editId) {
        await updateDoc(doc(db, 'posts', editId), {
          ...sanitizedPost,
          slug,
          lastEditedBy: currentUserEmail,
          lastEditedAt: serverTimestamp(),
        });
        showNotification('success', 'Post updated successfully!', {
          actionLabel: 'Check Blog Page',
          onAction: () => navigate('/blog'),
        });
      } else {
        await addDoc(collection(db, 'posts'), {
          ...sanitizedPost,
          slug,
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          createdAt: serverTimestamp(),
          createdBy: currentUserEmail,
        });
        showNotification('success', 'Post added successfully!', {
          actionLabel: 'Check Blog Page',
          onAction: () => navigate('/blog'),
        });
      }

      resetPostForm();
      await fetchPosts();
    } catch (error) {
      console.error('Error saving document:', error);
      showNotification('error', error.message || 'Error saving post.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSubmit = (event) => {
    event.preventDefault();

    const provider = paymentForm.provider.trim();
    const accountNumber = paymentForm.accountNumber.trim();
    const accountName = paymentForm.accountName.trim();

    if (!provider || !accountNumber || !accountName) {
      showNotification('error', 'Please complete all payment fields before saving.');
      return;
    }

    triggerConfirmation(
      editPaymentId ? 'Update Payment Method' : 'Add Payment Method',
      `Are you sure you want to ${editPaymentId ? 'update' : 'add'} this payment method?`,
      processPaymentSubmit
    );
  };

  const processPaymentSubmit = async () => {
    setLoading(true);
    const sanitizedPayment = {
      type: paymentForm.type,
      provider: paymentForm.provider.trim(),
      accountName: paymentForm.accountName.trim(),
      accountNumber: paymentForm.accountNumber.trim(),
    };

    try {
      if (editPaymentId) {
        await updateDoc(doc(db, 'paymentMethods', editPaymentId), {
          ...sanitizedPayment,
          lastEditedBy: currentUserEmail,
          lastEditedAt: serverTimestamp(),
        });
        showNotification('success', 'Payment method updated successfully!');
      } else {
        await addDoc(collection(db, 'paymentMethods'), {
          ...sanitizedPayment,
          createdBy: currentUserEmail,
          createdAt: serverTimestamp(),
        });
        showNotification('success', 'Payment method added successfully!');
      }

      resetPaymentForm();
      await fetchPaymentMethods();
    } catch (error) {
      console.error('Error saving payment method:', error);
      showNotification('error', error.message || 'Error saving payment method.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    triggerConfirmation(
      'Delete Post',
      'Are you sure you want to delete this post? This action cannot be undone.',
      async () => {
        try {
          await deleteDoc(doc(db, 'posts', id));
          await fetchPosts();
          showNotification('success', 'Post deleted successfully.');
        } catch (error) {
          console.error('Error deleting post:', error);
          showNotification('error', error.message || 'Failed to delete post.');
        }
      },
      true
    );
  };

  const handleDeletePayment = (id) => {
    triggerConfirmation(
      'Delete Payment Method',
      'Are you sure you want to delete this payment method? This action cannot be undone.',
      async () => {
        try {
          await deleteDoc(doc(db, 'paymentMethods', id));
          await fetchPaymentMethods();
          showNotification('success', 'Payment method deleted successfully.');
        } catch (error) {
          console.error('Error deleting payment method:', error);
          showNotification('error', error.message || 'Failed to delete payment method.');
        }
      },
      true
    );
  };

  const handleEdit = (post) => {
    setFormData({
      title: post.title || '',
      category: post.category || '',
      excerpt: post.excerpt || '',
      imageUrl: post.imageUrl || '',
      content: post.content || '',
    });
    setEditId(post.id);
    setIsCustomCategory(!PREDEFINED_CATEGORIES.includes(post.category));
    setActiveTab('posts');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditPayment = (method) => {
    setPaymentForm({
      type: method.type || 'momo',
      provider: method.provider || '',
      accountName: method.accountName || '',
      accountNumber: method.accountNumber || '',
    });
    setEditPaymentId(method.id);
    setActiveTab('payments');
  };

  const handleCancelEdit = () => {
    triggerConfirmation('Cancel Edit', 'Are you sure you want to cancel editing? Unsaved changes will be lost.', () => {
      resetPostForm();
    }, true);
  };

  const handleCancelPaymentEdit = () => {
    triggerConfirmation('Cancel Edit', 'Are you sure you want to cancel editing?', () => {
      resetPaymentForm();
    }, true);
  };

  if (isCheckingStatus) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#448c6c] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[#2d4e41] font-bold text-lg animate-pulse tracking-wide">Verifying Access...</p>
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="min-h-screen bg-[#1f362d] flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-4 bg-red-100 text-red-600">
            <X size={32} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h3>
          <p className="text-gray-600 mb-6">
            You do not have the required permissions to access this dashboard. Please contact the administrator if you need assistance.
          </p>
          <button
            onClick={async () => {
              await signOut(auth);
              navigate('/admin/login');
            }}
            className="px-8 py-3 w-full rounded-full font-bold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-lg"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar
        activeTab={activeTab}
        isSidebarOpen={isSidebarOpen}
        isDesktopSidebarOpen={isDesktopSidebarOpen}
        isSuperAdmin={isSuperAdmin}
        isRootAdmin={isRootAdmin}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={handleLogout}
        onDisableSelf={handleDisableSelf}
        onOpenAdminModal={openAdminModal}
        onChangePassword={() => setPasswordModalOpen(true)}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setIsSidebarOpen(false);
        }}
      />

      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${isDesktopSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
        <DashboardHeader
          activeTab={activeTab}
          currentUserEmail={currentUserEmail}
          isSuperAdmin={isSuperAdmin}
          loggedInAdminData={loggedInAdminData}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          isDesktopSidebarOpen={isDesktopSidebarOpen}
          onToggleDesktopSidebar={() => setIsDesktopSidebarOpen((prev) => !prev)}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          {activeTab === 'posts' && (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <PostFormPanel
                  editId={editId}
                  formData={formData}
                  isCustomCategory={isCustomCategory}
                  loading={loading}
                  uploading={uploading}
                  onCancelEdit={handleCancelEdit}
                  onCategoryChange={handleCategoryChange}
                  onFieldChange={updatePostField}
                  onImageUpload={handleImageUpload}
                  onPaste={handlePaste}
                  onSubmit={handleSubmit}
                />
              </div>
              <div className="lg:col-span-1">
                <PostPreviewCard formData={formData} previewDate={previewDate} />
              </div>
              <div className="lg:col-span-1">
                <PostList posts={posts} onDelete={handleDelete} onEdit={handleEdit} />
              </div>
            </div>
          )}

          {activeTab === 'payments' && isSuperAdmin && (
            <PaymentSection
              editPaymentId={editPaymentId}
              loading={loading}
              paymentForm={paymentForm}
              paymentMethods={paymentMethods}
              onCancelEdit={handleCancelPaymentEdit}
              onDelete={handleDeletePayment}
              onEdit={handleEditPayment}
              onFieldChange={updatePaymentField}
              onSubmit={handlePaymentSubmit}
            />
          )}

          {activeTab === 'admins' && isSuperAdmin && (
            <AdminsSection
              combinedAdmins={combinedAdmins}
              currentUserEmail={currentUserEmail}
              dynamicSuperAdmins={dynamicSuperAdmins}
              isRootAdmin={isRootAdmin}
              trackEmail={trackEmail}
              isTracking={isTracking}
              onFieldChange={setTrackEmail}
              onRemoveAdmin={handleRemoveAdmin}
              onRevokeSuperAdmin={handleRevokeSuperAdmin}
              onSubmit={handleTrackAdmin}
              onToggleCreateSuperAdmin={handleToggleCreateSuperAdmin}
              onToggleDisableAdmin={handleToggleDisableAdmin}
              onUpgradeAdmin={handleUpgradeAdmin}
            />
          )}
        </main>
      </div>

      <ConfirmationModal 
        confirmation={confirmation} 
        onClose={closeConfirmation} 
        onConfirm={handleConfirmAction} 
        onInputChange={(val) => setConfirmation(prev => ({ ...prev, inputValue: val }))}
      />
      <NotificationModal
        notification={notification}
        onClose={() => {
          closeNotification();
        }}
      />
      <AddAdminModal
        adminStatus={adminStatus}
        currentUserCanCreateSuperAdmin={currentUserCanCreateSuperAdmin}
        isOpen={adminModalOpen}
        newAdminEmail={newAdminEmail}
        newAdminPassword={newAdminPassword}
        newAdminRole={newAdminRole}
        onClose={closeAdminModal}
        onEmailChange={setNewAdminEmail}
        onPasswordChange={setNewAdminPassword}
        onRoleChange={setNewAdminRole}
        onSubmit={handleCreateAdmin}
      />
      <RemoveAdminInstructionsModal
        email={removeAdminModal.email}
        isOpen={removeAdminModal.show}
        onClose={() => setRemoveAdminModal({ show: false, email: '' })}
      />
      <ChangePasswordModal
        isOpen={passwordModalOpen}
        onClose={() => {
          setPasswordModalOpen(false);
          setPasswordStatus({ type: '', message: '' });
          setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        }}
        passwordForm={passwordForm}
        passwordStatus={passwordStatus}
        onFormChange={(field, value) => setPasswordForm(prev => ({ ...prev, [field]: value }))}
        onSubmit={handlePasswordSubmit}
      />
    </div>
  );
};

export default Dashboard;
