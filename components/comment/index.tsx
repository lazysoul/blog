import React, { useEffect, useRef } from 'react';

const Comment: React.FC = () => {
  const commentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', 'lazysoul/blog');
    script.setAttribute('data-repo-id', 'R_kgDONE-WMw');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDONE-WM84CjouT');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', 'ko');
    script.setAttribute('crossorigin', 'anonymous');


    commentRef.current?.appendChild(script);

    return () => {
      commentRef.current?.removeChild(script);
    };
  }, []);

  return <div ref={commentRef} />;
};

export default Comment;
