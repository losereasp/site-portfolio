import LocalTime from "./LocalTime";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F0F0EE] text-black py-20 px-8 md:px-16 flex flex-col lg:flex-row justify-between items-stretch gap-16">
      {/* Left Block */}
      <div className="flex flex-col w-full lg:w-5/12">
        <h2 className="font-primary leading-[0.85] text-[15vw] lg:text-[6.5vw] uppercase mb-4 tracking-normal text-[#FF5F1F]">
          Iaroslav<br/>Marchenkov
        </h2>
        <p className="font-mono text-lg md:text-2xl tracking-wide text-black/60 font-light">
          CG ARTIST & 3D GENERALIST
        </p>
      </div>

      {/* Middle Block (Quote) & Vertical Divider */}
      <div className="flex flex-col lg:flex-row w-full lg:w-7/12 gap-8 lg:gap-32">
        
        <div className="flex flex-col flex-1 justify-center h-full xl:py-10">
          <div className="font-mono text-2xl md:text-3xl lg:text-[2rem] xl:text-[2.2rem] leading-[1.7] tracking-wider text-black/70 uppercase font-light">
            <p className="max-w-3xl mb-6 lg:mb-8">
              LET'S BUILD SOMETHING COOL TOGETHER. DROP ME A LINE IF YOU HAVE A PROJECT IN MIND.
            </p>
          </div>
          
          <div>
            <div className="w-[120px] h-[2px] bg-[#FF5F1F] opacity-40 mb-4 lg:mb-6"></div>
            <LocalTime />
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-center justify-between min-h-[300px] opacity-30 px-4">
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V4M5 11l7-7 7 7"/></svg>
           <div className="w-[1px] flex-grow bg-black my-2"></div>
           <div className="w-[4px] h-[4px] bg-black rounded-full"></div>
        </div>

        {/* Right Block (Links) */}
        <div className="flex flex-col justify-between font-mono text-sm md:text-lg lg:text-xl font-bold tracking-widest uppercase items-start text-left min-w-[200px] h-full pt-1 pb-1">
          <a href="mailto:losereasp@gmail.com" className="pb-1 border-b-[3px] border-[#FF5F1F] hover:text-[#FF5F1F] transition-colors">losereasp@gmail.com</a>
          <a href="https://t.me/losereasp" target="_blank" rel="noopener noreferrer" className="pb-1 border-b-[3px] border-[#FF5F1F] hover:text-[#FF5F1F] transition-colors">TELEGRAM</a>
          <a href="https://www.instagram.com/yaroslav.losereasp/" target="_blank" rel="noopener noreferrer" className="pb-1 border-b-[3px] border-[#FF5F1F] hover:text-[#FF5F1F] transition-colors">INSTAGRAM</a>
          <a href="https://www.threads.com/@yaroslav.losereasp" target="_blank" rel="noopener noreferrer" className="pb-1 border-b-[3px] border-[#FF5F1F] hover:text-[#FF5F1F] transition-colors">THREADS</a>
          <a href="https://www.linkedin.com/in/losereasp/" target="_blank" rel="noopener noreferrer" className="pb-1 border-b-[3px] border-[#FF5F1F] hover:text-[#FF5F1F] transition-colors">LINKEDIN</a>
          <a href="https://vimeo.com/1175696148" target="_blank" rel="noopener noreferrer" className="pb-1 border-b-[3px] border-[#FF5F1F] hover:text-[#FF5F1F] transition-colors">VIMEO REEL</a>
        </div>
      </div>
    </footer>
  );
}
