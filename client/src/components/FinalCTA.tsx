const FinalCTA = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold font-inter mb-4 text-white">Your Automation Is Broken. Or It Should Be Better.</h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-300">
            Either way, a 2-hour emergency audit gives you the diagnosis and a concrete action plan. $200. Same-day availability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://buy.stripe.com/8x25kD6AB0AD7N06226oo0t"
              target="_blank"
              rel="noreferrer"
              className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg text-center transition-all duration-300 hover:bg-gray-200"
            >
              💳 Pay Now — $200 Emergency Audit
            </a>
            <a
              href="tel:+19545944040"
              className="bg-red-600/80 border border-red-400/40 text-white px-8 py-4 rounded-full font-bold text-lg text-center transition-all duration-300 hover:bg-red-500/90"
            >
              🚨 Call Now: 954-594-4040
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;