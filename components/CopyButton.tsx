'use client';

import { useEffect } from 'react';

export default function CopyButton() {
  useEffect(() => {
    const handleCopy = async (e: MouseEvent) => {
      const button = e.target as HTMLButtonElement;
      if (!button.matches('.copy-button')) return;
      
      const pre = button.closest('pre');
      if (!pre) return;
      
      const code = pre.innerText.replace(/^Copy\n/, '');
      if (!code) return;

      try {
        // Try modern clipboard API first
        try {
          await navigator.clipboard.writeText(code);
        } catch {
          // Fallback to execCommand
          const textarea = document.createElement('textarea');
          textarea.value = code;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }

        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        button.textContent = 'Failed to copy';
      }
    };

    document.addEventListener('click', handleCopy);
    return () => document.removeEventListener('click', handleCopy);
  }, []);

  return null;
} 