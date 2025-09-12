// Translation mappings for common project section names
export const projectSectionTranslations: Record<string, Record<string, string>> = {
  en: {
    // English names (as they appear in Sanity)
    Overview: 'Overview',
    Features: 'Features',
    Implementation: 'Implementation',
    Design: 'Design',
    Development: 'Development',
    Testing: 'Testing',
    Deployment: 'Deployment',
    Architecture: 'Architecture',
    'User Interface': 'User Interface',
    'User Experience': 'User Experience',
    Dashboard: 'Dashboard',
    'Admin Panel': 'Admin Panel',
    'Mobile App': 'Mobile App',
    'Web Application': 'Web Application',
    'API Integration': 'API Integration',
    Database: 'Database',
    Security: 'Security',
    Performance: 'Performance',
    Analytics: 'Analytics',
    Reporting: 'Reporting',
    Authentication: 'Authentication',
    Authorization: 'Authorization',
    'Payment Integration': 'Payment Integration',
    Notifications: 'Notifications',
    Search: 'Search',
    'Content Management': 'Content Management',
    'User Management': 'User Management',
    Settings: 'Settings',
    Profile: 'Profile',
    Chat: 'Chat',
    Messaging: 'Messaging',
    'Social Features': 'Social Features',
    'E-commerce': 'E-commerce',
    'Shopping Cart': 'Shopping Cart',
    Checkout: 'Checkout',
    'Order Management': 'Order Management',
    Inventory: 'Inventory',
    'Customer Support': 'Customer Support',
    'Help Center': 'Help Center',
    Documentation: 'Documentation',
    Blog: 'Blog',
    News: 'News',
    Events: 'Events',
    Gallery: 'Gallery',
    Portfolio: 'Portfolio',
    Testimonials: 'Testimonials',
    Reviews: 'Reviews',
    Contact: 'Contact',
    About: 'About',
    Home: 'Home',
    'Landing Page': 'Landing Page',
    Booking: 'Booking',
    Scheduling: 'Scheduling',
    Calendar: 'Calendar',
    Maps: 'Maps',
    Location: 'Location',
    Integration: 'Integration',
    Customization: 'Customization',
    Configuration: 'Configuration',
    'Multi-language': 'Multi-language',
    Localization: 'Localization',
    'Responsive Design': 'Responsive Design',
    'Mobile Responsive': 'Mobile Responsive',
    'Cross-platform': 'Cross-platform',
    'Progressive Web App': 'Progressive Web App',
    'Offline Support': 'Offline Support',
    'Real-time': 'Real-time',
    'Live Updates': 'Live Updates',
    'Data Visualization': 'Data Visualization',
    Charts: 'Charts',
    Graphs: 'Graphs',
    Statistics: 'Statistics',
    Metrics: 'Metrics',
  },
  ar: {
    // Arabic translations
    Overview: 'نظرة عامة',
    Features: 'المميزات',
    Implementation: 'التنفيذ',
    Design: 'التصميم',
    Development: 'التطوير',
    Testing: 'الاختبار',
    Deployment: 'النشر',
    Architecture: 'البنية',
    'User Interface': 'واجهة المستخدم',
    'User Experience': 'تجربة المستخدم',
    Dashboard: 'لوحة التحكم',
    'Admin Panel': 'لوحة الإدارة',
    'Mobile App': 'تطبيق الهاتف',
    'Web Application': 'تطبيق الويب',
    'API Integration': 'تكامل واجهة برمجة التطبيقات',
    Database: 'قاعدة البيانات',
    Security: 'الأمان',
    Performance: 'الأداء',
    Analytics: 'التحليلات',
    Reporting: 'التقارير',
    Authentication: 'المصادقة',
    Authorization: 'التخويل',
    'Payment Integration': 'تكامل الدفع',
    Notifications: 'الإشعارات',
    Search: 'البحث',
    'Content Management': 'إدارة المحتوى',
    'User Management': 'إدارة المستخدمين',
    Settings: 'الإعدادات',
    Profile: 'الملف الشخصي',
    Chat: 'الدردشة',
    Messaging: 'المراسلة',
    'Social Features': 'الميزات الاجتماعية',
    'E-commerce': 'التجارة الإلكترونية',
    'Shopping Cart': 'سلة التسوق',
    Checkout: 'الدفع',
    'Order Management': 'إدارة الطلبات',
    Inventory: 'المخزون',
    'Customer Support': 'دعم العملاء',
    'Help Center': 'مركز المساعدة',
    Documentation: 'التوثيق',
    Blog: 'المدونة',
    News: 'الأخبار',
    Events: 'الأحداث',
    Gallery: 'المعرض',
    Portfolio: 'المعرض',
    Testimonials: 'الشهادات',
    Reviews: 'المراجعات',
    Contact: 'التواصل',
    About: 'حول',
    Home: 'الرئيسية',
    'Landing Page': 'الصفحة الرئيسية',
    Booking: 'الحجز',
    Scheduling: 'الجدولة',
    Calendar: 'التقويم',
    Maps: 'الخرائط',
    Location: 'الموقع',
    Integration: 'التكامل',
    Customization: 'التخصيص',
    Configuration: 'التكوين',
    'Multi-language': 'متعدد اللغات',
    Localization: 'التوطين',
    'Responsive Design': 'التصميم المتجاوب',
    'Mobile Responsive': 'متجاوب للهاتف',
    'Cross-platform': 'متعدد المنصات',
    'Progressive Web App': 'تطبيق ويب تدريجي',
    'Offline Support': 'دعم العمل بدون اتصال',
    'Real-time': 'الوقت الفعلي',
    'Live Updates': 'التحديثات المباشرة',
    'Data Visualization': 'تصور البيانات',
    Charts: 'الرسوم البيانية',
    Graphs: 'الرسوم البيانية',
    Statistics: 'الإحصائيات',
    Metrics: 'المقاييس',
  },
};

/**
 * Translates a project section name based on the current locale
 * @param sectionName - The section name to translate
 * @param locale - The current locale ('en' or 'ar')
 * @returns The translated section name, or the original if no translation is found
 */
export function translateProjectSectionName(sectionName: string, locale: string = 'en'): string {
  // If the section name is already in the target language, return it
  if (projectSectionTranslations[locale]?.[sectionName]) {
    return projectSectionTranslations[locale][sectionName];
  }

  // Try to find a partial match for compound names
  const translations = projectSectionTranslations[locale];
  if (translations) {
    for (const [englishTerm, translatedTerm] of Object.entries(translations)) {
      if (sectionName.toLowerCase().includes(englishTerm.toLowerCase())) {
        return sectionName.replace(new RegExp(englishTerm, 'gi'), translatedTerm);
      }
    }
  }

  // If no translation found, return the original name
  return sectionName;
}

/**
 * Hook to get translated project section name
 */
export function useTranslatedSectionName(sectionName: string, locale: string = 'en'): string {
  return translateProjectSectionName(sectionName, locale);
}
