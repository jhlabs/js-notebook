import { Box } from "@chakra-ui/react";
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
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);
  return (
    <Box
      position="relative"
      flexGrow={1}
      sx={{
        ".react-draggable-transparent-selection &:after": {
          content: "''",
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          opacity: 0,
        },
      }}
    >
      <Box
        as="iframe"
        title="preview"
        ref={iframe}
        srcDoc={html}
        width="100%"
        height="100%"
        sandbox="allow-scripts"
      />
    </Box>
  );
};
