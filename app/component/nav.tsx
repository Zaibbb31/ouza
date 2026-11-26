'use client';
import { useState, useEffect } from 'react';

interface NavbarProps {
  menuOpen?: boolean;
  setMenuOpen?: (open: boolean | ((prev: boolean) => boolean)) => void;
  closeMenu?: () => void;
}

export default function Navbar({
  menuOpen: controlledMenuOpen,
  setMenuOpen: controlledSetMenuOpen,
  closeMenu: controlledCloseMenu,
}: NavbarProps = {}) {
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);

  const isControlled = controlledMenuOpen !== undefined;
  const menuOpen = isControlled ? controlledMenuOpen : internalMenuOpen;

  const setMenuOpen = (open: boolean | ((prev: boolean) => boolean)) => {
    if (isControlled && controlledSetMenuOpen) {
      controlledSetMenuOpen(open);
    } else {
      setInternalMenuOpen(open);
    }
  };

  const handleClose = () => {
    if (controlledCloseMenu) {
      controlledCloseMenu();
    } else {
      setMenuOpen(false);
    }
    setMobileMenuExpanded(false);
  };

  const handleToggle = () => {
    if (menuOpen) {
      handleClose();
    } else {
      setMenuOpen(true);
    }
  };

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [menuOpen]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // Close mobile menu if window resizes to desktop breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && menuOpen) {
        handleClose();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  // Scroll detection for header style change
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* =========================================================
          TOP BAR
      ========================================================= */}
      <div className="w-full h-[34px] bg-[#F8F6EE] text-[#1E1815] border-b border-[#E8DEC8] overflow-hidden text-[11px] sm:text-[12px] flex items-center relative z-[101]">
        <div className="max-w-[1180px] w-[92%] h-full mx-auto flex items-center justify-between tracking-[0.6px]">
          <span className="hidden md:inline truncate text-[#1E1815]/85 font-medium">45, MURKUTE COMPLEX, BANER DP ROAD · BANER, PUNE, MAHARASHTRA</span>
          <span className="w-full md:w-auto text-center md:text-right shrink-0 truncate text-[#1E1815]/90 flex items-center justify-center md:justify-end gap-2.5">
            <a href="tel:+919146193535" className="hover:text-[#B36840] hover:underline font-medium">+91 91461 93535</a>
            <span>·</span>
            <a href="https://wa.me/919146193535" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] hover:underline font-medium">WhatsApp</a>
            <span>·</span>
            <a href="https://www.instagram.com/ouza_pune?cnvx=MWtoMjlzc3FnOWFqMA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-[#B36840] hover:underline font-medium">@ouza_pune</a>
            <span>·</span>
            <span>OPEN DAILY 12PM — 12AM</span>
          </span>
        </div>
      </div>

      {/* =========================================================
          HEADER
      ========================================================= */}
      <header
        id="header"
        className={`fixed left-0 w-full z-[100] transition-all duration-300 ${
          scrolled
            ? 'top-0 bg-[#F8F6EE]/95 backdrop-blur-md text-[#1E1815] border-b border-[#E8DEC8]/60 shadow-[0_5px_30px_rgba(0,0,0,0.08)]'
            : 'top-[34px] text-white bg-gradient-to-b from-black/50 via-black/20 to-transparent'
        }`}
      >
        <div className="max-w-[1240px] w-[92%] h-[80px] lg:h-[88px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="w-[105px] sm:w-[120px] lg:w-[125px] h-auto block shrink-0">
            <img
              src={scrolled ? '/logocolour.svg' : '/logo-white.svg'}
              alt="Ouza Cocktail Bar & Kitchen"
              className="block w-full h-auto max-h-[42px] sm:max-h-[46px] object-contain transition-all duration-300"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                if (target.nextElementSibling) (target.nextElementSibling as HTMLElement).style.display = 'block';
              }}
            />
            <span style={{ display: 'none' }} className="font-serif italic text-[20px] leading-[0.8] text-[#B36840]">
              ouza
              <small className="block font-sans not-italic text-[7px] tracking-[2px] mt-1 text-[#1E1815]">COCKTAIL BAR &bull; KITCHEN</small>
            </span>
          </a>

          {/* Centered Navigation Links on Desktop */}
          <nav
            id="navigation"
            aria-label="Main Navigation"
            className="hidden lg:flex lg:flex-row lg:flex-1 lg:justify-center lg:items-center lg:gap-[28px] xl:gap-[36px] lg:text-[15px] lg:font-sans lg:font-semibold"
          >
            <a
              href="#about"
              className="hover:text-[#B36840] transition-colors"
            >
              About us
            </a>

            {/* Desktop Menu with Dropdown */}
            <div
              className="relative py-2 group"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex items-center gap-1.5 hover:text-[#B36840] transition-colors cursor-pointer select-none"
                aria-expanded={dropdownOpen}
              >
                <span>Menu</span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Card */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[220px] transition-all duration-200 z-50 ${
                  dropdownOpen
                    ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                    : 'opacity-0 invisible translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto'
                }`}
              >
                <div className="bg-[#F8F6EE] text-[#1E1815] rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.18)] border border-[#E8DEC8] p-2 flex flex-col gap-1">
                  <a
                    href="/menu%20copy/food%20menu.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[14px] font-medium hover:bg-[#EFEADA] hover:text-[#B36840] transition-colors group/item"
                  >
                    <span>Food Menu</span>
                    <span className="text-[11px] text-[#7A6F66] uppercase font-semibold tracking-wider group-hover/item:text-[#B36840]">PDF ↗</span>
                  </a>
                  <a
                    href="/menu%20copy/OUZA%20-%20bar%20menu.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[14px] font-medium hover:bg-[#EFEADA] hover:text-[#B36840] transition-colors group/item"
                  >
                    <span>Bar Menu</span>
                    <span className="text-[11px] text-[#7A6F66] uppercase font-semibold tracking-wider group-hover/item:text-[#B36840]">PDF ↗</span>
                  </a>
                  <a
                    href="/menu%20copy/Ouza%20Cocktail%20Book.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[14px] font-medium hover:bg-[#EFEADA] hover:text-[#B36840] transition-colors group/item"
                  >
                    <span>Cocktail Book</span>
                    <span className="text-[11px] text-[#7A6F66] uppercase font-semibold tracking-wider group-hover/item:text-[#B36840]">PDF ↗</span>
                  </a>
                </div>
              </div>
            </div>

            <a
              href="#experience"
              className="hover:text-[#B36840] transition-colors"
            >
              Experience
            </a>
            <a
              href="#events"
              className="hover:text-[#B36840] transition-colors"
            >
              What&apos;s On
            </a>
            <a
              href="#location"
              className="hover:text-[#B36840] transition-colors"
            >
              Location
            </a>
          </nav>

          {/* Right Action Button (Desktop) & Hamburger (Mobile) */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#reservation"
              style={{ color: '#ffffff' }}
              className="hidden lg:inline-flex items-center justify-center bg-[#B36840] hover:bg-[#96522E] !text-white px-5 py-2.5 rounded-full text-[14px] font-semibold transition-all hover:scale-105 shadow-sm"
            >
              Book a table →
            </a>

            <button
              type="button"
              id="mobileMenu"
              onClick={handleToggle}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className={`lg:hidden flex items-center justify-center w-[44px] h-[44px] rounded-full cursor-pointer transition-all duration-200 border-0 shadow-md ${
                scrolled
                  ? 'bg-[#B36840] text-white hover:bg-[#96522E] active:scale-95'
                  : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm active:scale-95'
              }`}
            >
              {menuOpen ? (
                <svg
                  className="w-5 h-5 fill-none stroke-current"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 fill-none stroke-current"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          MOBILE NAVIGATION DRAWER / MODAL OVERLAY
          (Rendered outside header to avoid backdrop-filter containing block bug)
      ========================================================= */}
      <div
        id="mobileNavigation"
        className={`lg:hidden fixed inset-0 z-[200] transition-opacity duration-300 ${
          menuOpen
            ? 'opacity-100 pointer-events-auto visible'
            : 'opacity-0 pointer-events-none invisible'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
          onClick={handleClose}
          aria-hidden="true"
        />

        {/* Drawer Panel */}
        <div
          className={`relative w-full h-full bg-[#1E1815] text-white flex flex-col justify-between transition-transform duration-300 ease-out overflow-hidden shadow-2xl ${
            menuOpen ? 'translate-y-0' : '-translate-y-6'
          }`}
        >
          {/* Top Bar inside Drawer */}
          <div className="h-[74px] px-6 flex items-center justify-between border-b border-white/10 shrink-0 bg-[#2B231F]">
            <a href="#home" onClick={handleClose} className="w-[95px] sm:w-[105px] block">
              <img
                src="/logo-white.svg"
                alt="Ouza Cocktail Bar & Kitchen"
                className="w-full h-auto max-h-[38px] sm:max-h-[42px] object-contain"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  if (target.nextElementSibling) (target.nextElementSibling as HTMLElement).style.display = 'block';
                }}
              />
              <span style={{ display: 'none' }} className="font-serif italic text-[22px] leading-tight text-[#F8F6EE]">
                ouza
                <small className="block font-sans not-italic text-[8px] tracking-[2px] mt-0.5 text-[#E29D76]">COCKTAIL BAR &bull; KITCHEN</small>
              </span>
            </a>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close navigation menu"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer border border-white/15"
            >
              <svg
                className="w-5 h-5 fill-none stroke-current"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable Nav Links & Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col justify-between">
            <nav className="flex flex-col gap-3">
              <a
                href="#about"
                onClick={handleClose}
                className="font-serif text-[24px] sm:text-[26px] text-white/95 hover:text-[#E29D76] py-2 border-b border-white/5 transition-colors flex items-center justify-between"
              >
                <span>About us</span>
                <span className="text-[14px] font-sans text-white/40">01</span>
              </a>

              {/* Mobile Menu Accordion */}
              <div className="border-b border-white/5 pb-2">
                <button
                  type="button"
                  onClick={() => setMobileMenuExpanded(!mobileMenuExpanded)}
                  className="w-full flex items-center justify-between font-serif text-[24px] sm:text-[26px] text-white/95 hover:text-[#E29D76] py-2 transition-colors cursor-pointer select-none"
                  aria-expanded={mobileMenuExpanded}
                >
                  <div className="flex items-center gap-3">
                    <span>Our Menus</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[14px] font-sans text-white/40">02</span>
                    <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-200 ${mobileMenuExpanded ? 'rotate-180 bg-[#B36840] text-white' : 'text-white/70'}`}>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>

                {mobileMenuExpanded && (
                  <div className="mt-2 mb-2 flex flex-col gap-2 pl-2">
                    <a
                      href="/menu%20copy/food%20menu.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleClose}
                      className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white font-sans text-[15px] font-medium transition-all group"
                    >
                      <span className="group-hover:text-[#E29D76] transition-colors">Food Menu</span>
                      <span className="text-[11px] font-semibold tracking-wider text-[#E29D76] uppercase">PDF ↗</span>
                    </a>
                    <a
                      href="/menu%20copy/OUZA%20-%20bar%20menu.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleClose}
                      className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white font-sans text-[15px] font-medium transition-all group"
                    >
                      <span className="group-hover:text-[#E29D76] transition-colors">Bar Menu</span>
                      <span className="text-[11px] font-semibold tracking-wider text-[#E29D76] uppercase">PDF ↗</span>
                    </a>
                    <a
                      href="/menu%20copy/Ouza%20Cocktail%20Book.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleClose}
                      className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white font-sans text-[15px] font-medium transition-all group"
                    >
                      <span className="group-hover:text-[#E29D76] transition-colors">Cocktail Book</span>
                      <span className="text-[11px] font-semibold tracking-wider text-[#E29D76] uppercase">PDF ↗</span>
                    </a>
                  </div>
                )}
              </div>

              <a
                href="#experience"
                onClick={handleClose}
                className="font-serif text-[24px] sm:text-[26px] text-white/95 hover:text-[#E29D76] py-2 border-b border-white/5 transition-colors flex items-center justify-between"
              >
                <span>Experience</span>
                <span className="text-[14px] font-sans text-white/40">03</span>
              </a>

              <a
                href="#events"
                onClick={handleClose}
                className="font-serif text-[24px] sm:text-[26px] text-white/95 hover:text-[#E29D76] py-2 border-b border-white/5 transition-colors flex items-center justify-between"
              >
                <span>What&apos;s On</span>
                <span className="text-[14px] font-sans text-white/40">04</span>
              </a>

              <a
                href="#location"
                onClick={handleClose}
                className="font-serif text-[24px] sm:text-[26px] text-white/95 hover:text-[#E29D76] py-2 border-b border-white/5 transition-colors flex items-center justify-between"
              >
                <span>Location & Hours</span>
                <span className="text-[14px] font-sans text-white/40">05</span>
              </a>
            </nav>

            <div className="mt-8 flex flex-col gap-6">
              {/* CTA Reservation Button */}
              <a
                href="#reservation"
                onClick={handleClose}
                className="w-full flex items-center justify-center gap-2 bg-[#B36840] hover:bg-[#96522E] text-white border border-[#E29D76]/40 font-sans font-semibold text-[15px] py-4 px-6 rounded-full transition-all shadow-lg active:scale-[0.98]"
              >
                <span>Reserve a Table</span>
                <span className="text-[#E29D76]">→</span>
              </a>

              {/* Quick Info & Phone contact */}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-2 text-white/70 text-[12px] font-sans">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E29D76] animate-pulse"></span>
                  <span className="text-white/85">Open Daily: 12:00 PM — 12:00 AM</span>
                </div>
                <div className="text-white/60">
                  45, Murkute Complex, Baner DP Road · Baner, Pune
                </div>
                <div className="flex flex-col gap-1.5 text-white/90 font-medium pt-1">
                  <div className="flex items-center gap-3">
                    <a href="tel:+919146193535" className="hover:text-[#E29D76] underline text-[13px]">Call: +91 91461 93535</a>
                    <span className="text-white/30">|</span>
                    <a href="https://wa.me/919146193535" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline text-[13px] font-semibold">WhatsApp ↗</a>
                  </div>
                  <a
                    href="https://www.instagram.com/ouza_pune?cnvx=MWtoMjlzc3FnOWFqMA%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#E29D76] text-[12px] text-white/80 flex items-center gap-1.5 mt-0.5"
                  >
                    <span>Instagram: @ouza_pune</span>
                    <span className="text-[#E29D76]">↗</span>
                  </a>
                  <a href="mailto:contact@ouzapune.com" className="hover:text-[#E29D76] text-[11px] text-white/60">contact@ouzapune.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
