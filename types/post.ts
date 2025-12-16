export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  featured_image?: string;
  tags: string[];
  content: string;
  readingTime: string;
}

export interface PostFrontMatter {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  featured_image?: string;
  tags: string[];
}
