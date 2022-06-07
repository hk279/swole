import { KeyboardEvent, ReactNode, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
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
    iconType?: "plusminus" | "chevron";
}

Accordion.Panel = ({ children, primaryHeader, secondaryHeader, iconType = "chevron" }: PanelProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const handleRowClick = (): void => {
        setIsExpanded(!isExpanded);
    };

    const handleEnter = (e: KeyboardEvent<HTMLDivElement>): void => {
        if (e?.key === "Enter") {
            handleRowClick();
        }
    };

    const getIcon = (): any => {
        let iconDefinition: IconDefinition;

        if (iconType === "chevron") {
            iconDefinition = isExpanded ? faChevronUp : faChevronDown;
        } else {
            iconDefinition = isExpanded ? faMinus : faPlus;
        }

        return <FontAwesomeIcon icon={iconDefinition} />;
    };

    return (
        <div>
            <div
                className={styles.panelHeader}
                onClick={() => handleRowClick()}
                onKeyPress={(e) => handleEnter(e)}
                tabIndex={0}
            >
                <span className={styles.primaryHeaderText}>{primaryHeader}</span>
                {secondaryHeader && <span>{secondaryHeader}</span>}
                {getIcon()}
            </div>
            {isExpanded && <div className={styles.content}>{children}</div>}
        </div>
    );
};

export default Accordion;
