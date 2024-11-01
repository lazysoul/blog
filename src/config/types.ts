

export interface PostMatter {
  title: string;
  excerpt : string;
  date: Date;
  dateString: string;
  thumbnail: string;
  desc: string;
}

export interface Post extends PostMatter {
  url: string;
  slug: string;
  categoryPath: string;
  content: string;
  categoryPublicName: string;
}

export interface CategoryDetail {
  dirName: string;
  publicName: string;
  count: number;
}

export interface HeadingItem {
  text: string;
  link: string;
  indent: number;
}

export interface ProjectMatter {
  title: string;
  desc: string;
  startMonth: string;
  endMonth: string;
  tags: string;
  gitRepoUrl?: string;
  link?: string;
}

export interface Project extends ProjectMatter {
  slug: string;
  startMonthString: string;
  endMonthString?: string;
  content: string;
}

