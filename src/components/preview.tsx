import { useEffect, useRef } from "react";

const html = `
    <html>
    <head></head>
    <body>
      <div id="root"></div>
    </body>
    <script>
      window.addEventListener('message', event => {
        try {
          eval(event.data);
        } catch (e) {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;">' + e + '</div>';
          console.error(e);
        }        
      }, false)
    </script>
    </html>
  `;

interface PreviewProps {
  code: string;
}

export const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, "*");
  }, [code]);
  return (
    <iframe
      title="preview"
      ref={iframe}
      srcDoc={html}
      sandbox="allow-scripts"
    />
  );
};
