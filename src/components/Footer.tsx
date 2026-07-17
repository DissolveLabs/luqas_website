import Image from "next/image";

const NAV_LINKS = [
  { label: "About", href: "#why-luqas" },
  { label: "Privacy", href: "#" },
  { label: "Consent & Data", href: "#" },
  { label: "Contact", href: "mailto:hello@luqas.app" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-white pt-20 pb-10">
      <div className="max-w-[1250px] mx-auto px-4 md:px-6 flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[auto_auto_1fr_auto_auto] gap-x-16 gap-y-10 items-start">
          {/* Brand */}
          <div className="flex flex-col items-start">
            <Image src="/sources/footer/logo-footer.svg" alt="Luqas" width={96} height={100} className="w-[96px] h-[100px]" />
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-3.5 pt-1">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="text-[15px] text-white/85 hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Address */}
          <div className="flex flex-col gap-4 pt-1">
            <span className="text-[13px] font-bold tracking-[0.1em] uppercase text-white">Address</span>
            <span className="text-[16px] text-white/85">42 Innovation Drive, Suite 300,<br />San Francisco, CA 94105</span>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4 pt-1">
            <span className="text-[13px] font-bold tracking-[0.1em] uppercase text-white">Contact Us</span>
            <a href="tel:+14150001234" className="flex items-center gap-3 text-white/85 text-[15px] hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
              +1 (415) 000-1234
            </a>
            <a href="mailto:hello@luqas.app" className="flex items-center gap-3 text-white/85 text-[15px] hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M4 7l6.2 4.65a3 3 0 0 0 3.6 0L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              hello@luqas.app
            </a>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4 pt-1">
            <span className="text-[13px] font-bold tracking-[0.1em] uppercase text-white">Follow Us</span>
            <div className="flex items-center gap-5">
              <a href="https://facebook.com/luqasai" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/85 hover:text-white transition-colors">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.294h-3.128v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" /></svg>
              </a>
              <a href="https://linkedin.com/company/luqasai" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/85 hover:text-white transition-colors">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a href="https://x.com/luqasai" target="_blank" rel="noopener noreferrer" aria-label="X" className="text-white/85 hover:text-white transition-colors">
                <svg width="19" height="19" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-white/15" />

        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 text-[14px] text-white/85">
          <span>© 2026 All Rights Reserved | Company No 09145673 | Vat No GB265704102</span>
          <a href="#" className="underline underline-offset-4 hover:text-white transition-colors">Privacy policy</a>
        </div>
      </div>
    </footer>
  );
}
