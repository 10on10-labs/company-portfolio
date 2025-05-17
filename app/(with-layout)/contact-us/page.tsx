import { CalendlyEmbed } from './_components/calendly-embed';
import { ContactForm } from './_components/contact-form';
import { ContactHero } from './_components/contact-hero';
import { ContactInfo } from './_components/contact-info';

export default function ContactPage() {
  return (
    <div className="min-h-screen w-full">
      <ContactHero />
      <ContactInfo />
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ContactForm />
        <CalendlyEmbed />
      </div>
    </div>
  );
}
