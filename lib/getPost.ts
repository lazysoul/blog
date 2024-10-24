import type { Post } from "../interfaces";
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { parseISO, parse, format } from 'date-fns';

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

  const items: Record<string, any> = {};

  // Ensure the fields are in an array
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }
    if (field === "date") {
      // 다양한 날짜 형식 처리
      const dateValue = data[field];
      let parsedDate: Date;
      if (typeof dateValue === 'string') {
        try {
          // ISO 형식 (예: "2014-01-01")
          parsedDate = parseISO(dateValue);
        } catch {
          try {
            // "YYYY-MM-DD" 형식
            parsedDate = parse(dateValue, 'yyyy-MM-dd', new Date());
          } catch {
            console.error(`Invalid date format for ${slug}: ${dateValue}`);
            parsedDate = new Date(); // 기본값으로 현재 날짜 사용
          }
        }
      } else {
        parsedDate = new Date(dateValue);
      }
      // Date 객체를 ISO 문자열로 변환
      items[field] = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") as any;
    } else if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
    if (field === "tags" && typeof data[field] === 'string') {
      // Assuming tags are stored as a comma-separated string
      items[field] = data[field].split(',').map(tag => tag.trim());
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []): Partial<Post>[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .filter((post): post is Post => post !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
