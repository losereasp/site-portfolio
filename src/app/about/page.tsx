import Link from "next/link";
import MainNavbar from "../MainNavbar";
import Magnetic from "../Magnetic";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F0F0F0] text-[#111111] font-mono selection:bg-[#FF5F1F] selection:text-white pb-0">
      
      {/* Navbar Shared Copy for About Page */}
      <MainNavbar lightMode />

      {/* Main Layout Container */}
      <section className="max-w-[1400px] w-full mx-auto px-8 md:px-16 pt-32 lg:pt-48 pb-24 flex flex-col lg:flex-row gap-16 items-start">
        
        {/* Left Column: Portrait */}
        <div className="w-full lg:w-[45%] lg:pt-[2vw]">
          <div className="relative w-full aspect-[4/5] rounded-none overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            <img 
              src="/IMG_4117.jpg" 
              alt="Iaroslav Losereasp" 
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Right Column: Bio */}
        <div className="w-full lg:w-[55%] flex flex-col justify-start">
          
          <h1 className="font-primary text-5xl lg:text-[5vw] leading-[1.2] tracking-normal uppercase mb-6 lg:mb-12 font-bold text-[#111111]">
            MY NAME IS IAROSLAV
          </h1>

          <div className="font-mono text-base md:text-xl lg:text-2xl leading-[1.6] tracking-tight font-light w-full max-w-2xl mb-12">
            <p className="mb-6">
              I am a CG Artist and 3D Generalist based in <del className="opacity-40">Shumyachi</del>, <del className="opacity-40">Moscow</del> Da Nang. I specialize in Environment Art, LookDev, and crafting cinematics. I love taking a project from raw geometry to a fully atmospheric, breathing digital space. When I'm not tweaking render settings, I'm probably riding my scrambler around Vietnam or trying to understand my cat's logic.
            </p>
          </div>

          <div className="mb-16 max-w-3xl flex flex-col gap-8">
            <div>
              <p className="font-mono text-black/50 mb-3 tracking-widest text-xs uppercase font-bold">Main Stack</p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {['Cinema 4D', 'Redshift', 'Blender', 'After Effects'].map(tech => (
                  <span key={tech} className="px-4 py-2 border border-black/20 rounded-[3px] text-sm lg:text-base font-sans font-medium hover:border-[#FF5F1F] hover:text-[#FF5F1F] hover:bg-[#FF5F1F]/5 transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <p className="font-mono text-black/50 mb-3 tracking-widest text-xs uppercase font-bold">Currently Expanding Into</p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {['Unreal Engine', 'Houdini'].map(tech => (
                  <span key={tech} className="px-4 py-2 border border-black/20 border-dashed rounded-[3px] text-sm lg:text-base font-sans font-medium text-black/60 hover:text-black hover:border-black/50 transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contacts & CTA Row */}
          <div className="mt-auto flex flex-col gap-8">
            
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Magnetic>
                <a href="mailto:hello@losereasp.com" className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#FF5F1F] bg-[#FF5F1F] text-[#111111] font-mono text-base md:text-lg font-bold uppercase transition-all duration-300 hover:bg-transparent hover:text-[#FF5F1F] rounded-[3px] w-full sm:w-auto">
                  DROP ME A LINE
                </a>
              </Magnetic>

              <Magnetic>
                <a href="/resume.pdf" target="_blank" className="inline-flex items-center justify-center px-8 py-4 border-2 border-black/20 text-[#111111] font-mono text-base md:text-lg font-bold uppercase transition-all duration-300 hover:bg-[#111111] hover:text-white hover:border-[#111111] rounded-[3px] w-full sm:w-auto">
                  DOWNLOAD RESUME (PDF)
                </a>
              </Magnetic>
            </div>
            
            <div className="flex gap-6 md:gap-8">
              <a href="https://www.instagram.com/yaroslav.losereasp/" target="_blank" className="text-black/60 hover:text-[#FF5F1F] transition-all duration-300 hover:-translate-y-[3px]">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.threads.com/@yaroslav.losereasp" target="_blank" className="text-black/60 hover:text-[#FF5F1F] transition-all duration-300 hover:-translate-y-[3px]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10"><path d="M22 12A10 10 0 1 0 12 22a10 10 0 0 0 5-1.34" /><path d="M15.4 17.5A6.5 6.5 0 1 1 18.5 12a4.4 4.4 0 0 1-4.4 4.4c-1.3 0-2.3-1-2.3-2.3" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/losereasp/" target="_blank" className="text-black/60 hover:text-[#FF5F1F] transition-all duration-300 hover:-translate-y-[3px]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
