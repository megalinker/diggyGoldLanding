import { useEffect, useRef, useState } from 'react';
import OrangeButton from '../OrangeButton/OrangeButton.tsx';
import styles from './MiddleMessage.module.scss';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../declarations/backend/backend.did.js';
import { idlFactory as idlFactoryDiggy } from '../../declarations/backendDiggyWorld/index.js';
import { Principal } from '@dfinity/principal';

interface MiddleMessageProps {
    iframeVisible: boolean;
    setIframeVisible: (visible: boolean) => void;
    setIsLoading: (loading: boolean) => void;
    setDiggycoinAmount: (amount: string) => void;
    setIsModal2Open: (open: boolean) => void
    hasClaimed: string
    setHasClaimed: (amount: string) => void
    setPrincipal: (amount: string) => void
}

const MiddleMessage: React.FC<MiddleMessageProps> = ({ iframeVisible, setIframeVisible, setIsLoading, setDiggycoinAmount, setIsModal2Open, hasClaimed, setHasClaimed, setPrincipal }) => {

    const [isLooping, setIsLooping] = useState(false);

    const url = "https://ifxbl-nyaaa-aaaap-abroa-cai.icp0.io";
    const principalExtracted = useRef(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLooping(true);
        }, 14000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleMessage = async (event: MessageEvent) => {

            if (principalExtracted.current) return;

            let data;

            try {
                data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
            } catch {
                return;
            }

            if (data && data._principal && data._principal.__principal__) {
                principalExtracted.current = true;
                const principalValue = data._principal.__principal__;
                localStorage.setItem('principal', principalValue);
                setPrincipal(principalValue);
                setIsLoading(true);
                const agent = HttpAgent.createSync();

                const actor = Actor.createActor(idlFactory, {
                    agent: agent!,
                    canisterId: 'stsmr-hqaaa-aaaag-qnguq-cai',
                });

                let isPreRegistered = await actor.isPreRegistered(Principal.fromText(principalValue));

                if (!isPreRegistered) {
                    let response = await actor.preRegisterUser(Principal.fromText(principalValue)) as string;
                    if (response.startsWith("Success")) {

                        const actorDiggyworld = Actor.createActor(idlFactoryDiggy, {
                            agent: agent!,
                            canisterId: 'bg4su-6iaaa-aaaap-anxsa-cai',
                        });

                        let balance = await actorDiggyworld.getAllUserEntities({ uid: principalValue, page: [], }) as any;
                        const diggycoinEntity = balance.ok.find((entity: { eid: string; }) => entity.eid === 'diggycoin');

                        if (diggycoinEntity) {
                            const amountField = diggycoinEntity.fields.find((field: { fieldName: string; }) => field.fieldName === 'amount');
                            if (amountField) {
                                const cleanedNumber = parseFloat(amountField.fieldValue);
                                const cleanedString = "YOUR GOLD: " + cleanedNumber.toString();
                                setDiggycoinAmount(cleanedString);
                            }
                        }
                        setHasClaimed("SUCCESS");
                        setIsModal2Open(true);
                    } else {
                        alert(response);
                    }
                } else {
                    const actorDiggyworld = Actor.createActor(idlFactoryDiggy, {
                        agent: agent!,
                        canisterId: 'bg4su-6iaaa-aaaap-anxsa-cai',
                    });

                    let balance = await actorDiggyworld.getAllUserEntities({ uid: principalValue, page: [], }) as any;
                    const diggycoinEntity = balance.ok.find((entity: { eid: string; }) => entity.eid === 'diggycoin');
                    if (diggycoinEntity) {
                        const amountField = diggycoinEntity.fields.find((field: { fieldName: string; }) => field.fieldName === 'amount');
                        if (amountField) {
                            const cleanedNumber = parseFloat(amountField.fieldValue);
                            const cleanedString = "YOUR GOLD: " + cleanedNumber.toString();
                            setDiggycoinAmount(cleanedString);
                            setHasClaimed("CLAIMED");
                            setIsModal2Open(true);
                        }
                    }
                }
                setIframeVisible(false);
                setIsLoading(false);
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [setIframeVisible]);

    const handleConnect = () => {
        if (hasClaimed === "CLAIMED") {
            setIsModal2Open(true);
        } else {
            if (iframeVisible) {
                setIframeVisible(false);
            } else {
                setIframeVisible(true);
            }
        }
    };

    const goToGame = () => {
        window.open("https://6v7kz-xaaaa-aaaal-ar7ea-cai.raw.icp0.io/", "_blank");
    };

    return (
        <div className={styles.MiddleMessage}>

            <div className={styles.textWrapper}>
                {/* Text 1: GET FREE GOLD with a golden gradient */}
                <p className={`${styles.message} ${isLooping ? styles.text1Loop : styles.text1Initial}`}>
                    GET FREE <span className={styles.golden}>GOLD</span>
                </p>
                {/* Text 2: PLAY AN EPIC GAME */}
                <p className={`${styles.message} ${styles.text2Font} ${isLooping ? styles.text2Loop : styles.text2Initial}`} >
                    PLAY AN EPIC GAME
                </p>
                {/* Text 3: EARN $DIGGY with $DIGGY in blue gradient */}
                <p className={`${styles.message} ${isLooping ? styles.text3Loop : styles.text3Initial}`}>
                    EARN <span className={styles.blueGradient}>$DIGGY</span>
                </p>
            </div>
            <div className={styles.animatedMiddleButton}>
                <OrangeButton fontSize="3.25em" text="PLAY THE GAME" onClick={goToGame} />
            </div>
            {iframeVisible && (
                <iframe
                    src={url}
                    style={{ marginTop: "10px", width: "clamp(400px, 25vw, 600px)", height: "300px", border: "3px white solid", borderRadius: "25px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.67)" }}
                    allow="clipboard-write"
                />
            )}
        </div>
    );
};

export default MiddleMessage;
