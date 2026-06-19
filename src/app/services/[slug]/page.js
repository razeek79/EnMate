import { notFound } from 'next/navigation';
import Link from 'next/link';
import { services } from '@/lib/services-data';
import BlogCursor from '@/components/BlogCursor';

export const revalidate = 3600;

// 1. Static Route Segments Generation
export async function generateStaticParams() {
  const serviceKeys = Object.keys(services);
  return serviceKeys.map((slug) => ({ slug }));
}

// 2. High-Authority Server Meta Builder
export async function generateMetadata({ params }) {
  const { slug } = params;
  const service = services[slug];

  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `https://enmate.in/services/${slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://enmate.in/services/${slug}`,
      type: 'website',
      images: [{ url: '/logos/site-logo.png', width: 512, height: 512, alt: 'EnMate Branding Matrix' }]
    }
  };
}

// 3. Main Dynamic Service Subpage Component
export default async function IndividualServicePage({ params }) {
  const { slug } = params;
  const service = services[slug];

  if (!service) notFound();

  const whatsappUrl = `https://wa.me/917510514464?text=Hi%20👋,%20I%20want%20to%20consult%20EnMate%20regarding%20${encodeURIComponent(service.title)}.`;

  return (
    <>
      {/* Site-wide interactive premium pointer ring engine */}
      <BlogCursor />

      <div className="min-h-screen bg-[#05030a] text-[var(--text-main)] pt-32 pb-24">
        <div className="container max-w-[1100px] space-y-20 md:space-y-28">
          
          {/* ─── BREADCRUMBS & HERO INTRO ─── */}
          <header className="space-y-6 text-left">
            <nav className="text-xs text-[var(--text-muted)] flex items-center gap-2" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <i className="fas fa-chevron-right text-[10px]"></i>
              <Link href="/services" className="hover:text-white transition-colors">Our Services</Link>
              <i className="fas fa-chevron-right text-[10px]"></i>
              <span className="text-white font-medium truncate max-w-[200px] md:max-w-none">{service.title}</span>
            </nav>

            <div className="space-y-4 max-w-[850px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <i className={`${service.icon} text-sm text-[var(--accent-soft)]`}></i>
                </div>
                <span className="text-xs font-mono tracking-widest text-[var(--accent-soft)] uppercase">Premium Service Node</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold font-anokha leading-tight text-white">{service.title}</h1>
              <p className="text-lg md:text-xl font-medium text-[var(--accent-soft)] font-mono">{service.tagline}</p>
              <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed font-light pt-2">{service.overview}</p>
            </div>
          </header>

          {/* ─── CAPABILITY BENEFITS & ADVANTAGES ─── */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
            <div className="lg:col-span-4">
              <span className="section-tag">Value Matrix</span>
              <h2 className="text-2xl md:text-3xl font-bold font-anokha text-white leading-tight">Key Business Benefits</h2>
              <p className="text-xs text-[var(--text-muted)] mt-2 font-light leading-relaxed">Strategic outcomes engineered into this operational layer framework blueprint.</p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.benefits.map((benefit, idx) => (
                <div key={idx} className="p-5 bg-[#07040f]/60 border border-white/5 rounded-2xl flex gap-4 items-start hover:border-[var(--accent-soft)]/20 transition-colors">
                  <div className="w-5 h-5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent-soft)]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <i className="fas fa-check text-[10px] text-[var(--accent-soft)]"></i>
                  </div>
                  <p className="text-xs md:text-sm text-[var(--secondary)] leading-relaxed font-light">{benefit}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── EXECUTION TIMELINE FRAMEWORK ─── */}
          <section className="space-y-10 text-left">
            <div className="max-w-[600px]">
              <span className="section-tag">Methodology</span>
              <h2 className="text-2xl md:text-3xl font-bold font-anokha text-white">Our Tactical Process</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((stepData, idx) => (
                <div key={idx} className="p-6 bg-[#07040f]/40 border border-white/5 rounded-2xl relative overflow-hidden flex flex-col justify-between group hover:border-[var(--accent-soft)]/30 transition-all duration-300">
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-bold text-[var(--accent-soft)] tracking-wider block">{stepData.step}</span>
                    <p className="text-sm font-semibold text-white">{stepData.step.split('. ')[1] || 'Execution Step'}</p>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light">{stepData.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─── STACK ARCHITECTURE & TOOLS ─── */}
          <section className="p-8 md:p-12 bg-gradient-to-r from-[#07040f]/80 to-[#0b0617]/50 border border-white/5 rounded-3xl text-left flex flex-wrap items-center justify-between gap-8">
            <div className="max-w-[450px] space-y-2">
              <span className="section-tag !mb-0">Infrastructure</span>
              <h3 className="text-xl md:text-2xl font-bold text-white">Technologies & Tools Deployed</h3>
              <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">Premium system toolkits selected for absolute response speed, layout precision, and reliability.</p>
            </div>
            <div className="flex flex-wrap gap-3 max-w-[500px]">
              {service.technologies.map((tech, idx) => (
                <span key={idx} className="px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white font-mono tracking-wide">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* ─── CASE STUDIES & INTEL METRICS (Dynamic Placeholder Context) ─── */}
          <section className="space-y-8 text-left">
            <div>
              <span className="section-tag">Track Record</span>
              <h2 className="text-2xl md:text-3xl font-bold font-anokha text-white">Related Case Studies</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#07040f]/60 border border-white/5 rounded-2xl space-y-4">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[var(--accent-soft)] bg-[var(--accent)]/10 px-3 py-1 rounded-full border border-[var(--accent-soft)]/20">Operational Scaling Case</span>
                <h4 className="text-base font-bold text-white">Scaling Local Enterprise to Worldwide Footprint</h4>
                <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">How we integrated custom deployment models to achieve sustained visibility gains and lower operations overhead across regional hub nodes.</p>
              </div>
              <div className="p-6 bg-[#07040f]/60 border border-white/5 rounded-2xl space-y-4">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[var(--accent-soft)] bg-[var(--accent)]/10 px-3 py-1 rounded-full border border-[var(--accent-soft)]/20">UI/UX Revamp Conversion Case</span>
                <h4 className="text-base font-bold text-white">Premium Re-Engineering for Consumer Brand</h4>
                <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">Replacing rigid templates with highly responsive, customized visual code structures to double organic transaction loops.</p>
              </div>
            </div>
          </section>

          {/* ─── AUTHENTIC TESTIMONIAL FEED ─── */}
          <section className="space-y-8 text-left">
            <div>
              <span className="section-tag">Validation</span>
              <h2 className="text-2xl md:text-3xl font-bold font-anokha text-white">Client Feedback</h2>
            </div>
            <div className="p-8 md:p-12 bg-white/[0.01] border border-white/5 rounded-3xl relative overflow-hidden">
              <div className="absolute top-6 left-6 text-6xl font-serif text-white/5 pointer-events-none">“</div>
              <p className="text-sm md:text-base text-[var(--secondary)] italic font-light relative z-10 leading-relaxed max-w-[850px]">
                "EnMate completely transformed our workflow approach. The technical execution strategy is highly precise, completely custom-coded without any page builders, and the speed optimization metrics have directly improved our customer acquisition channels."
              </p>
              <div className="mt-6 border-t border-white/5 pt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--accent)]/20 border border-[var(--accent-soft)]/30 flex items-center justify-center font-mono text-xs font-bold text-white">M</div>
                <div>
                  <p className="text-xs font-bold text-white">Operations Director</p>
                  <p className="text-[10px] text-neutral-500 font-mono">Verified Growth Partner</p>
                </div>
              </div>
            </div>
          </section>

          {/* ─── FREQUENTLY ASKED QUESTIONS (FAQs) ─── */}
          <section className="space-y-10 text-left">
            <div className="max-w-[550px]">
              <span className="section-tag">FAQ Matrix</span>
              <h2 className="text-2xl md:text-3xl font-bold font-anokha text-white">Answers Shared with Partners</h2>
            </div>
            <div className="space-y-4 max-w-[850px]">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="p-6 bg-[#07040f]/60 border border-white/5 rounded-2xl space-y-2">
                  <h4 className="text-sm md:text-base font-semibold text-white flex items-center gap-3">
                    <span className="text-xs font-mono text-[var(--accent-soft)]">Q.</span> {faq.q}
                  </h4>
                  <p className="text-xs md:text-sm text-[var(--text-muted)] font-light leading-relaxed pl-6 border-l border-white/10 mt-1">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── DYNAMIC INTENT CALL TO ACTION (CTA) ─── */}
          <section className="pt-8">
            <div className="p-8 md:p-16 bg-gradient-to-br from-[#07040f] via-[#cf0466]/5 to-[#07040f] border border-white/10 rounded-3xl text-center space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-neutral-950/20 backdrop-blur-[2px] pointer-events-none" />
              <div className="relative z-10 space-y-4 max-w-[650px] mx-auto">
                <span className="section-tag !mb-2">Initiate Growth Integration</span>
                <h2 className="text-2xl md:text-4xl font-bold font-anokha text-white">Ready to Deploy This Specialty?</h2>
                <p className="text-xs md:text-sm text-[var(--text-muted)] font-light leading-relaxed">
                  Connect with our strategy desk immediately to map your technical requirements, secure custom project timelines, and request a detailed operational quote.
                </p>
                <div className="pt-4 flex flex-wrap gap-4 justify-center">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-accent text-xs uppercase tracking-wider font-bold py-3.5 px-8 shadow-xl">
                    Get Proposal & Quote
                  </a>
                  <Link href="/services" className="btn btn-outline text-xs uppercase tracking-wider font-bold py-3.5 px-8">
                    View Other Frameworks
                  </Link>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}