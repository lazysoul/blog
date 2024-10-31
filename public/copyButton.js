document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.code-block').forEach(codeBlock => {
      const button = codeBlock.querySelector('.copy-button');
      if (!button) return;
      
      button.addEventListener('click', async () => {
        try {
          const code = codeBlock.getAttribute('data-code') || '';
          await navigator.clipboard.writeText(code);
          button.textContent = 'Copied!';
          
          setTimeout(() => {
            button.textContent = 'Copy';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
          button.textContent = 'Failed to copy';
        }
      });
    });
  });