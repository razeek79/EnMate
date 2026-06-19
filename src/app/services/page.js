import Link from 'next/link';
import { services } from '@/lib/services-data';
import ServicesGrid from '@/components/ServicesGrid'; // Main client interactive bridge

export const metadata = {
  title: 'Our Services | Web Development, Branding, SEO & Systems | EnMate',
  description: 'Explore EnMate\'s specialized execution models — custom website development, visual branding identity setups, digital marketing funnels, cinematic video production, and business automation platforms. Based in Kottakkal, Kerala, serving clients worldwide.',
  alternates: {
    canonical: 'https://enmate.in/services',
  },
};

export default function ServicesIndexPage() {
  const serviceList = Object.entries(services);
  const whatsappUrl = "https://wa.me/918138881132?text=Hi%20👋,%20I%20found%20EnMate%20online.%20I%20want%20to%20scale%20our%20business%20with%20the%20best%20digital%20marketing%20services.";

  return (
    <div className="min-h-screen w-full bg-[#05030a] text-[var(--text-main)]">
      
      {/* ─── DESKTOP CURSOR MOUNT NODES ─── */}
      <div id="cursor-dot" className="custom-cursor-dot" />
      <div id="cursor-ring" className="custom-cursor-ring" />

      {/* Mounting internal hooks safely to register tracking triggers across all viewport tiers */}
      <div className="hidden"><ServicesGrid serviceList={[]} /></div>

      {/* ─── HERO HEADER SECTION ─── */}
      <header className="relative pt-40 pb-16 bg-gradient-to-b from-[#090514] to-[#05030a] overflow-hidden border-b border-white/5">
        <div className="container max-w-[900px] text-center">
          <span className="section-tag badge mx-auto inline-block mb-4">Our Operations Capability</span>
          <h1 className="text-4xl md:text-6xl font-bold font-anokha gradient-text mb-6 leading-tight">
            Engineered Systems to Dominate Markets
          </h1>
          <p className="text-[var(--text-muted)] text-base md:text-lg max-w-[750px] mx-auto leading-relaxed font-light">
            We don't provide cookie-cutter, basic setups. EnMate constructs highly scalable digital architectures, tactical search visibility models, and premium visual branding systems tailored to turn audience intent into clean business revenue.
          </p>
        </div>
      </header>

      {/* ─── VERTICAL OPERATIONS PRESENTATION STACK ─── */}
      <main className="divide-y divide-white/5">
        {serviceList.map(([slug, service], i) => {
          const isEven = i % 2 === 0;

          return (
            <section 
              key={slug} 
              className="py-20 md:py-32 relative overflow-hidden bg-cover bg-fixed bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(5,3,10,0.95), rgba(5,3,10,0.95)), url('/images/bg-images/${isEven ? 'home-lap-bg.webp' : 'home-mobile-bg.webp'}')`
              }}
            >
              <div className="container">
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  
                  {/* TEXT CONTENT COLUMN LAYER */}
                  <div className={`lg:col-span-6 space-y-6 text-left ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg">
                        <i className={`${service.icon} text-lg text-[var(--accent-soft)]`}></i>
                      </div>
                      <span className="text-xs font-mono font-bold tracking-widest text-[var(--accent-soft)] uppercase">
                        Capabilities Layer // 0{i + 1}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-4xl font-bold text-white font-anokha leading-tight">
                      {service.title}
                    </h2>

                    <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed font-light">
                      {service.overview}
                    </p>

                    {/* ACTION INTERACTIVE BUTTON ROW */}
                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <a 
                        href={whatsappUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-primary text-xs uppercase tracking-wider font-bold py-3 px-8"
                      >
                        Deploy Solution
                      </a>
                      
                      {/* FIXED: This button is now permanent for ALL sections and links smoothly to your exact page route */}
                      <Link 
                        href={`/services/${slug}`}
                        className="btn btn-outline text-xs uppercase tracking-wider font-bold py-3 px-8 hover:border-[var(--accent-soft)]"
                      >
                        Explore Specialty <i className="fas fa-arrow-right ml-2 text-[var(--accent-soft)]"></i>
                      </Link>
                    </div>
                  </div>

                  {/* DISPLAY INFRASTRUCTURE ROW */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'} h-full w-full`}>
                    <div className="p-8 md:p-12 bg-[#07040f]/60 border border-white/5 rounded-3xl shadow-2xl backdrop-blur-xl relative overflow-hidden text-left hover:border-[var(--accent-soft)]/20 transition-all duration-500 group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[var(--accent)]/10 transition-colors" />
                      
                      <span className="text-[10px] uppercase font-mono text-neutral-500 block mb-4 tracking-widest">
                        System Specifications Matrix
                      </span>
                      
                      <h4 className="text-lg font-bold text-white mb-3">Operational Intent</h4>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light mb-6">
                        Optimized for business models requiring maximum operational conversion speed, custom styling components, global multi-region CDN delivery, and iron-clad data security protocols.
                      </p>

                      <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                        <div>
                          <span className="text-[10px] uppercase text-neutral-500 block tracking-wider mb-1">Architecture</span>
                          <span className="text-xs text-white font-mono font-medium">100% Custom Code</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-neutral-500 block tracking-wider mb-1">Visibility Layer</span>
                          <span className="text-xs text-[var(--accent-soft)] font-mono font-medium">SEO Structured Base</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          );
        })}
      </main>

      {/* ─── FINAL CLOSING HIGH-INTENT ACTION FOOTER ─── */}
      <section className="py-24 bg-gradient-to-t from-[#040208] to-[#05030a] border-t border-white/5">
        <div className="container max-w-[800px] text-center space-y-6">
          <h2 className="text-2xl md:text-4xl font-bold font-anokha text-white">Ready to Engineer Absolute Authority?</h2>
          <p className="text-sm text-[var(--text-muted)] max-w-[600px] mx-auto font-light leading-relaxed">
            Let's construct your project correctly using premium, high-converting digital logic. Connect with our development and strategy desks today.
          </p>
          <div className="pt-4">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-accent text-xs uppercase tracking-wider font-bold py-3.5 px-10">
              Initiate Discovery Session
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}