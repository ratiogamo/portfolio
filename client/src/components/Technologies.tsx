import { Make, Azure, Aws, OpenAI } from '@lobehub/icons';
import clioLogo from '../assets/logos/clio-logo.png';
import zapierLogo from '../assets/logos/Zapier-Logo.png';
import n8nLogo from '../assets/logos/N8n-logo-new.png';

const technologies = [
  { name: 'Make.com', Component: Make.Color },
  { name: 'Clio', logoUrl: clioLogo, invertOnDark: true },
  { name: 'Microsoft Azure', Component: Azure.Color },
  { name: 'Amazon AWS', Component: Aws.Color },
  { name: 'OpenAI', Component: OpenAI.Avatar },
  { name: 'Zapier', logoUrl: zapierLogo, invertOnDark: true },
  { name: 'n8n', logoUrl: n8nLogo, invertOnDark: true },
];

const Technologies = () => {
  return (
    <section className="py-8"> {/* Changed py-12 to py-8 */}
      <div className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12">
          <h2 className="text-center text-lg font-semibold text-gray-300 mb-8">
            Leveraging Industry-Leading Technologies
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {technologies.map((tech) => (
              <div key={tech.name} className="flex items-center" title={tech.name}>
                {tech.Component ? (
                  <tech.Component size={40} />
                ) : (
                  <img
                    src={tech.logoUrl}
                    alt={tech.name}
                    className={`h-10 object-contain ${tech.invertOnDark ? 'filter brightness-0 invert' : ''}`}
                  />
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