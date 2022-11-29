import { ReactNode } from "react";

type Props = {
    children: ReactNode | ReactNode[];
    direction?: "row" | "column";
    gap?: number;
    inline?: boolean;
    alignItems?: "center" // TODO: Add other options
    justifyContent?: "space-between" // TODO: Add other options
    // etc.
}

const Flex = ({ children, direction = "row", gap = 8, inline = false, alignItems, justifyContent }: Props) => {
    return <div style={{ display: inline ? "inline-flex" : "flex", flexDirection: direction, gap: gap + "px", alignItems, justifyContent }}>{children}</div>
};

export default Flex;
