const FinalCTA = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold font-inter mb-4 text-white">Ready to Transform Your Business?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-300">
            Your 2-hour strategy session is the first step to a more efficient, secure business. Let's build your implementation roadmap together.
          </p>
          <div className="flex justify-center">
            <button
              data-cal-link="ratio/30min"
              data-cal-config='{"layout":"month_view"}'
              className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg text-center transition-all duration-300 hover:bg-gray-200"
            >
              Book a Strategy Session
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;