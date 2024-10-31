import { visit } from 'unist-util-visit';
import type { Element } from 'hast';

export default function rehypeCodeCopy() {
  return (tree: any) => {
    visit(tree, 'element', (node: Element, index, parent) => {
      if (node.tagName === 'pre' && !parent?.properties?.['data-processed']) {
        const codeEl = node.children[0];
        
        if (codeEl.type === 'element' && codeEl.tagName === 'code') {
          const codeText = (codeEl.children[0] as any)?.value || '';
          
          if (parent && typeof index === 'number') {
            const wrapper = {
              type: 'element',
              tagName: 'div',
              properties: { 
                className: ['code-block-wrapper'],
                'data-processed': true 
              },
              children: [
                {
                  type: 'element',
                  tagName: 'button',
                  properties: {
                    className: ['copy-button'],
                    'data-code': codeText,
                    onclick: 'copyCode(this)'
                  },
                  children: [{ type: 'text', value: 'Copy' }]
                },
                node
              ]
            };

            parent.children[index] = wrapper;
          }
        }
      }
    });
  };
} 