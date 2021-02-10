import { ChakraProvider, Box } from "@chakra-ui/react";
import ReactDOM from "react-dom";
import { CodeCell } from "./components/code-cell";

const App = () => {
  return (
    <ChakraProvider>
      <Box padding={10} backgroundColor="gray.100" height="100vh">
        <CodeCell />
      </Box>
    </ChakraProvider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
