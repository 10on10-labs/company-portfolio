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

type Props = {
  blogTitle?: string | null;
};

export const BlogBreadcrumbs: React.FC<Props> = ({ blogTitle }) => {
  const t = useTranslations('blog_detail');

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">{t('breadcrumb_home')}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="rtl:rotate-180" />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/blogs">{t('breadcrumb_blogs')}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="rtl:rotate-180" />
        <BreadcrumbItem>
          <BreadcrumbPage>{blogTitle}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
