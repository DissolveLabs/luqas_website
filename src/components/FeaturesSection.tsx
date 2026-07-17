import { motion } from "framer-motion";

export default function FeaturesSection() {
  return (
    <section className="w-full flex flex-col items-center justify-center py-20 lg:py-32 px-4 relative">
      <div className="max-w-[1440px] w-full flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16 lg:gap-8">
        
        {/* Left Column - Features */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col max-w-[500px]"
        >
          <h2 className="font-adlam text-[45px] lg:text-[55px] leading-[1.05] text-[#222222] tracking-[-0.04em] mb-12">
            Real Conversations.<br/>Real Emotions.
          </h2>
          
          <div className="flex flex-col gap-6">
            {/* Feature 1 */}
            <div className="bg-[#F8F9FA] rounded-2xl p-6 flex items-center gap-6">
              <motion.div 
                initial={{ scale: 0, rotate: -45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                whileHover={{ y: -5, scale: 1.1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0 text-primary cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </motion.div>
              <p className="text-[18px] text-[#222222]">Text chat, when you&apos;d rather type</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#F8F9FA] rounded-2xl p-6 flex items-center gap-6">
              <motion.div 
                initial={{ scale: 0, rotate: -45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                whileHover={{ y: -5, scale: 1.1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0 text-primary cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="22"></line>
                </svg>
              </motion.div>
              <p className="text-[18px] text-[#222222]">Voice notes, back and forth, whenever you like</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#F8F9FA] rounded-2xl p-6 flex items-center gap-6">
              <motion.div 
                initial={{ scale: 0, rotate: -45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                whileHover={{ y: -5, scale: 1.1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0 text-primary cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </motion.div>
              <p className="text-[18px] text-[#222222]">Memory that carries across every conversation</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Chat Demo Box */}
        <div className="w-full max-w-[550px] bg-[#F8F9FA] rounded-3xl p-8 lg:p-12 relative flex flex-col gap-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray/5">
          <p className="text-[16px] leading-[26px] text-gray mb-4">
            Our live turns-based AI mimics the rhythm of a real phone call. No waiting for a bot to process—just natural, real-time responses in the voice you love.
          </p>

          {/* Message 1 */}
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-white shadow-sm">
               <img src="https://ui-avatars.com/api/?name=S+D&background=D4A95F&color=fff&bold=true" alt="You" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="bg-white rounded-2xl rounded-tl-sm p-4 text-[15px] text-[#222222] shadow-sm border border-gray/5 w-full">
                How did you handle challenges when you were my age?
              </div>
              <span className="text-[12px] text-gray text-right pr-2">09:30 AM</span>
            </div>
          </div>

          {/* Message 2 (Voice Note) */}
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-white shadow-sm">
               <img src="https://ui-avatars.com/api/?name=D&background=4E54C8&color=fff&bold=true" alt="Dad" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="bg-light rounded-2xl rounded-tl-sm p-3 shadow-sm border border-primary/10 w-full flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-sm flex-shrink-0 cursor-pointer hover:bg-primary/90">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                {/* Fake audio waveform */}
                <div className="flex-1 flex items-center gap-[2px] h-6 opacity-60">
                   {[...Array(25)].map((_, i) => (
                     <div key={i} className="w-1 bg-primary rounded-full" style={{ height: `${Math.max(20, Math.random() * 100)}%` }}></div>
                   ))}
                </div>
                <span className="text-[13px] text-primary font-medium flex-shrink-0 pr-2">0:24</span>
              </div>
              <span className="text-[12px] text-gray text-right pr-2">09:35 AM</span>
            </div>
          </div>

          {/* Message 3 */}
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-white shadow-sm">
               <img src="https://ui-avatars.com/api/?name=S+D&background=D4A95F&color=fff&bold=true" alt="You" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="bg-white rounded-2xl rounded-tl-sm p-4 text-[15px] text-[#222222] shadow-sm border border-gray/5 w-full">
                That really helps, Dad.
              </div>
              <span className="text-[12px] text-gray text-right pr-2">09:32 AM</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
