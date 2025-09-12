'use client';

import { Link } from '@/src/i18n/navigation';
import { useTranslations } from 'next-intl';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/shadcn/breadcrumb';

export const BlogsBreadcrumbs: React.FC = () => {
  const t = useTranslations('blogs_page');

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">{t('breadcrumb.home')}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="rtl:rotate-180" />
        <BreadcrumbItem>
          <BreadcrumbPage>{t('breadcrumb.blogs')}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
