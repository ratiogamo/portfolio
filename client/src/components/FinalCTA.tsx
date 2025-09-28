const FinalCTA = () => {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold font-inter mb-4">Ready to Transform Your Business?</h2>
        <p className="max-w-2xl mx-auto mb-8">
          A 2-hour strategy session is the first step towards a more efficient and secure business. Let's build your implementation roadmap together.
        </p>
        <div className="flex justify-center">
          <button
            data-cal-link="ratio/30min"
            data-cal-config='{"layout":"month_view"}'
            className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg text-center transition-all duration-300 hover:bg-gray-200"
          >
            Book Your Strategy Session
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;