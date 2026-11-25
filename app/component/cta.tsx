'use client';
import { useState } from 'react';

export default function CTA() {
  const [reservationSent, setReservationSent] = useState(false);

  function submitReservation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      'Hello Ouza, I would like to make a reservation.',
      `Name: ${data.get('name')}`,
      `Phone: ${data.get('phone')}`,
      data.get('email') ? `Email: ${data.get('email')}` : '',
      `Guests: ${data.get('guests')}`,
      `Date: ${data.get('date')}`,
      `Time: ${data.get('time')}`,
      data.get('notes') ? `Special Requests: ${data.get('notes')}` : ''
    ].filter(Boolean).join('\n');
    setReservationSent(true);
    window.open(`https://wa.me/919146193535?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <section id="reservation" className="py-20 lg:py-28 bg-[#FFFFFF] text-[#1E1815] text-left">
      <div className="container max-w-[1240px] w-[92%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start text-left">
        {/* Left Column: Heading & Subheading in place of image */}
        <div className="flex flex-col justify-start items-start text-left w-full">
          <span className="text-[#B36840] text-[13px] font-bold tracking-[2.5px] uppercase mb-3 text-left">
            Reservation
          </span>
          <h2 className="font-serif italic font-normal text-[40px] sm:text-[48px] lg:text-[56px] text-[#1E1815] tracking-tight leading-[1.1] text-left">
            Make a Reservation
          </h2>
          <p className="text-[#7A6F66] text-[16px] sm:text-[17px] leading-[1.7] mt-5 max-w-[480px] text-left">
            Reserve your table and enjoy an unforgettable dining experience at Ouza, thoughtfully prepared for every occasion in Baner, Pune.
          </p>

          <div className="mt-10 pt-8 border-t border-[#E8DEC8] flex flex-col items-start gap-3 text-[14px] text-[#7A6F66] text-left w-full">
            <p className="text-left">
              <span className="font-semibold text-[#1E1815]">Hours: </span>Open Daily 12:00 PM — 12:00 AM
            </p>
            <p className="text-left">
              <span className="font-semibold text-[#1E1815]">WhatsApp Reservations: </span>
              <a href="https://wa.me/919146193535" target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold text-[#25D366]">9146193535 ↗</a>
            </p>
            <p className="text-left">
              <span className="font-semibold text-[#1E1815]">Phone Line: </span>
              <a href="tel:+919146193535" className="hover:underline text-[#B36840]">+91 91461 93535</a>
            </p>
            <p className="text-left">
              <span className="font-semibold text-[#1E1815]">Instagram: </span>
              <a href="https://www.instagram.com/ouza_pune?cnvx=MWtoMjlzc3FnOWFqMA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:underline text-[#B36840]">@ouza_pune ↗</a>
            </p>
            <p className="text-left">
              <span className="font-semibold text-[#1E1815]">Email: </span>
              <a href="mailto:contact@ouzapune.com" className="hover:underline text-[#B36840]">contact@ouzapune.com</a>
            </p>
            <p className="text-left">
              <span className="font-semibold text-[#1E1815]">Location: </span>45, Murkute Complex, Baner DP Road, Near Vijay Sales, Pallod Farms, Baner, Pune, Maharashtra 411069
            </p>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="reservation-form-wrap">
          <form
            id="reservationForm"
            onSubmit={submitReservation}
            className="reservation-form space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
              {/* Guests */}
              <div>
                <label htmlFor="guestCount" className="block text-[13px] font-medium text-[#7A6F66] mb-2">
                  Guests
                </label>
                <div className="relative">
                  <select
                    id="guestCount"
                    name="guests"
                    defaultValue="1 Person"
                    className="w-full h-[38px] bg-[#F8F6EE] hover:bg-[#EFEADA] focus:bg-white border border-transparent focus:border-[#B36840] text-[#1E1815] text-[14px] px-4 pr-10 outline-none appearance-none cursor-pointer transition-all"
                  >
                    <option value="1 Person">1 Person</option>
                    <option value="2 People">2 People</option>
                    <option value="3 People">3 People</option>
                    <option value="4 People">4 People</option>
                    <option value="5 People">5 People</option>
                    <option value="6+ People">6+ People</option>
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#7A6F66] text-[11px]">
                    ▼
                  </span>
                </div>
              </div>

              {/* Date */}
              <div>
                <label htmlFor="guestDate" className="block text-[13px] font-medium text-[#7A6F66] mb-2">
                  Date
                </label>
                <input
                  id="guestDate"
                  name="date"
                  type="date"
                  required
                  placeholder="mm/dd/yyyy"
                  className="w-full h-[38px] bg-[#F8F6EE] hover:bg-[#EFEADA] focus:bg-white border border-transparent focus:border-[#B36840] text-[#1E1815] text-[14px] px-4 outline-none transition-all placeholder:text-[#A09A93]"
                />
              </div>

              {/* Time */}
              <div>
                <label htmlFor="guestTime" className="block text-[13px] font-medium text-[#7A6F66] mb-2">
                  Time
                </label>
                <div className="relative">
                  <select
                    id="guestTime"
                    name="time"
                    defaultValue="11.00 AM"
                    className="w-full h-[38px] bg-[#F8F6EE] hover:bg-[#EFEADA] focus:bg-white border border-transparent focus:border-[#B36840] text-[#1E1815] text-[14px] px-4 pr-10 outline-none appearance-none cursor-pointer transition-all"
                  >
                    <option value="11.00 AM">11.00 AM</option>
                    <option value="12.00 PM">12.00 PM</option>
                    <option value="01.00 PM">01.00 PM</option>
                    <option value="02.00 PM">02.00 PM</option>
                    <option value="03.00 PM">03.00 PM</option>
                    <option value="07.00 PM">07.00 PM</option>
                    <option value="08.00 PM">08.00 PM</option>
                    <option value="09.00 PM">09.00 PM</option>
                    <option value="10.00 PM">10.00 PM</option>
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#7A6F66] text-[11px]">
                    ▼
                  </span>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="guestName" className="block text-[13px] font-medium text-[#7A6F66] mb-2">
                  Full Name
                </label>
                <input
                  id="guestName"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter Your Name"
                  className="w-full h-[38px] bg-[#F8F6EE] hover:bg-[#EFEADA] focus:bg-white border border-transparent focus:border-[#B36840] text-[#1E1815] text-[14px] px-4 outline-none transition-all placeholder:text-[#A09A93]"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="guestEmail" className="block text-[13px] font-medium text-[#7A6F66] mb-2">
                  Email
                </label>
                <input
                  id="guestEmail"
                  name="email"
                  type="email"
                  placeholder="jane@framer.com"
                  className="w-full h-[38px] bg-[#F8F6EE] hover:bg-[#EFEADA] focus:bg-white border border-transparent focus:border-[#B36840] text-[#1E1815] text-[14px] px-4 outline-none transition-all placeholder:text-[#A09A93]"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="guestPhone" className="block text-[13px] font-medium text-[#7A6F66] mb-2">
                  Phone
                </label>
                <input
                  id="guestPhone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="Phone Number"
                  className="w-full h-[38px] bg-[#F8F6EE] hover:bg-[#EFEADA] focus:bg-white border border-transparent focus:border-[#B36840] text-[#1E1815] text-[14px] px-4 outline-none transition-all placeholder:text-[#A09A93]"
                />
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label htmlFor="specialRequest" className="block text-[13px] font-medium text-[#7A6F66] mb-2">
                Special Requests
              </label>
              <textarea
                id="specialRequest"
                name="notes"
                rows={4}
                placeholder="Let us know about dietary preferences, celebrations, allergies, or any special requests."
                className="w-full bg-[#F8F6EE] hover:bg-[#EFEADA] focus:bg-white border border-transparent focus:border-[#B36840] text-[#1E1815] text-[14px] p-3 outline-none resize-y transition-all placeholder:text-[#A09A93] leading-relaxed"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-[44px] bg-[#B36840] hover:bg-[#96522E] text-white px-6 text-[15px] font-medium tracking-wide transition-all duration-300 cursor-pointer shadow-sm hover:shadow flex items-center justify-center"
            >
              Submit
            </button>

            {reservationSent && (
              <p className="mt-3 text-left text-[13px] text-[#B36840] font-medium">
                Thank you! Your reservation request has been opened on WhatsApp.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
