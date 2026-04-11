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
        <div className="w-full lg:w-[45%] lg:pt-[25px]">
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
              I am a CG Generalist based in Da Nang. I’m trying to make cool CG stuff, and sometimes it's actually possible. When I'm not tweaking render settings, I'm probably riding my scrambler around Vietnam or trying to understand my cat's logic.
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
                {['Unreal Engine', 'Houdini', 'Substance Painter'].map(tech => (
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
                <svg viewBox="0 0 192 192" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10"><path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"/></svg>
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
