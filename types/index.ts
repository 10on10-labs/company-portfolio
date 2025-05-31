import type { PortableTextBlock } from 'next-sanity';
import type { Image } from 'sanity';

export interface MilestoneItem {
  _key: string;
  description?: string;
  duration?: {
    start?: string;
    end?: string;
  };
  image?: Image;
  tags?: string[];
  title?: string;
}

export interface ShowcaseProject {
  _id: string;
  _type: string;
  coverImage?: Image;
  overview?: PortableTextBlock[];
  slug?: string;
  tags?: string[];
  title?: string;
}

export interface ProjectSection {
  id?: string;
  name?: string;
  description?: string;
  images?: Array<Image & { alt?: string; _key: string }>;
  _key: string;
}

export interface ProjectDetail {
  _id: string;
  slug?: string | null;
  name?: string | null;
  category?: string | null;
  description?: string | null;
  logo?: Image | null;
  coverImages?: Array<Image & { alt?: string; _key: string }> | null;
  projectSections?: ProjectSection[] | null;
}
