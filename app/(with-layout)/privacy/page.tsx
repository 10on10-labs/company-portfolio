import { Metadata } from 'next';
import {
  Bell,
  Database,
  Eye,
  Globe,
  Lock,
  Mail,
  MapPin,
  Phone,
  Shield,
  UserCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | 10on10Labs',
  description: 'Learn how 10on10Labs collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  const sections = [
    { id: 'introduction', title: 'Introduction', icon: Shield },
    { id: 'information-we-collect', title: 'Information We Collect', icon: Database },
    { id: 'how-we-use', title: 'How We Use Your Information', icon: Eye },
    { id: 'information-sharing', title: 'Information Sharing', icon: Globe },
    { id: 'data-security', title: 'Data Security', icon: Lock },
    { id: 'your-rights', title: 'Your Rights', icon: UserCheck },
    { id: 'contact', title: 'Contact Us', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="relative bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Your privacy is important to us. Learn how we protect your data.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm text-gray-600">
              <Bell className="w-4 h-4" />
              Last updated:{' '}
              {new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Navigation</h3>
                <nav className="space-y-2">
                  {sections.map(section => {
                    const Icon = section.icon;
                    return (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{section.title}</span>
                      </a>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3 space-y-8">
              {/* Introduction */}
              <section
                id="introduction"
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                    <Shield className="w-6 h-6 text-primary" />
                    Introduction
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    10on10Labs {`("we," "our," or "us")`} is committed to protecting your privacy.
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your
                    information when you visit our website or use our services.
                  </p>
                </div>
              </section>

              {/* Information We Collect */}
              <section
                id="information-we-collect"
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Database className="w-6 h-6 text-primary" />
                    Information We Collect
                  </h2>

                  <div className="space-y-6">
                    <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Personal Information
                      </h3>
                      <p className="text-gray-600 mb-4">Information you provide directly to us:</p>
                      <ul className="space-y-2">
                        {[
                          'Name and contact information (email, phone)',
                          'Company name and job title',
                          'Project requirements and specifications',
                          'Payment and billing information',
                          'Communications you send to us',
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-600">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Automatically Collected Information
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Information collected when you visit our website:
                      </p>
                      <ul className="space-y-2">
                        {[
                          'IP address and browser type',
                          'Device information and operating system',
                          'Pages visited and time spent',
                          'Referring website addresses',
                          'Cookie and tracking technology data',
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-600">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* How We Use Your Information */}
              <section
                id="how-we-use"
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Eye className="w-6 h-6 text-primary" />
                    How We Use Your Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      'Providing and improving our services',
                      'Processing transactions',
                      'Responding to inquiries',
                      'Sending updates and notices',
                      'Marketing communications',
                      'Analytics and trends',
                      'Security and fraud prevention',
                      'Legal compliance',
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/10"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Information Sharing */}
              <section
                id="information-sharing"
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Globe className="w-6 h-6 text-primary" />
                    Information Sharing and Disclosure
                  </h2>

                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-6">
                    <p className="text-gray-900 font-medium mb-2">Our Promise</p>
                    <p className="text-gray-700">
                      We do not sell, trade, or rent your personal information to third parties.
                    </p>
                  </div>

                  <p className="text-gray-600 mb-4">
                    We may share information only in these situations:
                  </p>

                  <div className="space-y-3">
                    {[
                      {
                        title: 'Service Providers',
                        desc: 'With trusted vendors who assist our operations',
                      },
                      {
                        title: 'Business Transfers',
                        desc: 'During mergers, sales, or acquisitions',
                      },
                      {
                        title: 'Legal Requirements',
                        desc: 'When required by law or to protect rights',
                      },
                      { title: 'With Consent', desc: 'When you explicitly agree to sharing' },
                    ].map((item, index) => (
                      <div key={index} className="border-l-4 border-primary pl-4 py-2">
                        <p className="font-semibold text-gray-900">{item.title}</p>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Data Security */}
              <section
                id="data-security"
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Lock className="w-6 h-6 text-primary" />
                    Data Security
                  </h2>

                  <div className="bg-primary/5 rounded-xl p-6 mb-6 border border-primary/10">
                    <div className="flex items-start gap-3">
                      <Lock className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-2">Security Measures</p>
                        <p className="text-gray-600">
                          We implement industry-standard security measures including encryption,
                          secure servers, and regular security audits to protect your personal
                          information.
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600">
                    While we strive to protect your information, no method of transmission over the
                    Internet or electronic storage is 100% secure. We cannot guarantee absolute
                    security but we continuously work to improve our security practices.
                  </p>
                </div>
              </section>

              {/* Your Rights */}
              <section
                id="your-rights"
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <UserCheck className="w-6 h-6 text-primary" />
                    Your Rights and Choices
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { title: 'Access', desc: 'Request your data' },
                      { title: 'Correction', desc: 'Fix inaccurate info' },
                      { title: 'Deletion', desc: 'Remove your data' },
                      { title: 'Opt-out', desc: 'Stop marketing emails' },
                      { title: 'Portability', desc: 'Export your data' },
                      { title: 'Restriction', desc: 'Limit processing' },
                    ].map((right, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                        <p className="font-semibold text-gray-900">{right.title}</p>
                        <p className="text-gray-600 text-sm">{right.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Additional Sections */}
              <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Cookies and Tracking</h3>
                  <p className="text-gray-600">
                    We use cookies to enhance your experience. You can control cookies through your
                    browser settings.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Children&apos;s Privacy</h3>
                  <p className="text-gray-600">
                    Our services are not directed to individuals under 18. We do not knowingly
                    collect information from children.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Policy Updates</h3>
                  <p className="text-gray-600">
                    We may update this policy periodically. Changes will be posted on this page with
                    an updated revision date.
                  </p>
                </div>
              </section>

              {/* Contact Section */}
              <section
                id="contact"
                className="bg-primary/5 rounded-2xl p-8 border border-primary/10"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Mail className="w-6 h-6 text-primary" />
                    Contact Us
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Have questions about our Privacy Policy? We&apos;re here to help.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4">
                    <a
                      href="mailto:sales@10on10labs.com"
                      className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                    >
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm font-medium text-gray-900">sales@10on10labs.com</p>
                      </div>
                    </a>

                    <a
                      href="tel:+923345600371"
                      className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                    >
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="text-sm font-medium text-gray-900">+92 334 5600371</p>
                      </div>
                    </a>

                    <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-gray-500">Address</p>
                        <p className="text-sm font-medium text-gray-900">Islamabad, Pakistan</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
