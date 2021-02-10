import { Box, Flex } from "@chakra-ui/react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "vertical" | "horizontal";
}

const ResizeHandler: React.FC<ResizableProps> = ({
  direction = "vertical",
}) => {
  const handlerProps = {
    vertical: {
      width: "100%",
      height: 2,
      bottom: 0,
      left: 0,
      cursor: "row-resize",
    },
    horizontal: {
      width: 2,
      height: "100%",
      top: 0,
      right: 0,
      cursor: "col-resize",
    },
  };
  return (
    <Box
      backgroundColor="gray.300"
      position="absolute"
      {...handlerProps[direction]}
    />
  );
};

export const Resizable: React.FC<ResizableProps> = ({
  direction,
  children,
}) => {
  const resizableProps: Record<
    ResizableProps["direction"],
    ResizableBoxProps
  > = {
    vertical: {
      height: 300,
      width: Infinity,
      axis: "y",
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
    },
    horizontal: {
      height: Infinity,
      width: 400,
      axis: "x",
      minConstraints: [window.innerWidth * 0.2, Infinity],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
    },
  };
  return (
    <Flex
      position="relative"
      flexDirection={direction === "vertical" ? "column" : "row"}
    >
      <ResizableBox
        {...resizableProps[direction]}
        handle={() => ResizeHandler({ direction })}
      >
        {children}
      </ResizableBox>
    </Flex>
  );
};
