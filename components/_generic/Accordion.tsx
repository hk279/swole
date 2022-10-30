import { KeyboardEvent, ReactNode, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import styles from "../../styles/components/_generic/Accordion.module.scss";

interface Props {
    children: ReactNode;
}

const Accordion = ({ children }: Props) => {
    return <div className={styles.accordion}>{children}</div>;
};

interface PanelProps {
    children: ReactNode;
    primaryHeader: string;
    secondaryHeader?: string;
}

Accordion.Panel = ({ children, primaryHeader, secondaryHeader}: PanelProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

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
        <div>
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

export default Accordion;
