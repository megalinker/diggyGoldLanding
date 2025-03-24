import React, { ButtonHTMLAttributes } from 'react';
import styles from './OrangeButton.module.scss';

interface OrangeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    icon?: string;
    fontSize?: string;
}

const OrangeButton: React.FC<OrangeButtonProps> = ({ text, icon, fontSize, ...buttonProps }) => {
    return (
        <button className={styles.pushable} {...buttonProps}>
            <span className={styles.front} style={fontSize ? { fontSize } : {}}>
                {icon && <img src={icon} alt="" className={styles.icon} />}
                {text}
            </span>
        </button>
    );
};

export default OrangeButton;
