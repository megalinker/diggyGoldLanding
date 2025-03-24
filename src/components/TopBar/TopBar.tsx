import React from 'react';
import styles from './TopBar.module.scss';
import DiggyCoin from '../DiggyCoin/DiggyCoin.tsx';
import SocialIcons from '../SocialIcons/SocialIcons.tsx';
import { useMediaQuery } from 'react-responsive';
import copyIcon from '/assets/CopyIcon.svg';

interface TopBarProps {
    onGoldClick: () => void;
    diggyCoinAmount: string;
    principal: string;
}

const TopBar: React.FC<TopBarProps> = ({ onGoldClick, diggyCoinAmount, principal }) => {

    const isGoldScreen = useMediaQuery({ query: '(max-width: 850px)' });

    const displayedDiggyCoinAmount =
        isGoldScreen && diggyCoinAmount.startsWith("YOUR GOLD")
            ? diggyCoinAmount.replace("YOUR GOLD", "GOLD")
            : diggyCoinAmount;

    const leftSectionStyle = {
        backgroundColor: principal !== "" ? 'rgba(233, 149, 70, 0.5)' : 'rgba(255, 255, 255, 0.2)',
    }

    const getShortAddress = (address: string): string => {
        if (address.length <= 10) return address;
        return `${address.substring(0, 5)}-...-${address.substring(address.length - 3)}`;
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(principal);
    };

    return (
        <header>
            <div className={styles.topBar}>
                {/* Left Section */}
                <div className={styles.leftSection} style={leftSectionStyle}>
                    <DiggyCoin size={40} />
                    <div className={styles.textLeftContainer}>
                        <div className={styles.textContainer} >
                            {/* Bottom layer: with stroke */}
                            <span className={styles.orangeText} style={principal !== "" ? { fontSize: '1.33em' } : {}}>{displayedDiggyCoinAmount}</span>
                            {/* Top layer: clone without stroke */}
                            <span className={styles.orangeTextClone} style={principal !== "" ? { fontSize: '1.33em' } : {}}>{displayedDiggyCoinAmount}</span>
                        </div>
                        {principal !== "" && (
                            <div className={styles.textContainer} >
                                {/* Bottom layer: with stroke */}
                                <span className={styles.orangeText} style={{ fontSize: '0.95em' }}>ID: {getShortAddress(principal)}</span>
                                {/* Top layer: clone without stroke */}
                                <span className={styles.orangeTextClone} style={{ fontSize: '0.95em', color: 'white' }}>ID: {getShortAddress(principal)}</span>
                                <img
                                    src={copyIcon}
                                    alt={'Copy Address Icon'}
                                    className={styles.menuIcon}
                                    onClick={handleCopy}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Middle Section */}

                {!isGoldScreen && (
                    <div className={styles.middleSection}>
                        <button className={styles.goldButton} onClick={onGoldClick}>
                            WHAT IS GOLD?
                        </button>
                    </div>
                )}

                {/* Right Section */}
                <div className={styles.rightSection}>
                    <SocialIcons />
                </div>
            </div>

            {isGoldScreen && (
                <div className={styles.topBar2}>
                    <button className={styles.goldButton} onClick={onGoldClick}>
                        WHAT IS GOLD?
                    </button>
                </div>
            )}
        </header>
    );
};

export default TopBar;
