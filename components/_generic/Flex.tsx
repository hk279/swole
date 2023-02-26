import { ForwardedRef, forwardRef, ReactNode } from "react";

type Props = JSX.IntrinsicElements["div"] & {
  children: ReactNode | ReactNode[];
  direction?: "row" | "column";
  gap?: string;
  inline?: boolean;
  alignItems?: "center" | "flex-start" | "stretch"; // TODO: Add other options
  justifyContent?: "center" | "space-between"; // TODO: Add other options
  // etc.
};

const Flex = forwardRef(
  (
    {
      children,
      direction = "row",
      gap = "8px",
      inline = false,
      alignItems,
      justifyContent,
      style,
      ...rest
    }: Props,
    ref: ForwardedRef<HTMLDivElement>
  ) => (
    <div
      style={{
        display: inline ? "inline-flex" : "flex",
        flexDirection: direction,
        gap,
        alignItems,
        justifyContent,
        ...style,
      }}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  )
);

Flex.displayName = "Flex";

export default Flex;
