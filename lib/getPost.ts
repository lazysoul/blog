import type { Post } from "../interfaces";
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { parseISO, format } from 'date-fns'

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs
    .readdirSync(postsDirectory)
    .filter(filename => filename.endsWith('.md'));
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  
  // 파일이 존재하고 .md 확장자인지 확인
  if (!fs.existsSync(fullPath) || !fullPath.endsWith('.md')) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // date 필드가 없으면 현재 날짜를 사용
  if (!data.date) {
    data.date = new Date().toISOString();
  }

  const items: Record<string, string> = {};

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }
    if (field === "date") {
      // Date 객체를 ISO 문자열로 변환
      items[field] = data[field].toISOString();
    }
    if (field === "tags" && data[field]) {
      // 태그가 문자열이면 쉼표로 분리하여 배열로 변환, 이미 배열이면 그대로 사용
      items[field] = typeof data[field] === 'string' ? data[field].split(',').map(tag => tag.trim()) : data[field];
    }
    if (typeof data[field] !== "undefined" && field !== "date") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .filter((post): post is Post => post !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
