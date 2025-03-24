import React, { useEffect, useState } from 'react';
import styles from './Modal2.module.scss';
import CoinBag from '/assets/coinBag.webp';
import OrangeButton from '../OrangeButton/OrangeButton.tsx';
import CloseIcon from '/assets/closeIcon.svg';
import { useMediaQuery } from 'react-responsive';


interface Modal2Props {
    onClose: () => void;
    hasClaimed: string
}

const Modal2: React.FC<Modal2Props> = ({ onClose, hasClaimed }) => {

    const isSmallScreen = useMediaQuery({ query: '(max-width: 700px)' });
    const [hasShared, setHasShared] = useState(false);

    const handleShareClick = () => {
        window.open("https://x.com/intent/tweet?text=%F0%9F%9A%A8EXCLUSIVE%20ACCESS%20%2B%20FREE%20GOLD%F0%9F%9A%A8%0A%0AI%20pre-registered%20at%20%40diggycoin_%20and%20earned%20%23GOLD%F0%9F%AA%99%0A%0ANow%20I%E2%80%99ll%20play%20the%20exclusive%20game%20launch%20and%20earn%20$DIGGY%20%F0%9F%8E%AE%0A%0AYou%20can%20too!%20Pre-register%20now%2C%20claim%2050%20FREE%20GOLD%2C%20and%20unlock%20up%20to%20200%20GOLD!%F0%9F%AB%B5%0A%0ALimited%20spots%20available%20%F0%9F%98%B1%20%F0%9F%91%87%0Ahttps%3A%2F%2Ftz5ol-faaaa-aaaag-qngtq-cai.icp0.io%2Ffree-gold", '_blank');
        setHasShared(true);
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <img
                    src={CloseIcon}
                    alt="Close"
                    className={styles.closeIcon}
                    onClick={onClose}
                />
                {hasShared ? (
                    <>
                        <h1 className={styles.headerText}>THANK YOU FOR SHARING!</h1>

                        <p className={styles.paragraph}>
                            This extra gold will be added to your balance in the next days once our {' '}
                            <a
                                href="https://x.com/konectA_Dao"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Konecta
                            </a>{' '}
                            Missions Campaign goes live.
                        </p>

                        <p className={styles.paragraph}>
                            Stay tuned to{' '}
                            <a
                                href="https://x.com/diggycoin_"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                @diggycoin_
                            </a>{' '}
                            for mission updates and get ready to unlock even more rewards!
                        </p>

                        <div className={styles.bottomBar}>
                            <div className={styles.buttonContainer}>
                                {!isSmallScreen && (
                                    <img src={CoinBag} className={styles.sideImage} />
                                )}
                                <OrangeButton
                                    text="GOT IT!"
                                    onClick={() => {
                                        onClose();
                                    }}
                                />
                                <img src={CoinBag} className={styles.sideImage} />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className={styles.headerText}>{hasClaimed === "SUCCESS" ? "CONGRATULATIONS!" : "SHARE ON X!"}</h1>

                        <div className={styles.section}>
                            <p className={styles.paragraph}>
                                {hasClaimed === "SUCCESS"
                                    ? "You've successfully claimed "
                                    : "You've already claimed "}
                                <strong>{hasClaimed === "SUCCESS"
                                    ? "30 GOLD!"
                                    : "30 GOLD."}</strong>
                            </p>
                            <p className={styles.paragraph}>
                                Check the top-left corner to see your updated balance.
                            </p>
                            {hasClaimed === "SUCCESS" ? (
                                <p className={styles.paragraph}>
                                    Stay tuned! We'll share daily actions to help you earn even more <strong>GOLD</strong>.
                                </p>
                            ) : (
                                <p className={styles.paragraph}>
                                    Don't forget to stay tuned! We'll share daily actions to help you earn even more <strong>GOLD</strong>.
                                </p>
                            )}
                        </div>

                        <div className={styles.section}>
                            {hasClaimed === "SUCCESS" && (
                                <h2 className={styles.subHeader}>Share on X (Twitter)</h2>
                            )}
                            {hasClaimed === "SUCCESS" ? (
                                <p className={styles.paragraph}>
                                    Earn an extra <strong>20 GOLD</strong> and boost your rewards!
                                </p>
                            ) : (
                                <p className={styles.paragraph}>
                                    Remember that you can earn an extra <strong>20 GOLD</strong> by sharing on X and boost your rewards!
                                </p>
                            )}
                        </div>

                        <div className={styles.bottomBar}>
                            <div className={styles.buttonContainer}>
                                {!isSmallScreen && (
                                    <img src={CoinBag} className={styles.sideImage} />
                                )}
                                <OrangeButton
                                    text="SHARE ON X TO EARN 20 GOLD"
                                    fontSize='clamp(1.5em, 1.4vw, 2em)'
                                    onClick={() => {
                                        handleShareClick();
                                    }}
                                />
                                <img src={CoinBag} className={styles.sideImage} />
                            </div>
                        </div>
                    </>
                )}
            </div >
        </div >
    );
};

export default Modal2;