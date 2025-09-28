const technologies = [
  { name: 'Make.com', logo: 'https://registry.npmmirror.com/@lobehub/icons/latest/files/svg/Make.svg' },
  { name: 'Clio', logo: 'https://registry.npmmirror.com/@lobehub/icons/latest/files/svg/Clio.svg' },
  { name: 'Microsoft Azure', logo: 'https://registry.npmmirror.com/@lobehub/icons/latest/files/svg/Azure.svg' },
  { name: 'Amazon AWS', logo: 'https://registry.npmmirror.com/@lobehub/icons/latest/files/svg/AWS.svg' },
  { name: 'OpenAI', logo: 'https://registry.npmmirror.com/@lobehub/icons/latest/files/svg/OpenAI.svg' },
  { name: 'Zapier', logo: 'https://registry.npmmirror.com/@lobehub/icons/latest/files/svg/Zapier.svg' },
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
                <img src={tech.logo} alt={tech.name} className="h-8 object-contain filter brightness-0 invert" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;