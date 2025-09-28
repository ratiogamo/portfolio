const profile = {
  profileUrl: "https://www.upwork.com/freelancers/~01139a1ed402cf0463"
};

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold font-inter mb-4">Ready to Start Your Project?</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Let's collaborate to bring your vision to life. I'm available for new projects and would love to discuss how I can help you achieve your goals.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#contact"
            className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-md font-medium transition-colors"
          >
            Contact Me
          </a>
          <a
            href={profile.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-md font-medium transition-colors"
          >
            View Upwork Profile
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;