'use client';

import { useState } from 'react';
import Animate from '../components/website/Animate';
import InnerPageHeroBanner from '../components/website/InnerPageHeroBanner';
import SiteFooter from '../components/website/SiteFooter';
import { FaArrowRight, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const SERVICE_TYPES = [
  'Web Design',
  'Web Development',
  'SEO & Digital Marketing',
  'Healthcare / EHR Solutions',
  'Product Consultation',
  'Other',
];

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    phone: '',
    email: '',
    message: '',
    serviceType: '',
  });
  const [captchaAccepted, setCaptchaAccepted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaAccepted) return;
    // Placeholder for form submission — wire to API / Google reCAPTCHA as needed
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      label: 'Address',
      value: '2715 Ash Dr. San Jose, South Dakota 83475',
      href: null,
    },
    {
      icon: FaEnvelope,
      label: 'Email Address',
      value: 'amiedhiman@gmail.com',
      href: 'mailto:amiedhiman@gmail.com',
    },
  ];

  return (
    <main className="min-h-screen bg-[#F6FCFF] pt-[calc(22px+3.5rem)] text-[#0a0a0a] sm:pt-[calc(24px+3.75rem)]">
      <InnerPageHeroBanner title="Contact Us" breadcrumbCurrent="Contact Us" />

      {/* Contact — headline + form (left) | divider | details (right) */}
      <section className="relative overflow-hidden bg-[#f4f5f9] py-16 sm:py-20 lg:py-24">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <Animate variant="down">
              <p className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0052d4] sm:text-xs">
                <span
                  className="inline-block h-0 w-0 border-b-[7px] border-l-[5px] border-r-[5px] border-b-sky-600 border-l-transparent border-r-transparent"
                  aria-hidden
                />
                Contact Us
              </p>
            </Animate>
            <Animate variant="down" delay={0.08}>
              <h2 className="ref-section-title mt-3 text-[68px] leading-[1.1] max-[420px]:text-[2rem] max-[420px]:leading-[1.15]">
                <span className="block">Excited About The Project?</span>
                <span className="mt-1 block sm:mt-1.5">Please Get In Touch.</span>
              </h2>
            </Animate>
          </div>

          <div className="mt-12 grid gap-12 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch lg:gap-0">
            {/* Form card */}
            <Animate variant="up" delay={0.06} className="min-w-0 lg:pr-10 xl:pr-14">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_24px_70px_-28px_rgba(0,82,212,0.18)] sm:p-8 md:p-10">
                <h3 className="text-xl font-bold text-[#111827] sm:text-2xl">Contact Me</h3>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600"
                      >
                        First Name<span className="text-sky-500">*</span>
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="w-full rounded-lg border border-slate-200/90 bg-slate-100/90 px-4 py-3 text-sm text-[#111827] outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600"
                      >
                        Phone Number<span className="text-sky-500">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="w-full rounded-lg border border-slate-200/90 bg-slate-100/90 px-4 py-3 text-sm text-[#111827] outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600"
                    >
                      Email Address<span className="text-sky-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="w-full rounded-lg border border-slate-200/90 bg-slate-100/90 px-4 py-3 text-sm text-[#111827] outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600"
                    >
                      Message<span className="text-sky-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type Your Message"
                      className="w-full resize-y rounded-lg border border-slate-200/90 bg-slate-100/90 px-4 py-3 text-sm text-[#111827] outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="serviceType"
                      className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600"
                    >
                      Select Service Type<span className="text-sky-500">*</span>
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      required
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-lg border border-slate-200/90 bg-slate-100/90 px-4 py-3 text-sm text-[#111827] outline-none transition focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"
                    >
                      <option value="">Select service</option>
                      {SERVICE_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="rounded-lg border border-slate-300/80 bg-slate-50 px-4 py-3">
                    <label className="flex cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        checked={captchaAccepted}
                        onChange={(e) => setCaptchaAccepted(e.target.checked)}
                        className="h-4 w-4 shrink-0 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                      />
                      <span className="text-sm font-medium text-slate-700">I&apos;m not a robot</span>
                    </label>
                    <p className="mt-2 text-[11px] text-slate-500">
                      Verification step — replace with Google reCAPTCHA when site keys are configured.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={!captchaAccepted}
                    className="group sheen-hover inline-flex w-full items-center justify-center gap-3 rounded-full bg-marketing-purple-gradient px-8 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-[0_12px_32px_-8px_rgba(0,82,212,0.45)] transition enabled:hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
                  >
                    Send Message
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f4a23a] text-[#111827] transition group-hover:translate-x-0.5">
                      <FaArrowRight className="text-sm" aria-hidden />
                    </span>
                  </button>
                </form>
              </div>
            </Animate>

            {/* Vertical divider */}
            <div
              className="hidden w-1.5 shrink-0 justify-self-center self-stretch rounded-full bg-gradient-to-b from-[#0052d4] via-[#00c2ff] to-[#0052d4] lg:block"
              aria-hidden
            />

            {/* Contact details */}
            <Animate variant="left" delay={0.12} className="min-w-0 lg:pl-10 xl:pl-14">
              <div className="flex flex-col justify-center gap-10 lg:min-h-[320px] lg:py-4">
                {contactInfo.map((item, idx) => (
                  <div key={item.label} className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#e8f4ff] text-[#0052d4] shadow-sm ring-1 ring-sky-200/60">
                      <item.icon className="text-xl" />
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <p className="text-sm font-bold text-[#111827] sm:text-base">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="mt-1 block text-sm font-normal leading-relaxed text-slate-600 transition hover:text-[#0052d4] sm:text-base"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm font-normal leading-relaxed text-slate-600 sm:text-base">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}

                <a
                  href="mailto:amiedhiman@gmail.com"
                  className="inline-flex items-center gap-3 self-start rounded-full border border-sky-200 bg-white px-5 py-2.5 text-sm font-semibold text-sky-700 shadow-sm transition hover:bg-sky-50"
                >
                  <FaEnvelope className="text-xl text-[var(--brand-primary)]" />
                  Email Us
                </a>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
