import { CalendlyEmbed } from './components/calendly-embed';
import { ContactForm } from './components/contact-form';
import { ContactHero } from './components/contact-hero';

export default function ContactPage() {
  return (
    <div className="min-h-screen w-full">
      <ContactHero />
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ContactForm />
        <CalendlyEmbed />
      </div>
    </div>
  );
}
