import { Metadata } from 'next';
import {
  AlertCircle,
  CheckCircle,
  CreditCard,
  FileText,
  Lock,
  Mail,
  MapPin,
  Phone,
  Scale,
  Shield,
  Users,
  XCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | 10on10Labs',
  description: 'Read the terms and conditions for using 10on10Labs services and website.',
};

export default function TermsOfServicePage() {
  const sections = [
    { id: 'acceptance', title: 'Acceptance', icon: CheckCircle },
    { id: 'services', title: 'Services', icon: Users },
    { id: 'payments', title: 'Payments', icon: CreditCard },
    { id: 'intellectual-property', title: 'Intellectual Property', icon: Shield },
    { id: 'confidentiality', title: 'Confidentiality', icon: Lock },
    { id: 'liability', title: 'Liability', icon: AlertCircle },
    { id: 'termination', title: 'Termination', icon: XCircle },
    { id: 'contact', title: 'Contact', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Please read these terms carefully before using our services.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm text-gray-600">
              <Scale className="w-4 h-4" />
              Effective:{' '}
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
              {/* Important Notice */}
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-orange-900 mb-1">Important Notice</p>
                    <p className="text-orange-800 text-sm">
                      By using our services, you agree to these terms. If you disagree with any
                      part, please discontinue use immediately.
                    </p>
                  </div>
                </div>
              </div>

              {/* Acceptance of Terms */}
              <section
                id="acceptance"
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      1. Acceptance of Terms
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      By accessing or using 10on10Labs services, you acknowledge that you have read,
                      understood, and agree to be bound by these Terms of Service. These terms
                      constitute a legally binding agreement between you and 10on10Labs.
                    </p>
                  </div>
                </div>
              </section>

              {/* Services */}
              <section
                id="services"
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      2. Services & Client Responsibilities
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Our Services Include:</h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {[
                            'UI/UX Design',
                            'Web Development',
                            'Mobile Apps',
                            'Custom Software',
                            'Consulting',
                            'Maintenance',
                          ].map((service, index) => (
                            <div key={index} className="flex items-center gap-2 text-gray-600">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              <span>{service}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="font-semibold text-gray-900 mb-3">Your Responsibilities:</h3>
                        <ul className="space-y-3">
                          {[
                            'Provide accurate and timely information',
                            'Review deliverables within agreed timeframes',
                            'Make payments according to schedule',
                            'Obtain necessary permissions for content',
                            'Designate authorized representatives',
                          ].map((item, index) => (
                            <li key={index} className="flex items-start gap-3 text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Project Execution */}
              <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Project Execution</h2>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-3">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Scope of Work</h3>
                    <p className="text-gray-600 text-sm">
                      Defined in separate project agreements with clear deliverables
                    </p>
                  </div>

                  <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-3">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Development Process</h3>
                    <p className="text-gray-600 text-sm">
                      Agile methodology with iterative development and regular feedback
                    </p>
                  </div>

                  <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Revisions</h3>
                    <p className="text-gray-600 text-sm">
                      Number of revisions specified in agreement, extras may incur charges
                    </p>
                  </div>
                </div>
              </section>

              {/* Payment Terms */}
              <section
                id="payments"
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Payment Terms</h2>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-primary">$</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Fees & Currency</p>
                          <p className="text-gray-600 text-sm">
                            All fees in USD unless specified. Taxes not included.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm">📅</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Payment Schedule</p>
                          <p className="text-gray-600 text-sm">
                            As outlined in project agreement. Late payments incur 1.5% monthly
                            interest.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm">↩️</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Refund Policy</p>
                          <p className="text-gray-600 text-sm">
                            Case-by-case basis. Completed work is non-refundable.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Intellectual Property */}
              <section
                id="intellectual-property"
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      5. Intellectual Property Rights
                    </h2>

                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
                      <p className="font-semibold text-gray-900 mb-2">Ownership Transfer</p>
                      <p className="text-gray-700 text-sm">
                        Upon full payment, all IP rights for custom work transfer to you, except
                        pre-existing materials and third-party components.
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <p className="font-semibold text-gray-900 mb-1">Portfolio Rights</p>
                        <p className="text-gray-600 text-sm">
                          We may showcase non-confidential work
                        </p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <p className="font-semibold text-gray-900 mb-1">Third-Party Licenses</p>
                        <p className="text-gray-600 text-sm">
                          You must comply with all component licenses
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Confidentiality */}
              <section
                id="confidentiality"
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Confidentiality</h2>

                    <div className="bg-gray-50 border-l-4 border-primary rounded-r-lg p-6">
                      <p className="text-gray-700">
                        Both parties agree to maintain strict confidentiality of all proprietary
                        information disclosed during the project. This obligation survives contract
                        termination.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Warranties & Liability */}
              <section
                id="liability"
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      7. Warranties & Limitation of Liability
                    </h2>

                    <div className="space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                        <p className="font-semibold text-green-900 mb-2">Our Warranty</p>
                        <p className="text-green-800 text-sm">
                          Services performed professionally according to industry standards
                        </p>
                      </div>

                      <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                        <p className="font-semibold text-red-900 mb-2">Limitation of Liability</p>
                        <p className="text-red-800 text-sm">
                          Total liability limited to fees paid for the specific service. No
                          liability for indirect or consequential damages.
                        </p>
                      </div>

                      <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                        <p className="font-semibold text-orange-900 mb-2">Service Disclaimer</p>
                        <p className="text-orange-800 text-sm uppercase">
                          Services provided {`"AS IS"`} without warranties of merchantability or
                          fitness for particular purpose.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Termination */}
              <section
                id="termination"
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <XCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Termination</h2>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-xl p-5">
                        <h3 className="font-semibold text-gray-900 mb-2">Standard Termination</h3>
                        <p className="text-gray-600 text-sm mb-3">
                          30 days written notice required
                        </p>
                        <p className="text-gray-500 text-xs">Payment for completed work required</p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-5">
                        <h3 className="font-semibold text-gray-900 mb-2">Termination for Cause</h3>
                        <p className="text-gray-600 text-sm mb-3">Immediate upon material breach</p>
                        <p className="text-gray-500 text-xs">10 days to cure after notice</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* General Provisions */}
              <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">9. General Provisions</h2>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <p className="text-gray-700">
                      <span className="font-semibold">Governing Law:</span> Laws of Pakistan
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <p className="text-gray-700">
                      <span className="font-semibold">Dispute Resolution:</span> Arbitration in
                      Islamabad
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <p className="text-gray-700">
                      <span className="font-semibold">Force Majeure:</span> No liability for acts
                      beyond control
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <p className="text-gray-700">
                      <span className="font-semibold">Amendments:</span> We may update terms anytime
                    </p>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section
                id="contact"
                className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
                    <p className="text-gray-600 mb-6">
                      Questions about these Terms of Service? Get in touch with our team.
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
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
