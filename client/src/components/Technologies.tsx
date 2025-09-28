const technologies = [
  { name: 'Make.com', logo: 'https://asset.brandfetch.io/id20mCI55N/idS_f-26h4.svg' },
  { name: 'Clio', logo: 'https://asset.brandfetch.io/idq5bIuPAc/id50b344Gs.svg' },
  { name: 'Microsoft Azure', logo: 'https://asset.brandfetch.io/id52s_38zT/id45I9a5s9.svg' },
  { name: 'Amazon AWS', logo: 'https://asset.brandfetch.io/idg50kT3sA/id053x1b_-.svg' },
  { name: 'OpenAI', logo: 'https://asset.brandfetch.io/id632aa18c/id234f236d.svg' },
  { name: 'Zapier', logo: 'https://asset.brandfetch.io/id43z7j17s/id5d95e60f.svg' },
];

const Technologies = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8">
          <h2 className="text-center text-lg font-semibold text-gray-300 mb-8">
            Leveraging Industry-Leading Technologies
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6">
            {technologies.map((tech) => (
              <div key={tech.name} className="flex items-center" title={tech.name}>
                <img src={tech.logo} alt={tech.name} className="h-8 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;