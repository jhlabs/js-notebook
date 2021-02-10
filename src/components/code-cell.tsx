import { useEffect, useState } from "react";
import { CodeEditor } from "./code-editor";
import { Preview } from "./preview";
import { bundle } from "../services/bundler";
import { Resizable } from "./resizable";
import { Box, Flex } from "@chakra-ui/react";

export const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const result = await bundle(input);
      setCode(result);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Box
      boxShadow="lg"
      borderRadius={8}
      backgroundColor="white"
      overflow="hidden"
      position="relative"
    >
      <Resizable direction="vertical">
        <Flex direction="row" height="100%">
          <Resizable direction="horizontal">
            <CodeEditor
              initialValue="const hello = 'world'"
              onChange={(value) => setInput(value)}
            />
          </Resizable>
          <Preview code={code} />
        </Flex>
      </Resizable>
    </Box>
  );
};
