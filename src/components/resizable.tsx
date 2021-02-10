import { Box } from "@chakra-ui/react";
import { ResizableBox } from "react-resizable";

interface ResizableProps {
  direction: "vertical" | "horizontal";
}

const ResizeHandler = () => {
  return (
    <Box
      backgroundColor="gray.300"
      width="100%"
      height={2}
      position="absolute"
      bottom={0}
      cursor="row-resize"
    />
  );
};

export const Resizable: React.FC<ResizableProps> = ({
  direction,
  children,
}) => {
  return (
    <ResizableBox height={300} width={Infinity} axis="y" handle={ResizeHandler}>
      {children}
    </ResizableBox>
  );
};
