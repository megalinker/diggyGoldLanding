import styles from './App.module.scss';
import TopBar from './components/TopBar/TopBar.tsx';
import DiggyRocks from './components/DiggyRocks.tsx';
import { useEffect, useState } from 'react';
import Modal from './components/Modal/Modal.tsx';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from './declarations/backend/backend.did.js';
import Modal2 from './components/Modal2/Modal2.tsx';
import { idlFactory as idlFactoryDiggy } from './declarations/backendDiggyWorld/index.js';

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [iframeVisible, setIframeVisible] = useState(false);
  const [diggyCoinAmount, setDiggyCoinAmount] = useState("DIGGY");
  const [hasClaimed, setHasClaimed] = useState("");
  const [principal, setPrincipal] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const closeModal2 = () => setIsModal2Open(false);

  useEffect(() => {
    const handleAccess = async () => {
      const currentUrl = window.location.href;
      if (currentUrl.includes("free-gold")) {
        const agent = HttpAgent.createSync();

        const actor = Actor.createActor(idlFactory, {
          agent: agent,
          canisterId: 'stsmr-hqaaa-aaaag-qnguq-cai',
        });

        await actor.accessByH();
        window.history.replaceState({}, '', '/');
      } else if (currentUrl.includes("pre-register")) {
        const agent = HttpAgent.createSync();

        const actor = Actor.createActor(idlFactory, {
          agent: agent,
          canisterId: 'stsmr-hqaaa-aaaag-qnguq-cai',
        });

        await actor.accessByC();
        window.history.replaceState({}, '', '/');
      }
    };

    handleAccess();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const principalValue = localStorage.getItem('principal');
      if (principalValue) {
        setHasClaimed("CLAIMED");
        setPrincipal(principalValue);

        const agent = HttpAgent.createSync();
        const actorDiggyworld = Actor.createActor(idlFactoryDiggy, {
          agent: agent!,
          canisterId: 'bg4su-6iaaa-aaaap-anxsa-cai',
        });

        const balance = await actorDiggyworld.getAllUserEntities({
          uid: principalValue,
          page: [],
        }) as any;

        const diggycoinEntity = balance.ok.find((entity: { eid: string; }) => entity.eid === 'diggycoin');

        if (diggycoinEntity) {
          const amountField = diggycoinEntity.fields.find((field: { fieldName: string; }) => field.fieldName === 'amount');
          if (amountField) {
            const cleanedNumber = parseFloat(amountField.fieldValue);
            const cleanedString = "YOUR GOLD: " + cleanedNumber.toString();
            setDiggyCoinAmount(cleanedString);
          }
        }
      }
    };

    fetchData();
  }, [hasClaimed]);


  return (
    <div className={styles.App}>
      <div className={styles.MainDiv}>
        <div className={styles.TopBar}>
          <TopBar onGoldClick={openModal} diggyCoinAmount={diggyCoinAmount} principal={principal} />
        </div>
        <DiggyRocks iframeVisible={iframeVisible} setIframeVisible={setIframeVisible} setDiggycoinAmount={setDiggyCoinAmount} setIsModal2Open={setIsModal2Open} hasClaimed={hasClaimed} setHasClaimed={setHasClaimed} setPrincipal={setPrincipal} />
      </div>
      {isModalOpen && <Modal setIframeVisible={setIframeVisible} onClose={closeModal} />}
      {isModal2Open && <Modal2 onClose={closeModal2} hasClaimed={hasClaimed} />}
    </div>
  );
}

export default App;