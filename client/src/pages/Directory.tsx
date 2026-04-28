import React, { useState } from 'react';
import { usePageSEO } from '../hooks/usePageSEO';

/* ─── Types ──────────────────────────────────────────────────────── */
interface SubEntity {
  name: string;
  status: 'active' | 'development' | 'roadmap';
  description?: string;
  icon?: string;
}

interface Holding {
  id: string;
  name: string;
  jurisdiction?: string;
  color: string;      // tailwind border / accent
  gradient: string;   // gradient stops
  icon: string;
  description: string;
  entities: SubEntity[];
}

/* ─── Data ───────────────────────────────────────────────────────── */
const forProfitHoldings: Holding[] = [
  {
    id: 'ras-tech',
    name: 'RAS Technology & Research Holdings, LLC',
    jurisdiction: 'Delaware',
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-400',
    icon: 'fa-microchip',
    description: 'Technology ventures, cybersecurity, and analytical software.',
    entities: [
      { name: 'Ratio Analytical', status: 'active', description: 'AI-powered business analytics & automation platform', icon: 'fa-chart-line' },
      { name: 'Ghost Cyber Security', status: 'development', description: 'Enterprise-grade cybersecurity solutions', icon: 'fa-shield-alt' },
      { name: 'ChipChampions', status: 'roadmap', description: 'Competitive gaming & eSports platform', icon: 'fa-gamepad' },
    ],
  },
  {
    id: 'exposhyft',
    name: 'Exposhyft Finance & Real Estate Holdings, LLC',
    jurisdiction: 'Delaware',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-400',
    icon: 'fa-building',
    description: 'Finance, real estate, and sustainable investment ventures.',
    entities: [
      { name: 'Exposhyft Management', status: 'active', description: 'Business management & consulting services', icon: 'fa-briefcase' },
      { name: 'SecureInvestments', status: 'development', description: 'Secure digital investment platform', icon: 'fa-lock' },
      { name: 'GreenGrowthPros', status: 'roadmap', description: 'Sustainable landscaping & property services', icon: 'fa-leaf' },
      { name: 'Motivated Real Estate', status: 'roadmap', description: 'Motivated-seller real estate acquisitions', icon: 'fa-home' },
    ],
  },
  {
    id: 'first-sin',
    name: 'First Sin Creative Holdings, LLC',
    jurisdiction: 'Delaware',
    color: 'pink',
    gradient: 'from-pink-500 to-rose-400',
    icon: 'fa-palette',
    description: 'Fashion, beauty, art, and creative brand ventures.',
    entities: [
      { name: 'First Sin Apparel', status: 'development', description: 'Premium streetwear & fashion line', icon: 'fa-tshirt' },
      { name: 'LovingMyGorgeous', status: 'roadmap', description: 'Beauty & self-care product line', icon: 'fa-heart' },
      { name: 'WereNaked, LLC', status: 'roadmap', description: 'Body-positive intimate apparel brand', icon: 'fa-star' },
      { name: 'Ajahnai Museam', status: 'roadmap', description: 'Digital art gallery & cultural showcase', icon: 'fa-image' },
    ],
  },
  {
    id: 'prosperity',
    name: 'Prosperity Services Holdings, LLC',
    jurisdiction: 'Delaware',
    color: 'amber',
    gradient: 'from-amber-500 to-yellow-400',
    icon: 'fa-handshake',
    description: 'Service-based businesses across legal, roofing, insurance, and dining.',
    entities: [
      { name: 'AcciCare', status: 'development', description: 'Accident care & personal injury referral network', icon: 'fa-ambulance' },
      { name: 'TopRoofPros', status: 'roadmap', description: 'Premium roofing contractor lead-gen platform', icon: 'fa-hard-hat' },
      { name: 'Gravy Heights', status: 'roadmap', description: 'Upscale dining & food brand concept', icon: 'fa-utensils' },
      { name: 'LegalPathGlobal', status: 'roadmap', description: 'Global legal pathway & immigration consulting', icon: 'fa-gavel' },
    ],
  },
];

const nonProfitEntities: Holding[] = [
  {
    id: 'and-you-see',
    name: 'And You See, Gravity LLC',
    color: 'violet',
    gradient: 'from-violet-500 to-purple-400',
    icon: 'fa-flask',
    description: 'Research institute exploring gravity, physics, and emerging technology.',
    entities: [],
  },
  {
    id: 'hk-james',
    name: 'H. K. James Art Studio',
    color: 'orange',
    gradient: 'from-orange-500 to-amber-400',
    icon: 'fa-paint-brush',
    description: 'Non-profit art school providing free creative education.',
    entities: [],
  },
  {
    id: 'ras-consortium',
    name: 'RAS Consortium, LLC',
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-400',
    icon: 'fa-users',
    description: 'Community & technology program fostering digital literacy.',
    entities: [],
  },
];

/* ─── Partners & Sponsors ────────────────────────────────────────── */
interface PartnerEntry {
  name: string;
  url: string;
  description: string;
  icon: string;
}

interface PartnerGroup {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  gradient: string;
  borderColor: string;
  tagBg: string;
  tagText: string;
  entries: PartnerEntry[];
}

const partnerGroups: PartnerGroup[] = [
  {
    id: 'our-brands',
    title: 'Our Brands',
    subtitle: 'Websites built & managed by the DjamesXclusive ecosystem',
    icon: 'fa-rocket',
    gradient: 'from-primary to-blue-400',
    borderColor: 'border-primary/30',
    tagBg: 'bg-primary/10',
    tagText: 'text-primary',
    entries: [
      { name: 'CaseWorthMore.com', url: 'https://caseworthmore.com', description: 'Landing page helping accident victims maximize their case value', icon: 'fa-balance-scale' },
      { name: 'L2GSEO.com', url: 'https://l2gseo.com', description: 'Local SEO services landing page powered by GoHighLevel', icon: 'fa-search-location' },
      { name: 'Lead2Generations.com', url: 'https://lead2generations.com', description: 'Paid ad lead generation across Google, Apple Maps, Facebook, Insta, TikTok & Pinterest with GHL analytics dashboard', icon: 'fa-bullseye' },
      { name: 'RatioNoCode.dev', url: 'https://rationocode.dev', description: 'AI agentic networking course landing page with event registration', icon: 'fa-graduation-cap' },
    ],
  },
  {
    id: 'community-sponsors',
    title: 'Community Sponsors',
    subtitle: 'Family businesses and friends we proudly support',
    icon: 'fa-heart',
    gradient: 'from-rose-500 to-pink-400',
    borderColor: 'border-rose-500/30',
    tagBg: 'bg-rose-500/10',
    tagText: 'text-rose-300',
    entries: [
      { name: 'Destiny876.com', url: 'https://destiny876.com', description: 'Mobile mechanic — on-demand auto repair at your location', icon: 'fa-wrench' },
      { name: 'AkhuApothecary.com', url: 'https://akhuapothecary.com', description: 'Holistic wellness & natural apothecary products', icon: 'fa-mortar-pestle' },
      { name: 'LionOrderRemodeling.com', url: 'https://lionorderremodeling.com', description: 'Full-service home remodeling company landing page', icon: 'fa-hammer' },
    ],
  },
  {
    id: 'partner-network',
    title: 'Partner Network',
    subtitle: 'Strategic allies extending our global reach',
    icon: 'fa-handshake',
    gradient: 'from-teal-500 to-emerald-400',
    borderColor: 'border-teal-500/30',
    tagBg: 'bg-teal-500/10',
    tagText: 'text-teal-300',
    entries: [
      { name: 'VillaMaat.com', url: 'https://villamaat.com', description: 'Luxury wellness retreats in Jamaica', icon: 'fa-spa' },
      { name: 'NetworkRecruitment.agency', url: 'https://networkrecruitment.agency', description: 'Job recruitment agency with live job postings dashboard', icon: 'fa-user-tie' },
      { name: 'GlobalMarketsCenter.com', url: 'https://globalmarketscenter.com', description: 'Fast, reliable expedited freight & sprinter van logistics solutions for time-sensitive deliveries', icon: 'fa-truck' },
    ],
  },
];

/* ─── Status helpers ─────────────────────────────────────────────── */
const statusConfig: Record<SubEntity['status'], { label: string; bg: string; text: string; dot: string }> = {
  active:      { label: 'Active',      bg: 'bg-green-500/15', text: 'text-green-300', dot: 'bg-green-400' },
  development: { label: 'In Development', bg: 'bg-yellow-500/15', text: 'text-yellow-300', dot: 'bg-yellow-400' },
  roadmap:     { label: 'Roadmap',     bg: 'bg-blue-500/15', text: 'text-blue-300', dot: 'bg-blue-400' },
};

const StatusBadge: React.FC<{ status: SubEntity['status'] }> = ({ status }) => {
  const c = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 ${c.bg} ${c.text} px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} ${status === 'active' ? 'animate-pulse' : ''}`} />
      {c.label}
    </span>
  );
};

/* ─── Collapsible Holding Card ───────────────────────────────────── */
const HoldingCard: React.FC<{ holding: Holding; defaultOpen?: boolean }> = ({ holding, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  const colorMap: Record<string, string> = {
    blue:    'border-blue-500/30 hover:border-blue-400/50',
    emerald: 'border-emerald-500/30 hover:border-emerald-400/50',
    pink:    'border-pink-500/30 hover:border-pink-400/50',
    amber:   'border-amber-500/30 hover:border-amber-400/50',
    violet:  'border-violet-500/30 hover:border-violet-400/50',
    orange:  'border-orange-500/30 hover:border-orange-400/50',
    cyan:    'border-cyan-500/30 hover:border-cyan-400/50',
  };

  const glowMap: Record<string, string> = {
    blue:    'shadow-blue-500/5',
    emerald: 'shadow-emerald-500/5',
    pink:    'shadow-pink-500/5',
    amber:   'shadow-amber-500/5',
    violet:  'shadow-violet-500/5',
    orange:  'shadow-orange-500/5',
    cyan:    'shadow-cyan-500/5',
  };

  const iconBgMap: Record<string, string> = {
    blue:    'bg-blue-500/10 text-blue-400',
    emerald: 'bg-emerald-500/10 text-emerald-400',
    pink:    'bg-pink-500/10 text-pink-400',
    amber:   'bg-amber-500/10 text-amber-400',
    violet:  'bg-violet-500/10 text-violet-400',
    orange:  'bg-orange-500/10 text-orange-400',
    cyan:    'bg-cyan-500/10 text-cyan-400',
  };

  return (
    <div
      className={`group bg-black/30 backdrop-blur-md border ${colorMap[holding.color]} rounded-2xl overflow-hidden transition-all duration-500 shadow-lg ${glowMap[holding.color]} hover:shadow-xl`}
    >
      {/* Gradient top bar */}
      <div className={`h-1 bg-gradient-to-r ${holding.gradient}`} />

      <button
        onClick={() => holding.entities.length > 0 && setOpen(!open)}
        className="w-full p-5 md:p-6 text-left flex items-start gap-4"
        aria-expanded={open}
      >
        {/* Icon */}
        <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${iconBgMap[holding.color]} transition-transform duration-300 group-hover:scale-110`}>
          <i className={`fas ${holding.icon} text-lg`} />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-bold text-white leading-snug mb-1 truncate">{holding.name}</h3>
          {holding.jurisdiction && (
            <span className="text-xs text-gray-500 font-medium">{holding.jurisdiction}</span>
          )}
          <p className="text-sm text-gray-400 mt-1 leading-relaxed">{holding.description}</p>
        </div>

        {/* Chevron */}
        {holding.entities.length > 0 && (
          <div className="shrink-0 mt-1">
            <i className={`fas fa-chevron-down text-gray-500 text-sm transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
          </div>
        )}
      </button>

      {/* Expandable sub-entities */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 md:px-6 pb-5 md:pb-6 space-y-3">
          <div className="h-px bg-white/10 mb-4" />
          {holding.entities.map((e, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/10"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${iconBgMap[holding.color]}`}>
                <i className={`fas ${e.icon || 'fa-cube'} text-xs`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-white">{e.name}</span>
                  <StatusBadge status={e.status} />
                </div>
                {e.description && (
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{e.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Connector Line (decorative) ────────────────────────────────── */
const ConnectorLine: React.FC<{ gradient: string }> = ({ gradient }) => (
  <div className="flex justify-center py-2">
    <div className={`w-px h-8 bg-gradient-to-b ${gradient} opacity-40`} />
  </div>
);

/* ─── Page ───────────────────────────────────────────────────────── */
const Directory: React.FC = () => {
  usePageSEO({
    title: 'Directory | DjamesXclusive Global Holdings — Full Corporate Structure',
    description: 'Explore the complete organizational structure of DjamesXclusive Global Holdings — spanning technology, finance, creative, services, and non-profit ventures.',
    canonical: 'https://jamesdev.pro/directory',
  });

  return (
    <div className="py-16 space-y-16">
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          {/* Decorative glow orbs */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          <span className="relative inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full font-medium text-xs sm:text-sm mb-6">
            <i className="fas fa-sitemap mr-2 text-primary" />
            Corporate Directory
          </span>

          <h1 className="relative text-3xl sm:text-4xl md:text-5xl font-bold font-inter mb-4 text-white leading-tight">
            The <span className="text-gradient animate-gradient">DjamesXclusive</span> Ecosystem
          </h1>
          <p className="relative text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            A vertically integrated family of companies spanning technology, finance, creative arts, services, and social impact.
          </p>
        </div>
      </section>

      {/* ── Partners & Sponsors ──────────────────────────────────── */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <span className="inline-flex items-center bg-white/5 border border-white/10 text-gray-300 px-4 py-1.5 rounded-full text-xs font-medium mb-4">
            <i className="fas fa-handshake mr-2 text-teal-400" />
            Partners & Sponsors
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-inter text-white">
            Our <span className="text-gradient animate-gradient">Network</span>
          </h2>
          <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto">
            The brands, family businesses, and strategic partners we've built, manage, or proudly support.
          </p>
        </div>

        {/* ── You Are Here: JamesDev.pro ─────────────────────────── */}
        <a
          href="https://jamesdev.pro"
          target="_blank"
          rel="noreferrer"
          className="group/featured block mb-10 relative rounded-2xl overflow-hidden"
        >
          {/* Animated gradient border glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-blue-400 rounded-2xl opacity-60 blur-sm animate-gradient bg-[length:200%_200%] pointer-events-none" />
          <div className="relative bg-black/80 backdrop-blur-md rounded-2xl border border-primary/40 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            {/* Icon */}
            <div className="shrink-0 w-16 h-16 rounded-2xl bg-primary/10 ring-2 ring-primary/30 flex items-center justify-center transition-transform duration-300 group-hover/featured:scale-110">
              <i className="fas fa-bolt text-2xl text-primary" />
            </div>

            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1 flex-wrap">
                <span className="inline-flex items-center bg-primary/20 text-primary px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse mr-1.5" />
                  You Are Here
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white font-inter">JamesDev.pro</h3>
              <p className="text-sm text-gray-400 mt-1 max-w-lg">
                Emergency workflow rescue &amp; AI automation services — your current location within the DjamesXclusive ecosystem. Connected to Stripe payments &amp; Cal.com scheduling.
              </p>
            </div>

            {/* CTA arrow */}
            <div className="shrink-0 hidden md:flex items-center gap-2 text-primary font-semibold text-sm transition-all duration-300 group-hover/featured:translate-x-1">
              Visit Site <i className="fas fa-arrow-right" />
            </div>
          </div>
        </a>

        <div className="space-y-8">
          {partnerGroups.map((group) => (
            <div key={group.id}>
              {/* Group header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${group.tagBg}`}>
                  <i className={`fas ${group.icon} text-sm ${group.tagText}`} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-inter">{group.title}</h3>
                  <p className="text-xs text-gray-500">{group.subtitle}</p>
                </div>
              </div>

              {/* Entries grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.entries.map((entry, i) => (
                  <a
                    key={i}
                    href={entry.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`group/card bg-black/30 backdrop-blur-md border ${group.borderColor} rounded-xl p-4 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/20 hover:shadow-lg hover:-translate-y-0.5`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${group.tagBg} transition-transform duration-300 group-hover/card:scale-110`}>
                        <i className={`fas ${entry.icon} text-sm ${group.tagText}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold text-white truncate">{entry.name}</span>
                          <i className="fas fa-external-link-alt text-[9px] text-gray-600 group-hover/card:text-gray-400 transition-colors" />
                        </div>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">{entry.description}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── For-Profit Holdings ──────────────────────────────────── */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <span className="inline-flex items-center bg-white/5 border border-white/10 text-gray-300 px-4 py-1.5 rounded-full text-xs font-medium mb-4">
            <i className="fas fa-building mr-2 text-primary" />
            For-Profit Portfolio
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-inter text-white">
            Operating <span className="text-gradient animate-gradient">Holdings</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {forProfitHoldings.map((h) => (
            <HoldingCard key={h.id} holding={h} defaultOpen />
          ))}
        </div>
      </section>

      {/* ── Non-Profit Section ───────────────────────────────────── */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-4">
          <span className="inline-flex items-center bg-violet-500/10 border border-violet-500/20 text-violet-300 px-4 py-1.5 rounded-full text-xs font-medium mb-4">
            <i className="fas fa-hand-holding-heart mr-2" />
            Non-Profit Foundation
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-inter text-white mb-2">
            Social <span className="text-gradient animate-gradient">Impact</span>
          </h2>
        </div>

        {/* Foundation header */}
        <div className="bg-black/30 backdrop-blur-md border border-violet-500/20 rounded-2xl p-6 md:p-8 text-center mb-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.03] to-transparent pointer-events-none" />
          <div className="relative">
            <div className="w-14 h-14 bg-violet-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 ring-2 ring-violet-500/20">
              <i className="fas fa-hand-holding-heart text-2xl text-violet-400" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-1 font-inter">
              The RAS Gravity Foundation
            </h3>
            <p className="text-xs text-gray-500 font-medium">501(c)(3) Non-Profit</p>
            <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto">
              Manages and governs all non-profit activities spanning research, arts education, and community technology programs.
            </p>
          </div>
        </div>

        <ConnectorLine gradient="from-violet-500/30 to-violet-500/10" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {nonProfitEntities.map((e) => (
            <div
              key={e.id}
              className={`bg-black/30 backdrop-blur-md border border-${e.color}-500/20 rounded-2xl overflow-hidden transition-all duration-300 hover:border-${e.color}-400/40 hover:shadow-lg`}
            >
              <div className={`h-1 bg-gradient-to-r ${e.gradient}`} />
              <div className="p-5 text-center">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3 bg-${e.color}-500/10`}>
                  <i className={`fas ${e.icon} text-${e.color}-400`} />
                </div>
                <h4 className="text-sm font-bold text-white mb-1 font-inter">{e.name}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{e.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Legend ────────────────────────────────────────────────── */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
          <h3 className="text-sm font-bold text-white mb-4 font-inter flex items-center gap-2">
            <i className="fas fa-info-circle text-primary" />
            Status Legend
          </h3>
          <div className="flex flex-wrap gap-6">
            {Object.entries(statusConfig).map(([key, c]) => (
              <div key={key} className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${c.dot}`} />
                <span className={`text-sm font-medium ${c.text}`}>{c.label}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-4">
            This directory reflects the current organizational structure of DjamesXclusive Global Holdings, Inc. and affiliated entities. Structure is subject to change as ventures progress through development stages.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Directory;
