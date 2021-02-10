import { useState } from "react";
import { CodeEditor } from "./code-editor";
import { Preview } from "./preview";
import { bundle } from "../services/bundler";
import { Resizable } from "./resizable";
import { Box, Flex } from "@chakra-ui/react";

export const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const result = await bundle(input);

    setCode(result);
  };

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
