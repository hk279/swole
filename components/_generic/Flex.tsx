import { ForwardedRef, forwardRef, ReactNode } from "react";

type Props = JSX.IntrinsicElements["div"] &
{
    children: ReactNode | ReactNode[];
    direction?: "row" | "column";
    gap?: number;
    inline?: boolean;
    alignItems?: "center" | "flex-start"; // TODO: Add other options
    justifyContent?: "space-between"; // TODO: Add other options
    // etc.
};

const Flex = forwardRef(({ children, direction = "row", gap = 8, inline = false, alignItems, justifyContent }: Props, ref: ForwardedRef<HTMLDivElement>) =>
    <div style={{ display: inline ? "inline-flex" : "flex", flexDirection: direction, gap: gap + "px", alignItems, justifyContent }} ref={ref}>{children}</div>
);

export default Flex;
