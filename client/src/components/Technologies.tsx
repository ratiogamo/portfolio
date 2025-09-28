import { Make, Azure, Aws, OpenAI, Zapier } from '@lobehub/icons';

const technologies = [
  { name: 'Make.com', Component: Make.Color },
  { name: 'Clio', logoUrl: 'https://asset.brandfetch.io/idq5bIuPAc/id50b344Gs.svg' },
  { name: 'Microsoft Azure', Component: Azure.Color },
  { name: 'Amazon AWS', Component: Aws.Color },
  { name: 'OpenAI', Component: OpenAI.Color },
  { name: 'Zapier', Component: Zapier.Color },
];

const Technologies = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8">
          <h2 className="text-center text-lg font-semibold text-gray-300 mb-8">
            Leveraging Industry-Leading Technologies
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {technologies.map((tech) => (
              <div key={tech.name} className="flex items-center" title={tech.name}>
                {tech.Component ? (
                  <tech.Component size={40} />
                ) : (
                  <img src={tech.logoUrl} alt={tech.name} className="h-10 object-contain" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;