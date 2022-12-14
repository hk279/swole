import { KeyboardEvent, ReactNode, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import styles from "../../styles/components/_generic/Accordion.module.scss";

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
};

export const AccordionPanel = ({ children, primaryHeader, secondaryHeader }: AccordionPanelProps) => {
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
            <div
                className={styles.panelHeader}
                onClick={() => handleRowClick()}
                onKeyDown={(e) => handleEnter(e)}
                tabIndex={0}
            >
                <span className={styles.primaryHeaderText}>{primaryHeader}</span>
                {secondaryHeader && <span>{secondaryHeader}</span>}
                {getIcon()}
            </div>
            {isOpen && <div className={styles.content}>{children}</div>}
        </div>
    );
};
