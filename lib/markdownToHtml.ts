import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import type { Element } from 'hast';
import 'highlight.js/styles/github-dark.css';

function rehypeCopyButton() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "pre" && node.children[0]?.tagName === "code") {
        const codeNode = node.children[0] as Element;
        const codeContent = codeNode.children
          .map(child => (child as any).value || '')
          .join('');
        
        node.properties.className = (node.properties.className || []).concat("code-block");
        node.properties['data-code'] = codeContent;
        
        const button = {
          type: "element",
          tagName: "button",
          properties: { 
            className: ["copy-button"],
            type: "button"
          },
          children: [{ type: "text", value: "Copy" }],
        };
        node.children.unshift(button);
      }
    });
  };
}

export default async function markdownToHtml(markdown: string | Buffer) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkBreaks)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight, { detect: true })
    .use(rehypeCopyButton)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}
