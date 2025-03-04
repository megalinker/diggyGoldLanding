import styles from './App.module.scss';
import DiggyCoin from './components/DiggyCoin/DiggyCoin';
import OrangeButton from './components/OrangeButton/OrangeButton';
import TopBar from './components/TopBar/TopBar';
import DiggyPlay from '/assets/DiggyPlay.svg';
import DiggyCoinImage from '/assets/DiggyCoin.webp';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <div className={styles.App}>
      <div className={styles.MainDiv}>
        <div className={styles.TopBar}>
          <TopBar />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
