'use client';
import { useState, useEffect } from 'react';
import Navbar from './component/nav';
import CircularText from './component/CircularText';
import CTA from './component/cta';

const galleryImages = [
  "/carousel/DSC00763.jpg",
  "/carousel/DSC02105.jpg",
  "/carousel/DSC02144.jpg",
  "/carousel/DSC02949.jpg",
  "/carousel/DSC03082.jpg",
  "/carousel/DSC03106.jpg",
  "/carousel/DSC06515.jpg",
  "/carousel/DSC08562.jpg",
  "/carousel/DSC09996.jpg",
];

const foodImages = [
  "/food/DSC01590.jpg",
  "/food/DSC01689.jpg",
  "/food/DSC01785.jpg",
  "/food/DSC01914.jpg",
  "/food/DSC01949.jpg",
  "/food/DSC02059.jpg",
  "/food/DSC02092.jpg",
  "/food/DSC08496.jpg",
  "/food/DSC08560.jpg",
  "/food/DSC08630.jpg",
];

const drinksImages = [
  "/photos/DSC00103.JPG",
  "/photos/DSC00088.JPG",
  "/photos/DSC00116.JPG",
  "/photos/DSC00089.JPG",
  "/photos/DSC00076.JPG",
  "/photos/DSC00062.JPG",
];

const partyImages = [
  "/photos/DSC04898.JPG",
  "/photos/DSC04897.JPG",
  "/photos/DSC00076.JPG",
  "/photos/DSC00085.JPG",
  "/photos/DSC04826.JPG",
  "/photos/DSC04832.JPG",
  "/photos/DSC09964.JPG",
];

const cocktailImages = [
  "/cocktail/0I4A0960.jpg",
  "/cocktail/0I4A1048.jpg",
  "/cocktail/DSC00685.jpg",
  "/cocktail/DSC03044.jpg",
];

const menuCategories = [
  { id: 'food' as const, label: 'Food Menu', pdf: '/menu%20copy/food%20menu.pdf' },
  { id: 'bar' as const, label: 'Bar Menu', pdf: '/menu%20copy/OUZA%20-%20bar%20menu.pdf' },
  { id: 'cocktails' as const, label: 'Cocktail Book', pdf: '/menu%20copy/Ouza%20Cocktail%20Book.pdf' },
];

const menuItemsData: Record<string, Array<{ num: string; name: string; price: string; desc: string }>> = {
  food: [
    { num: '01', name: 'Chimichurri Fish Tikka', price: '', desc: 'Tender river sole marinated in aromatic zesty chimichurri herbs, flame-grilled in the tandoor' },
    { num: '02', name: 'Truffle Mushroom Croquettes', price: '', desc: 'Crispy golden panko crust with wild forest mushroom duxelles, parmesan & black truffle aioli' },
    { num: '03', name: 'Labneh with Sundried Tomato Salsa', price: '', desc: 'Velvety house-hung labneh, za\'atar, spiced sundried tomato salsa & warm handmade pita' },
    { num: '04', name: 'Crisp Butter Garlic Calamari', price: '', desc: 'Tender squid rings tossed in browned garlic butter, bird\'s eye chilli & fresh scallions' },
    { num: '05', name: 'Chicken Balchão Brioche Pao', price: '', desc: 'Goan-style spiced tangy pulled chicken balchão served with buttery toasted brioche pao' },
    { num: '06', name: 'Avocado & Burrata Flatbread', price: '', desc: 'Crisp artisan flatbread, crushed hass avocado, creamy burrata, cherry tomatoes & aged balsamic' },
    { num: '07', name: 'Kung Pao Chicken Rice Bowl', price: '', desc: 'Wok-tossed chicken in fiery sweet-soy glaze, toasted peanuts, bell peppers & fragrant jasmine rice' },
    { num: '08', name: 'Smoked Butter Chicken & Garlic Naan', price: '', desc: 'Clay-oven roasted chicken simmered in rich velvety tomato makhani gravy, served with crisp garlic naan' },
    { num: '09', name: 'Ouza Belgian Chocolate Tart', price: '', desc: 'Dark Belgian chocolate ganache, sea salt caramel layer, roasted hazelnut crumble & vanilla bean gelato' },
  ],
  bar: [
    { num: '01', name: 'House Guava Craft Beer', price: '₹450', desc: 'Craft wheat beer infused with ripe tropical guava, a pinch of chilli salt & crisp wheat finish' },
    { num: '02', name: 'Blueberry Artisanal Ale', price: '₹475', desc: 'Refreshing berry craft ale brewed with mountain blueberries & subtle citrus undertones' },
    { num: '03', name: 'Belgian Style Witbier', price: '₹450', desc: 'Classic cloudy wheat brew with toasted coriander seeds & dried orange peel' },
    { num: '04', name: 'Curated International Vintage Wine', price: '₹1,200', desc: 'Handpicked international and Indian estate vintage pours available by the glass' },
    { num: '05', name: 'Sparkling Italian Prosecco', price: '₹950', desc: 'Crisp, light, effervescent bubbles with green apple and white peach aromas' },
    { num: '06', name: 'Aged Single Malt & Scotch', price: '₹850', desc: 'Curated library of Highland and Islay single malts, aged bourbons & premium blended scotches' },
    { num: '07', name: 'Artisanal Botanical Gin', price: '₹750', desc: 'Small-batch craft gins paired with artisanal tonics, dehydrated botanicals & herbs' },
    { num: '08', name: 'Premium Aged Dark & Spiced Rum', price: '₹650', desc: 'Oak-barrel aged spiced rums, rich molasses notes & smooth lingering finish' },
    { num: '09', name: 'Ouza Sangria Pitcher / Glass', price: '₹650', desc: 'Red or white wine infused with seasonal orchard fruits, brandy & fresh citrus' },
  ],
  cocktails: [
    { num: '01', name: 'Ouza Botanical Spritz', price: '', desc: 'Garden botanicals, elderflower cordial, sparkling prosecco & chilled citrus tonic' },
    { num: '02', name: 'Clarified Citrus Milk Punch', price: '', desc: 'Spiced rum, grilled pineapple, aromatic bitters & silky clarified whey' },
    { num: '03', name: 'Kokum & Smoked Mezcalita', price: '', desc: 'Artisanal mezcal, fresh Konkan kokum nectar, lime & smoked pink salt rim' },
    { num: '04', name: 'Ouza Smoked Old Fashioned', price: '', desc: 'Bourbon whiskey, barrel-aged bitters, charred orange peel & applewood smoke' },
  ],
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'food' | 'bar' | 'cocktails'>('food');

  const currentCategory = menuCategories.find((c) => c.id === activeTab) || menuCategories[0];
  const activeItems = menuItemsData[activeTab] || menuItemsData.food;
  const categoryImages =
    activeTab === 'bar' ? drinksImages : activeTab === 'cocktails' ? cocktailImages : foodImages;

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="min-h-screen bg-[#F8F6EE] text-[#1E1815] font-sans">

      {/* Navbar Component */}
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} closeMenu={closeMenu} />

      {/* =========================================================
          HERO
      ========================================================= */}
      <section id="home" className="hero relative h-[100dvh] min-h-[600px] flex items-center overflow-hidden bg-[#1E1815] text-white">
        <div
          className="hero-image absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url("/DSC06513.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <img src="/DSC06513.jpg" alt="Ouza Cocktail Bar & Kitchen" className="w-full h-full object-cover" />
        </div>

        {/* Hero Gradient Overlay */}
        <div className="hero-overlay absolute inset-0 bg-gradient-to-r from-[#1E1815]/90 via-[#1E1815]/70 to-[#1E1815]/20 max-lg:from-[#1E1815]/95 max-lg:to-[#1E1815]/65" />
          
        <div className="hero-content relative z-[2] max-w-[1180px] w-[92%] mx-auto pt-[90px] max-lg:pt-[70px]">
          <span className="eyebrow text-[#E29D76] text-[13px] font-medium tracking-[2px] uppercase block">
            WELCOME TO OUZA · COCKTAIL BAR &amp; KITCHEN · BANER, PUNE
          </span>

          <h1 className="font-serif !text-[clamp(42px,5.5vw,82px)] font-normal leading-[0.92] tracking-[-2px] lg:tracking-[-3px] mt-4 max-w-[680px]">
            For the <em className="text-[#E29D76] not-italic">pleasure</em><br />
            of a good table.
          </h1>

          <p className="hero-text text-white/75 !text-[17px] max-lg:!text-[15px] leading-[1.8] max-w-[480px] mt-6 max-lg:mt-5">
            Nestled in Baner, Ouza brings people together over thoughtfully crafted dishes, artisanal cocktails, signature craft beers, and warm evenings that make every moment worth savouring.
          </p>

          <div className="hero-buttons flex items-center gap-[25px] mt-[35px] max-lg:flex-col max-lg:items-start max-lg:gap-4">
            <a
              href="#reservation"
              onClick={closeMenu}
              style={{ backgroundColor: '#B36840', color: '#ffffff' }}
              className="red-button inline-flex items-center justify-center gap-2 hover:bg-[#96522E] !text-white min-h-[48px] px-7 py-4 rounded-full text-[14px] font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
            >
              Reserve your table →
            </a>
            <a
              href="#menu"
              onClick={closeMenu}
              style={{ color: '#ffffff' }}
              className="hero-menu-link text-white text-[15px] border-b border-white pb-1 hover:text-[#E29D76] hover:border-[#E29D76] transition-colors"
            >
              Explore the menu →
            </a>
          </div>
        </div>

        {/* Hero booking card (Desktop) */}
        <div className="hero-booking absolute right-[5%] !bottom-[160px] xl:!bottom-[180px] z-[10] w-[310px] bg-[#F8F6EE] text-[#1E1815] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-[#E8DEC8] hidden lg:block">
          <small className="block text-[#B36840] text-[11px] tracking-[2px] font-bold">
            YOUR TABLE AWAITS
          </small>
          <strong className="block font-serif font-normal text-[30px] leading-[1.05] my-3">
            Make an evening<br />
            <em className="text-[#B36840] not-italic">of it in Baner.</em>
          </strong>
          <div className="booking-row flex justify-between border-b border-[#E8DEC8] py-3 text-[12px]">
            <span>Guests</span>
            <span className="text-[#7A6F66]">2 Guests</span>
          </div>
          <div className="booking-row flex justify-between border-b border-[#E8DEC8] py-3 text-[12px]">
            <span>Date</span>
            <span className="text-[#7A6F66]">Select date</span>
          </div>
          <div className="booking-row flex justify-between border-b border-[#E8DEC8] py-3 text-[12px]">
            <span>Time</span>
            <span className="text-[#7A6F66]">Select time</span>
          </div>
          <a
            href="#reservation"
            onClick={closeMenu}
            style={{ backgroundColor: '#B36840', color: '#ffffff' }}
            className="booking-link block hover:bg-[#96522E] !text-white text-center mt-5 p-3 text-[12px] font-semibold transition-colors"
          >
            BOOK YOUR TABLE →
          </a>
        </div>
      </section>

      {/* =========================================================
          FEATURES
      ========================================================= */}
      <section className="features bg-[#FFFFFF] border-b border-[#E8DEC8]">
        <div className="container max-w-[1180px] w-[92%] mx-auto features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="feature p-[30px_25px] max-lg:p-6 border-b sm:border-r border-[#E8DEC8] lg:border-b-0">
            <div className="feature-icon text-[#B36840] text-[22px] mb-2.5">✦</div>
            <h3 className="text-[15px] font-bold">01. Coastal &amp; Global Flavours</h3>
            <p className="text-[#7A6F66] text-[14px] leading-[1.65] mt-1">
              Mediterranean mezze, coastal grills &amp; Asian wok classics.
            </p>
          </div>
          <div className="feature p-[30px_25px] max-lg:p-6 border-b lg:border-r lg:border-b-0 border-[#E8DEC8]">
            <div className="feature-icon text-[#B36840] text-[22px] mb-2.5">♡</div>
            <h3 className="text-[15px] font-bold">02. Artisanal Mixology</h3>
            <p className="text-[#7A6F66] text-[14px] leading-[1.65] mt-1">
              Craft cocktails, craft beers &amp; botanical elixirs.
            </p>
          </div>
          <div className="feature p-[30px_25px] max-lg:p-6 border-b sm:border-r border-[#E8DEC8] sm:border-b-0">
            <div className="feature-icon text-[#B36840] text-[22px] mb-2.5">—</div>
            <h3 className="text-[15px] font-bold">03. Electric Baner Vibe</h3>
            <p className="text-[#7A6F66] text-[14px] leading-[1.65] mt-1">
              Warm terracotta aesthetics, live music &amp; DJ nights.
            </p>
          </div>
          <div className="feature p-[30px_25px] max-lg:p-6">
            <div className="feature-icon text-[#B36840] text-[22px] mb-2.5">◌</div>
            <h3 className="text-[15px] font-bold">04. Evenings That Linger</h3>
            <p className="text-[#7A6F66] text-[14px] leading-[1.65] mt-1">
              Come for dinner. Stay for the high-energy celebrations.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          ABOUT / PHILOSOPHY
      ========================================================= */}
      <section id="about" className="about py-[120px] max-lg:py-20 bg-[#F8F6EE]">
        <div className="container max-w-8xl 2xl:max-w-8xl w-[94%] mx-auto about-grid grid grid-cols-1 lg:grid-cols-2 gap-[60px] lg:gap-[100px] items-center">
          <div className="about-images relative pr-0 lg:pr-[60px]">
            <img
              src="/bigimage.jpg"
              alt="Ouza dining"
              loading="lazy"
              className="about-main w-full lg:w-[90%] h-[420px] lg:h-[530px] object-cover object-center lg:ml-2"
            />
            <img
              src="/smallimage.jpg"
              alt="Ouza food"
              loading="lazy"
              className="about-small absolute right-0 bottom-0 w-[135px] lg:w-[190px] h-[155px] lg:h-[210px] object-cover border-[6px] lg:border-[9px] border-[#F8F6EE]"
            />
            <div className="absolute right-1 lg:right-[15px] top-2 lg:top-[15px] w-[130px] lg:w-[150px] h-[130px] lg:h-[150px] flex items-center justify-center z-[4] pointer-events-auto">
              <CircularText
                text="OUZA*COCKTAIL BAR*KITCHEN*" 
                spinDuration={20}
                onHover="speedUp"
                className="!w-[130px] !h-[130px] lg:!w-[150px] lg:!h-[150px] !text-[#B36840] text-[12px] font-bold"
              />
            </div>
          </div>

          <div className="about-content">
            <span className="eyebrow text-[#B36840] text-[13px] max-lg:text-[11px] font-medium tracking-[2px] uppercase block">
              OUR PHILOSOPHY · औजा कॉकटेल बार • किचन
            </span>
            <h2 className="section-title font-serif font-normal !text-[clamp(38px,4.2vw,54px)] leading-[1.02] tracking-[-1.5px] mt-4">
              Come for the flavours.<br />
              <em className="text-[#B36840] not-italic">Stay for the spirit.</em>
            </h2>
            <p className="section-description text-[#7A6F66] !text-[16px] max-lg:!text-[15px] leading-[1.8] mt-5">
              At Ouza Cocktail Bar &amp; Kitchen, every evening is an invitation to unwind, celebrate, and savour the good things in life. Located on Baner DP Road, we blend warm Mediterranean soul with Pune&apos;s dynamic nightlife.
            </p>
            <p className="section-description text-[#7A6F66] !text-[16px] max-lg:!text-[15px] leading-[1.8] mt-4">
              Our culinary craft spans zesty coastal tikkas, crispy calamari, artisan flatbreads, and authentic Asian bowls, paired with signature cocktails and fruit-infused craft beers.
            </p>
            <a
              href="#reservation"
              onClick={closeMenu}
              className="underline-link inline-block text-[14px] font-semibold border-b border-current pb-1 mt-7 hover:text-[#B36840] transition-colors"
            >
              Reserve your table in Baner →
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          STATS
      ========================================================= */}
      <section className="stats bg-[#B36840] text-[#F8F6EE] py-11 max-lg:py-[38px]">
        <div className="container max-w-[1180px] w-[92%] mx-auto stats-grid grid grid-cols-2 lg:grid-cols-4 gap-y-8">
          <div className="stat text-center border-r border-[#F8F6EE]/25 max-lg:border-r-0">
            <strong className="block font-serif text-[47px] max-lg:text-[40px] font-normal leading-tight">BANER</strong>
            <small className="block text-[10px] tracking-[2px] mt-1 text-[#F8F6EE]/80">PUNE LOCATION</small>
          </div>
          <div className="stat text-center lg:border-r border-[#F8F6EE]/25">
            <strong className="block font-serif text-[47px] max-lg:text-[40px] font-normal leading-tight">
              4.5<span className="text-[27px]">★</span>
            </strong>
            <small className="block text-[10px] tracking-[2px] mt-1 text-[#F8F6EE]/80">GUEST RATING</small>
          </div>
          <div className="stat text-center border-r border-[#F8F6EE]/25 max-lg:border-r-0">
            <strong className="block font-serif text-[47px] max-lg:text-[40px] font-normal leading-tight">7</strong>
            <small className="block text-[10px] tracking-[2px] mt-1 text-[#F8F6EE]/80">DAYS A WEEK · 12PM-12AM</small>
          </div>
          <div className="stat text-center">
            <strong className="block font-serif text-[47px] max-lg:text-[40px] font-normal leading-tight">∞</strong>
            <small className="block text-[10px] tracking-[2px] mt-1 text-[#F8F6EE]/80">MEMORABLE NIGHTS</small>
          </div>
        </div>
      </section>

      {/* =========================================================
          EXPERIENCE
      ========================================================= */}
      <section id="experience" className="experience bg-[#1E1815] text-white py-[120px] max-lg:py-20">
        <div className="container max-w-8xl 2xl:max-w-8xl w-[94%] mx-auto">
          <div className="experience-head flex flex-col lg:flex-row justify-between lg:items-end mb-[55px] max-lg:mb-10 gap-8">
            <div>
              <span className="eyebrow text-[#E29D76] text-[13px] max-lg:text-[11px] font-medium tracking-[2px] uppercase block">
                THE OUZA EXPERIENCE
              </span>
              <h2 className="section-title font-serif font-normal !text-[clamp(38px,4.2vw,54px)] leading-[1.02] tracking-[-1.5px] mt-4">
                More than<br />
                <em className="text-[#E29D76] not-italic">a meal.</em>
              </h2>
            </div>
            <div className="max-w-[480px] space-y-3">
              <p className="section-description text-white/70 !text-[16px] max-lg:!text-[15px] leading-[1.8]">
                From sun-drenched afternoon lunches to high-energy DJ nights, craft beer tastings, and weekend celebrations, Ouza is Baner&apos;s destination for memorable dining.
              </p>
            </div>
          </div>

          <div className="experience-grid !grid grid-cols-1 md:!grid-cols-3 gap-4 lg:gap-5">
            <article className="experience-card relative h-[480px] max-lg:h-[400px] overflow-hidden group">
              <img
                src="/DSC07873.jpg"
                alt="Bar Menu"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="experience-content absolute z-[2] left-[30px] right-[30px] bottom-[30px] max-lg:left-[22px] max-lg:right-[22px] max-lg:bottom-[22px]">
                <small className="text-[#E29D76] text-[11px] tracking-[2px] block">01 · BAR MENU</small>
                <h3 className="font-serif text-[33px] max-lg:text-[31px] font-normal my-2">Bar Menu</h3>
                <p className="text-white/70 text-[14px] leading-[1.7]">
                  Artisanal craft beers, fine international wines, aged spirits, and refreshing aperitifs.
                </p>
                <a
                  href="/menu%20copy/OUZA%20-%20bar%20menu.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[14px] border-b border-white pb-1 mt-4 hover:text-[#E29D76] hover:border-[#E29D76] transition-colors"
                >
                  View Bar Menu (PDF) →
                </a>
              </div>
            </article>

            <article className="experience-card relative h-[480px] max-lg:h-[400px] overflow-hidden group">
              <img
                src="/theouzaexp/food.jpg"
                alt="Food Menu"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="experience-content absolute z-[2] left-[30px] right-[30px] bottom-[30px] max-lg:left-[22px] max-lg:right-[22px] max-lg:bottom-[22px]">
                <small className="text-[#E29D76] text-[11px] tracking-[2px] block">02 · FOOD MENU</small>
                <h3 className="font-serif text-[33px] max-lg:text-[31px] font-normal my-2">Food Menu</h3>
                <p className="text-white/70 text-[14px] leading-[1.7]">
                  Mediterranean mezze, tandoor grills, fresh seafood, and Modern Indian classics made to share.
                </p>
                <a
                  href="/menu%20copy/food%20menu.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[14px] border-b border-white pb-1 mt-4 hover:text-[#E29D76] hover:border-[#E29D76] transition-colors"
                >
                  View Food Menu (PDF) →
                </a>
              </div>
            </article>

            <article className="experience-card relative h-[480px] max-lg:h-[400px] overflow-hidden group">
              <img
                src="/theouzaexp/cocktail.jpg"
                alt="Cocktail Book"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="experience-content absolute z-[2] left-[30px] right-[30px] bottom-[30px] max-lg:left-[22px] max-lg:right-[22px] max-lg:bottom-[22px]">
                <small className="text-[#E29D76] text-[11px] tracking-[2px] block">03 · COCKTAIL BOOK</small>
                <h3 className="font-serif text-[33px] max-lg:text-[31px] font-normal my-2">Cocktail Book</h3>
                <p className="text-white/70 text-[14px] leading-[1.7]">
                  Ouza&apos;s signature handcrafted mixology, botanical infusions, and theatrical cocktail creations.
                </p>
                <a
                  href="/menu%20copy/Ouza%20Cocktail%20Book.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[14px] border-b border-white pb-1 mt-4 hover:text-[#E29D76] hover:border-[#E29D76] transition-colors"
                >
                  View Cocktail Book (PDF) →
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================
          MENU
      ========================================================= */}
      <section id="menu" className="menu py-[125px] max-lg:py-20 bg-[#F8F6EE]">
        <div className="container max-w-[1180px] w-[92%] mx-auto">
          <div className="menu-head flex flex-col lg:flex-row justify-between lg:items-end mb-11 max-lg:mb-9 gap-5">
            <div>
              <span className="eyebrow text-[#B36840] text-[13px] font-bold tracking-[2px] uppercase block">
                FROM OUR KITCHEN &amp; BAR
              </span>
              <h2 className="section-title font-serif font-normal text-[clamp(46px,5vw,76px)] leading-[0.98] tracking-[-2px] mt-3">
                Good food,<br />
                <em className="text-[#B36840] not-italic">crafted to share.</em>
              </h2>
            </div>
            <p className="section-description text-[#7A6F66] text-[19px] max-lg:text-[16px] leading-[1.8] max-w-[350px]">
              Plates made for passing around, paired with artisanal cocktails and staying as long as you like.
            </p>
          </div>

          {/* Filters & Right Corner "View Menu" Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-9 pb-3 border-b border-[#E8DEC8]">
            {/* Filter Buttons */}
            <div className="menu-tabs flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
              {menuCategories.map((cat) => {
                const isActive = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    style={
                      isActive
                        ? { backgroundColor: '#B36840', color: '#ffffff' }
                        : { backgroundColor: '#ffffff', color: '#1E1815', borderColor: '#E8DEC8' }
                    }
                    className={`px-6 py-2.5 rounded-full text-[13px] sm:text-[14px] font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                      isActive ? 'shadow-sm font-semibold' : 'hover:border-[#B36840] hover:text-[#B36840]'
                    }`}
                    onClick={() => setActiveTab(cat.id)}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* View Menu Button in Right Corner above the images */}
            <div className="flex justify-end shrink-0">
              <a
                href={currentCategory.pdf}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: '#B36840', color: '#ffffff' }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all hover:bg-[#96522E] hover:scale-105 shadow-sm"
              >
                <span>View {currentCategory.label} (PDF)</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Grid with cards: 3 cards per row on desktop */}
          <div className="food-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {activeItems.map((item, index) => {
              const currentImg = categoryImages[index % categoryImages.length];
              return (
                <article
                  key={`${activeTab}-${item.num}-${index}`}
                  className="food-card bg-white p-3 rounded-xl border border-[#E8DEC8] shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="food-image relative h-[250px] sm:h-[270px] overflow-hidden rounded-lg bg-[#F8F6EE]">
                    <img
                      src={currentImg}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <span className="food-number absolute left-3 top-3 px-2.5 py-1 rounded-full bg-white/95 text-[#B36840] text-[11px] font-bold shadow-sm">
                      {item.num}
                    </span>
                  </div>
                  <div className="food-content pt-4 pb-2 px-1">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="food-name font-serif text-[22px] sm:text-[24px] text-[#1E1815] font-normal leading-tight">
                        {item.name}
                      </span>
                      {Boolean(item.price) && (
                        <span className="food-price text-[#B36840] font-serif text-[17px] sm:text-[18px] font-medium shrink-0">
                          {item.price}
                        </span>
                      )}
                    </div>
                    {Boolean(item.desc) && (
                      <p className="food-description text-[#7A6F66] text-[13.5px] leading-[1.6] mt-2">
                        {item.desc}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="menu-bottom text-center mt-12">
            <a
              href={currentCategory.pdf}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#B36840', borderColor: '#B36840' }}
              className="underline-link inline-block text-[14px] font-semibold border-b pb-1 hover:opacity-80 transition-opacity"
            >
              View the full {currentCategory.label} (PDF) →
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          RESERVATION CTA
      ========================================================= */}
      <CTA />

      {/* =========================================================
          EVENTS
      ========================================================= */}
      <section id="events" className="events py-[120px] max-lg:py-20 bg-[#FFFFFF]">
        <div className="container max-w-[1180px] w-[92%] mx-auto events-layout grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-[50px] lg:gap-[100px]">
          <div>
            <span className="eyebrow text-[#B36840] text-[13px] font-bold tracking-[2px] uppercase block">
              WHAT&apos;S ON AT OUZA
            </span>
            <h2 className="section-title font-serif font-normal text-[clamp(46px,5vw,76px)] leading-[0.98] tracking-[-2px] mt-3">
              Come back<br />
              <em className="text-[#B36840] not-italic">for something<br />new.</em>
            </h2>
            <p className="section-description text-[#7A6F66] text-[19px] max-lg:text-[16px] leading-[1.8] mt-6">
              High-energy DJ nights, acoustic sundowners, and seasonal chef specials made for unforgettable memories.
            </p>
          </div>

          <div className="event-list border-t border-[#E8DEC8]">
            {/* Event 1 */}
            <div className="event-row flex items-center justify-between gap-6 py-8 border-b border-[#E8DEC8]">
              <div className="event-info max-w-[580px]">
                <h3 className="font-serif text-[28px] sm:text-[32px] font-normal leading-tight text-[#1E1815]">Friday High-Energy Bar Nights</h3>
                <p className="text-[#7A6F66] text-[15px] sm:text-[16px] leading-[1.6] mt-2">Kick off your weekend with Pune&apos;s finest live DJs, signature craft cocktails, and high-energy bar vibes.</p>
              </div>
              <a href="#reservation" onClick={closeMenu} className="event-book text-[15px] font-medium border-b border-current pb-1 flex-shrink-0 hover:text-[#B36840] transition-colors">
                Reserve →
              </a>
            </div>

            {/* Event 2 */}
            <div className="event-row flex items-center justify-between gap-6 py-8 border-b border-[#E8DEC8]">
              <div className="event-info max-w-[580px]">
                <h3 className="font-serif text-[28px] sm:text-[32px] font-normal leading-tight text-[#1E1815]">Saturday Acoustic Sessions</h3>
                <p className="text-[#7A6F66] text-[15px] sm:text-[16px] leading-[1.6] mt-2">Soulful live acoustic performances, cold craft beers, and chef&apos;s curated small plates under the warm amber glow.</p>
              </div>
              <a href="#reservation" onClick={closeMenu} className="event-book text-[15px] font-medium border-b border-current pb-1 flex-shrink-0 hover:text-[#B36840] transition-colors">
                Reserve →
              </a>
            </div>

            {/* Event 3 */}
            <div className="event-row flex items-center justify-between gap-6 py-8 border-b border-[#E8DEC8]">
              <div className="event-info max-w-[580px]">
                <h3 className="font-serif text-[28px] sm:text-[32px] font-normal leading-tight text-[#1E1815]">Sunday Sundowners &amp; Brunch</h3>
                <p className="text-[#7A6F66] text-[15px] sm:text-[16px] leading-[1.6] mt-2">Slow down your weekend with chilled sangrias, coastal comfort food, and breezy Baner terrace evenings.</p>
              </div>
              <a href="#reservation" onClick={closeMenu} className="event-book text-[15px] font-medium border-b border-current pb-1 flex-shrink-0 hover:text-[#B36840] transition-colors">
                Reserve →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          REVIEWS & GALLERY
      ========================================================= */}
      <section id="gallery" className="py-[120px] max-lg:py-20 bg-[#F8F6EE]">
        <div className="container max-w-[1180px] w-[92%] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 mb-16 md:mb-20">
            <div>
              <span className="eyebrow text-[#B36840] text-[13px] font-bold tracking-[2px] uppercase block">
                THE OUZA FEELING · BANER, PUNE
              </span>
              <h2 className="section-title font-serif font-normal text-[clamp(46px,5vw,76px)] leading-[0.98] tracking-[-2px] mt-3">
                Made for<br />
                <em className="text-[#B36840] not-italic">good times.</em>
              </h2>
            </div>
            <div className="sm:text-right">
              <div className="rating text-[#B36840] text-[17px] tracking-[3px] mb-2 sm:justify-end flex items-center gap-2">
                <span>★★★★★</span>
                <span className="font-serif text-[18px] text-[#1E1815] tracking-normal font-medium">
                  4.5 / 5
                </span>
              </div>
              <p className="text-[#7A6F66] text-[15px] max-w-[330px]">
                Bring your people. We&apos;ll take care of the rest.
              </p>
            </div>
          </div>

          {/* Testimonial Review Cards */}
          <div className="review-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 md:mb-20">
            <article className="review-card bg-[#FFFFFF] border border-[#E8DEC8] p-10 min-h-[300px] flex flex-col shadow-sm">
              <div className="review-stars text-[#B36840] text-[13px] tracking-[3px]">★★★★★</div>
              <blockquote className="font-serif text-[24px] leading-[1.5] my-7 text-[#1E1815]">
                &ldquo;The vibe at Ouza Baner is electric yet warm. The Chimichurri Fish Tikka and Guava craft beer are out of this world! Perfect place for date night or hanging out with friends.&rdquo;
              </blockquote>
              <div className="review-author mt-auto text-[12px] font-bold tracking-[1px] text-[#7A6F66]">
                — AAKASH M. · GOOGLE REVIEW
              </div>
            </article>

            <article className="review-card bg-[#FFFFFF] border border-[#E8DEC8] p-10 min-h-[300px] flex flex-col shadow-sm">
              <div className="review-stars text-[#B36840] text-[13px] tracking-[3px]">★★★★★</div>
              <blockquote className="font-serif text-[24px] leading-[1.5] my-7 text-[#1E1815]">
                &ldquo;Outstanding cocktails and aesthetic interiors with stunning terracotta tones. The staff is warm and attentive. Our new favourite spot in Baner!&rdquo;
              </blockquote>
              <div className="review-author mt-auto text-[12px] font-bold tracking-[1px] text-[#7A6F66]">
                — PRIYA S. · ZOMATO DINER
              </div>
            </article>

            <article className="review-card bg-[#FFFFFF] border border-[#E8DEC8] p-10 min-h-[300px] flex flex-col shadow-sm">
              <div className="review-stars text-[#B36840] text-[13px] tracking-[3px]">★★★★★</div>
              <blockquote className="font-serif text-[24px] leading-[1.5] my-7 text-[#1E1815]">
                &ldquo;From the Labneh with pita to the Butter Chicken and chocolate dessert, every single dish delivered on flavour. The music and open ambience make it unforgettable.&rdquo;
              </blockquote>
              <div className="review-author mt-auto text-[12px] font-bold tracking-[1px] text-[#7A6F66]">
                — ROHAN K. · DISTRICT GUEST
              </div>
            </article>
          </div>
        </div>

        {/* Gap between Testimonial Cards and Image Gallery */}
        <div className="w-full h-16 sm:h-20 block" aria-hidden="true" />

        {/* Image Gallery - Continuous Auto-Scrolling Carousel */}
        <div className="gallery-marquee-container w-full overflow-hidden relative">
          <div className="animate-marquee-infinite flex gap-3 sm:gap-4 md:gap-5">
            {[...galleryImages, ...galleryImages].map((imgSrc, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[240px] sm:w-[285px] md:w-[330px] aspect-[3/4] overflow-hidden group shadow-sm bg-[#F8F6EE]"
                style={{ aspectRatio: '3 / 4' }}
              >
                <img
                  src={imgSrc}
                  alt={`Ouza moment ${(index % galleryImages.length) + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          LOCATION & GOOGLE MAPS
      ========================================================= */}
      <section id="location" className="location py-[120px] max-lg:py-20 bg-[#F8F6EE]">
        <div className="container max-w-[1180px] w-[92%] mx-auto location-grid grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] min-h-[500px] bg-[#B36840] text-white shadow-lg overflow-hidden rounded-2xl">
          <div className="location-image relative min-h-[350px] lg:min-h-[500px] p-0 overflow-hidden">
            <iframe
              title="Google Map location for Ouza Cocktail Bar & Kitchen, Baner, Pune"
              width="100%"
              height="100%"
              style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=Ouza+Cocktail+Bar+%26+Kitchen,+Murkute+Complex,+Baner+DP+Road,+Baner,+Pune,+Maharashtra+411069&t=&z=16&ie=UTF8&iwloc=&output=embed"
            ></iframe>
          </div>

          <div className="location-content p-10 lg:p-[65px] flex flex-col justify-center">
            <span className="eyebrow text-[#F8F6EE] text-[13px] font-bold tracking-[2px] uppercase block">
              COME FIND US
            </span>
            <h2 className="section-title font-serif font-normal text-[clamp(46px,5vw,76px)] leading-[0.98] tracking-[-2px] mt-3 text-[#F8F6EE]">
              Your table<br />
              <em className="text-[#F8F6EE] not-italic">is waiting.</em>
            </h2>
            <div className="text-[#F8F6EE]/90 text-[16px] leading-[1.9] mt-6">
              <strong className="block text-white text-[18px] mb-1">Ouza Cocktail Bar &amp; Kitchen</strong>
              <p>
                45, Murkute Complex, Baner DP Road<br />
                Near Vijay Sales, Pallod Farms, Baner<br />
                Pune, Maharashtra 411069
              </p>
              <div className="mt-4 pt-3 border-t border-white/20 space-y-1.5">
                <p>
                  <span className="text-white/70">Phone: </span>
                  <a href="tel:+919146193535" className="hover:underline font-semibold text-white">+91 91461 93535</a>
                </p>
               
                <p>
                  <span className="text-white/70">Instagram: </span>
                  <a href="https://www.instagram.com/ouza_pune?cnvx=MWtoMjlzc3FnOWFqMA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:underline font-medium text-white">@ouza_pune ↗</a>
                </p>
                <p>
                  <span className="text-white/70">Email: </span>
                  <a href="mailto:contact@ouzapune.com" className="hover:underline font-medium text-white">contact@ouzapune.com</a>
                </p>
                <p className="pt-1">
                  <span className="text-white/70">Hours: </span>Open daily · 12:00 PM — 12:00 AM
                </p>
              </div>
            </div>

            <div className="location-buttons flex flex-wrap gap-4 mt-8">
              <a
                href="https://maps.app.goo.gl/Qco2t8pqFt7poG3QA?g_st=ic"
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: '#F8F6EE', color: '#B36840' }}
                className="hover:bg-[#1E1815] hover:!text-white px-5 py-3 rounded-full text-[13px] font-semibold transition-colors shadow-sm"
              >
                Get directions →
              </a>
              <a
                href="#reservation"
                onClick={closeMenu}
                style={{ backgroundColor: '#F8F6EE', color: '#B36840' }}
                className="hover:bg-[#1E1815] hover:!text-white px-5 py-3 rounded-full text-[13px] font-semibold transition-colors shadow-sm"
              >
                Book a table →
              </a>
              <a
                href="https://wa.me/919146193535?text=Hello%20Ouza,%20I%20would%20like%20to%20reserve%20a%20table"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-3 rounded-full text-[13px] font-semibold transition-colors shadow-sm flex items-center gap-1.5"
              >
                <span>WhatsApp Us →</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="footer bg-[#F8F6EE] text-[#1E1815] pt-10 sm:pt-12 pb-8 sm:pb-10 border-t border-[#E8DEC8]">
        <div className="container max-w-[1240px] w-[92%] mx-auto">
          {/* Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1.1fr_1.4fr_auto] gap-x-12 gap-y-6 items-start">
            <div>
              <a
                href="#home"
                onClick={closeMenu}
                className="inline-block"
              >
                <img
                  src="/logocolour.svg"
                  alt="Ouza Cocktail Bar & Kitchen"
                  className="w-[140px] max-sm:w-[120px] h-auto block object-contain"
                />
              </a>
              <p className="text-[12px] text-[#7A6F66] mt-3 max-w-[260px] leading-relaxed">
                औजा कॉकटेल बार • किचन · Coastal &amp; Mediterranean inspired dining, craft beers &amp; artisanal mixology in Baner, Pune.
              </p>
            </div>

            <div>
              <span className="block text-[11px] font-semibold tracking-[1.5px] uppercase text-[#7A6F66] mb-1.5">
                CONTACT US
              </span>
              <div className="text-[17px] sm:text-[19px] font-semibold text-[#1E1815] tracking-tight flex flex-wrap items-center gap-x-2">
                <a
                  href="tel:+919146193535"
                  className="hover:text-[#B36840] transition-colors whitespace-nowrap"
                >
                  +91 91461 93535
                </a>
              </div>
              <div className="mt-2 text-[14px] flex flex-col gap-1.5">
                
                <a
                  href="https://www.instagram.com/ouza_pune?cnvx=MWtoMjlzc3FnOWFqMA%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7A6F66] hover:text-[#B36840] transition-colors font-medium flex items-center gap-1.5"
                >
                  <span>Instagram: @ouza_pune</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            <div>
              <span className="block text-[11px] font-semibold tracking-[1.5px] uppercase text-[#7A6F66] mb-1.5">
                ADDRESS
              </span>
              <a
                href="https://maps.app.goo.gl/Qco2t8pqFt7poG3QA?g_st=ic"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] sm:text-[15px] font-medium text-[#1E1815] leading-[1.4] hover:text-[#B36840] transition-colors block max-w-[340px]"
              >
                45, Murkute Complex, Baner DP Road, Near Vijay Sales, Pallod Farms, Baner, Pune, Maharashtra 411069
              </a>
            </div>

            <div className="hidden lg:block w-[140px]" />
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1.1fr_1.4fr_auto] gap-x-12 gap-y-6 items-end mt-8 sm:mt-10 pt-6 border-t border-[#E8DEC8]">
            <nav className="flex items-center flex-wrap gap-3 sm:gap-4 text-[13px] sm:text-[14px] font-medium text-[#1E1815]">
              <a href="#home" onClick={closeMenu} className="hover:text-[#B36840] transition-colors">
                Home
              </a>
              <span className="text-[#D6CABE] select-none">/</span>
              <a href="#reservation" onClick={closeMenu} className="hover:text-[#B36840] transition-colors">
                Book a Table
              </a>
              <span className="text-[#D6CABE] select-none">/</span>
              <a href="#menu" onClick={closeMenu} className="hover:text-[#B36840] transition-colors">
                Menu
              </a>
              <span className="text-[#D6CABE] select-none">/</span>
              <a href="https://maps.app.goo.gl/Qco2t8pqFt7poG3QA?g_st=ic" target="_blank" rel="noopener noreferrer" className="hover:text-[#B36840] transition-colors">
                Directions ↗
              </a>
            </nav>

            <div>
              <span className="block text-[11px] font-semibold tracking-[1.5px] uppercase text-[#7A6F66] mb-1">
                EMAIL
              </span>
              <a
                href="mailto:contact@ouzapune.com"
                className="text-[14px] sm:text-[15px] font-medium text-[#1E1815] hover:text-[#B36840] transition-colors"
              >
                contact@ouzapune.com
              </a>
            </div>

            <div>
              <span className="block text-[11px] font-semibold tracking-[1.5px] uppercase text-[#7A6F66] mb-1">
                OPENING HOURS
              </span>
              <p className="text-[14px] sm:text-[16px] font-medium text-[#1E1815]">
                12:00 PM — 12:00 AM (Daily)
              </p>
            </div>

            <div className="lg:text-right pt-2 lg:pt-0">
              <span className="text-[12px] text-[#7A6F66] whitespace-nowrap">
                &copy; 2026 Ouza Cocktail Bar &amp; Kitchen &bull; All Rights Reserved
              </span>
            </div>
          </div>
        </div> 
      </footer>

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/919146193535?text=Hello%20Ouza,%20I%20would%20like%20to%20reserve%20a%20table"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Ouza on WhatsApp"
        className="fixed bottom-6 right-6 z-[99] bg-[#25D366] hover:bg-[#20ba59] text-white p-3 sm:px-5 sm:py-3.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 group"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086.159.058 1.011.477 1.184.564.173.087.289.13.332.203.043.072.043.419-.101.824z" />
        </svg>
        <span className="hidden sm:inline font-sans text-[13px] font-semibold tracking-wide">
          WhatsApp Us
        </span>
      </a>
    </main>
  );
}
