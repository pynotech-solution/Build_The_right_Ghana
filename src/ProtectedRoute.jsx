import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const lastActivity = localStorage.getItem('lastActivity');
        const now = Date.now();
        const maxInactivity = 30 * 60 * 60 * 1000; // 30 hours

        if (lastActivity && (now - parseInt(lastActivity) > maxInactivity)) {
          await signOut(auth);
          localStorage.removeItem('lastActivity');
          setUser(null);
        } else {
          localStorage.setItem('lastActivity', now.toString());
          setUser(currentUser);
        }
      } else {
        setUser(null);
        localStorage.removeItem('lastActivity');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const updateActivity = () => localStorage.setItem('lastActivity', Date.now().toString());
    const checkInactivity = async () => {
      const lastActivity = localStorage.getItem('lastActivity');
      if (lastActivity && (Date.now() - parseInt(lastActivity) >  10 * 1000)) {
        await signOut(auth);
        setUser(null);
      }
    };

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'mousemove'];
    events.forEach(e => window.addEventListener(e, updateActivity));
    const interval = setInterval(checkInactivity, 60000); // Check every minute

    return () => {
      events.forEach(e => window.removeEventListener(e, updateActivity));
      clearInterval(interval);
    };
  }, [user]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  
  if (!user) return <Navigate to="/admin/login" />;

  return children;
};

export default ProtectedRoute;