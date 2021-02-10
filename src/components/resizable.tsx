interface ResizableProps {
  direction: "vertical" | "horizontal";
}

export const Resizable: React.FC<ResizableProps> = ({
  direction,
  children,
}) => {
  return <div>{children}</div>;
};
