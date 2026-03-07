import React from 'react';

// 1. Sub-component for individual cards
const ProjectCard = ({ title, description, imageUrl }) => (
  <div className="flex flex-col border-2 border-[#448c6c]/30 rounded-sm overflow-hidden bg-white h-full shadow-sm hover:shadow-md transition-shadow">
    <div className="h-64 overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="p-8 flex flex-col items-center text-center flex-grow">
      <h4 className="text-[#2d4a3e] text-xl font-bold mb-4 uppercase underline decoration-1 underline-offset-4">
        {title}
      </h4>
      <p className="text-gray-600 leading-relaxed font-medium">
        {description}
      </p>
    </div>
  </div>
);

// 2. Main Projects Component
const Projects = () => {
  const projectData = [
    {
      title: "Empowering Women and Youth",
      description: "This training focuses on equipping women and the youth with the necessary tools and knowledge across various fields.",
      imageUrl: "https://www.buildtherightghana.org/images/576/19270605/IMG-20240421-WA0108-ooDYBjMOJAJz7b4rVE6a0A.jpg"
    },
    {
      title: "Initiatives for Alleviating Poverty",
      description: "Our mission is to extend a helping hand to the underprivileged. We believe every individual deserves access to basic necessities.",
      imageUrl: "https://www.buildtherightghana.org/images/576/19270611/IMG-20240421-WA0138-7eaw0f2FckSgFBKFP9P_Pg.jpg"
    },
    {
      title: "Sanitation and Personal Security",
      description: "We educate the ordinary Ghanaian on sanitation. We sometimes engage and organize clean-up exercises to promote cleanliness.",
      imageUrl: "https://www.buildtherightghana.org/images/1024/19270614/m6htl88kj1_1zoomlion-gmCBCzNBPxpSdvxdTvOFnQ.jpg"
    },
    {
        title: "Advocacy for Human Rights",
        description: "We offer our support by promoting and protecting the fundamental rights and freedoms that belong to every individual.",
        imageUrl: "https://www.buildtherightghana.org/images/576/19270615/humanrights-zSyCSi-RVGbg8FJEG18gIg.jpg"
      },
      {
        title: "Sustainable Agriculture",
        description: "A sustainable initiative promoting agriculture and employment opportunities and also help in cultivating a greener future.",
        imageUrl: "https://www.buildtherightghana.org/images/576/19270623/PLANTING-YE6q-QRZ3Ezip2x2uwPKOA.jpeg"
      },
      {
        title: "Environmental Conservation",
        description: "We promote initiatives and raise awareness aimed at preserving and protecting the natural environment.",
        imageUrl: "https://www.buildtherightghana.org/images/576/19270635/my_help_your_help_cover-braVjPg6QxlUBfAwef3pRw.jpg"
      }
  ];

  return (
    <div className="w-full">
      {/* Header Section */}
      <section className="bg-[#d9e8e0] py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-[#448c6c] font-bold underline decoration-2 underline-offset-8 uppercase tracking-widest mb-6">
            Our Projects
          </h3>
          <h2 className="text-5xl md:text-7xl font-bold text-[#2d4a3e] mb-10 leading-tight">
            What we’ve <br /> done so far
          </h2>
          <p className="text-gray-700 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-medium">
            Amongst many, we have specialized human rights education, sanitation advocacy, 
            poverty eradication education, women empowerment through skills training, 
            helping the less privileged in the society and planting for food and jobs.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projectData.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;