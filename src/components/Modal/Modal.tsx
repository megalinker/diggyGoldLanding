import React from 'react';
import styles from './Modal.module.scss';
import CoinBag from '/assets/coinBag.webp';
import OrangeButton from '../OrangeButton/OrangeButton.tsx';
import CloseIcon from '/assets/closeIcon.svg';
import { useMediaQuery } from 'react-responsive';


interface ModalProps {
    setIframeVisible: (visible: boolean) => void;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ setIframeVisible, onClose }) => {

    const isSmallScreen = useMediaQuery({ query: '(max-width: 700px)' });

    const goToGame = () => {
        window.open("https://6v7kz-xaaaa-aaaal-ar7ea-cai.raw.icp0.io/", "_blank");
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


                <h1 className={styles.headerText}>GET FREE GOLD</h1>

                <div className={styles.section}>
                    <h2 className={styles.subHeader}>What Are Golds?</h2>
                    <p className={styles.paragraph}>
                        Golds are the in-game currency within <strong>DIGGY</strong>. You will need Golds to play the game and access special buffs that enhance your gameplay experience. Golds can be purchased directly from the game's marketplace using the $DIGGY token.

                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.subHeader}>What Can I Do with Golds?</h2>
                    <p className={styles.paragraph}>
                        Golds allow you to participate in game sessions and activate buffs. Having more Golds increases your chances to play more frequently, accumulate higher scores, and climb the leaderboard faster.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.subHeader}>What Happens to the $DIGGY Used to Purchase Golds?</h2>
                    <p className={styles.paragraph}>
                        All $DIGGY tokens spent on Golds go into a dedicated pool. This pool is then divided into two parts:
                    </p>
                    <ul className={styles.list}>
                        <li>A percentage is allocated to reward active players.</li>
                        <li>A percentage is permanently burned to decrease the total supply.</li>
                    </ul>
                </div>

                <div className={styles.bottomBar}>
                    <div className={styles.buttonContainer}>
                        {!isSmallScreen && (
                            <img src={CoinBag} className={styles.sideImage} />
                        )}
                        <OrangeButton
                            text="PLAY THE GAME"
                            onClick={() => {
                                goToGame();
                            }}
                        />
                        <img src={CoinBag} className={styles.sideImage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;