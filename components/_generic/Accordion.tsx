import { KeyboardEvent, ReactNode, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import styles from "../../styles/components/_generic/Accordion.module.scss";
import Flex from "./Flex";

type AccordionProps = {
    children: ReactNode;
};

export const Accordion = ({ children }: AccordionProps) => {
    return <div className={styles.accordion}>{children}</div>;
};

type AccordionPanelProps = {
    children: ReactNode;
    primaryHeader: string;
    secondaryHeader?: string;
    actions?: ReactNode;
};

export const AccordionPanel = ({ children, primaryHeader, secondaryHeader, actions }: AccordionPanelProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleRowClick = (): void => {
        setIsOpen(!isOpen);
    };

    const handleEnter = (e: KeyboardEvent<HTMLDivElement>): void => {
        if (e?.key === "Enter") {
            handleRowClick();
        }
    };

    const getIcon = (): any => {
        let iconDefinition: IconDefinition;

        iconDefinition = isOpen ? faChevronUp : faChevronDown;

        return <FontAwesomeIcon icon={iconDefinition} />;
    };

    return (
        <div className={styles.panel}>
            <Flex alignItems="center">
                <Flex
                    style={{ flex: "1" }}
                    inline
                    alignItems="center"
                    justifyContent="space-between"
                    className={styles.panelHeader}
                    onClick={() => handleRowClick()}
                    onKeyDown={(e) => handleEnter(e)}
                    tabIndex={0}
                >
                    <span className={styles.primaryHeaderText}>{primaryHeader}</span>
                    {secondaryHeader && <span className={styles.secondaryHeaderText}>{secondaryHeader}</span>}
                    {getIcon()}
                </Flex>
                <Flex style={{ textAlign: "right" }}>
                    {actions}
                </Flex>
            </Flex>
            {isOpen && <div className={styles.content}>{children}</div>}
        </div>
    );
};
