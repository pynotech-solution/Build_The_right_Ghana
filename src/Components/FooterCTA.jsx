const FooterCTA = () => {
  return (
    <section className="relative h-[60vh] flex items-center justify-center">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('src/assets/green_forest.png')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Let’s make a positive <br /> impact together
        </h2>
        <p className="text-white text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-medium">
          Nothing is too small to lend a helping hand. Together we can make the 
          world a better place for every individual.
        </p>
        <button className="bg-[#6db996] hover:bg-[#5aa885] text-white font-bold py-4 px-12 rounded-full transition-all uppercase text-lg shadow-xl">
          Donate Now
        </button>
      </div>
    </section>
  );
};

export default FooterCTA;