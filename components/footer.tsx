'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Twitter,
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigation = {
    company: [
      { name: 'About', href: '/about' },
      { name: 'Process', href: '/process' },
      { name: 'Projects', href: '/projects' },
      { name: 'Reviews', href: '/reviews' },
    ],
    services: [
      { name: 'Web Development', href: '/services' },
      { name: 'Mobile Apps', href: '/services' },
      { name: 'UI/UX Design', href: '/services' },
      { name: 'Digital Marketing', href: '/services' },
    ],
    resources: [
      { name: 'Blog', href: '/blogs' },
      { name: 'Contact', href: '/contact-us' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'GitHub', href: '#', icon: Github },
  ];

  return (
    <footer className="bg-gray-900 text-white relative z-10">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-3">
              Stay Updated with Our Latest Insights
            </h3>
            <p className="text-gray-400 mb-6 text-sm md:text-base">
              Subscribe to our newsletter for technology trends and case studies.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm relative z-20"
                required
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-2 font-medium text-sm relative z-20"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <h2 className="text-xl font-bold">10on10 Labs</h2>
            </Link>
            <p className="text-gray-400 mb-4 text-sm">
              Transforming ideas into exceptional digital experiences.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-4 text-sm">
              <a
                href="mailto:info@10on10labs.com"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@10on10labs.com
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                +1 (234) 567-890
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map(social => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors duration-300"
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2 text-sm">
              {navigation.company.map(item => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider">Services</h3>
            <ul className="space-y-2 text-sm">
              {navigation.services.map(item => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2 text-sm">
              {navigation.resources.map(item => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <p className="text-gray-400 text-xs text-center">
            © {currentYear} 10on10 Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
