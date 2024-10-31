import { useEffect } from 'react';

export default function CodeBlock({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const copyCode = (button: HTMLButtonElement) => {
      const code = button.getAttribute('data-code');
      if (code) {
        navigator.clipboard.writeText(code).then(() => {
          button.textContent = 'Copied!';
          button.classList.add('copied');
          setTimeout(() => {
            button.textContent = 'Copy';
            button.classList.remove('copied');
          }, 2000);
        });
      }
    };

    // 전역 함수로 등록
    (window as any).copyCode = copyCode;

    return () => {
      delete (window as any).copyCode;
    };
  }, []);

  return <div className="markdown-content">{children}</div>;
} 