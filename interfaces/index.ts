export type User = {
  name: string;
  picture: string;
  sub: string;
  email?: string;
};

export type Comment = {
  id: string;
  created_at: number;
  url: string;
  text: string;
  user: User;
};

export type Post = {
  slug: string; // slug를 필수 속성으로 변경
  title?: string;
  author?: string;
  date?: Date;
  content?: string;
  excerpt?: string;
  tags?: string[];
  [key: string]: any;
};
