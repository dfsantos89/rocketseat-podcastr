import '../styles/global.scss';

import { Header } from '../components/Header';
import { Player } from '../components/Player';

import styles from '../styles/app.module.scss';
import { PlayerCntextProvider } from '../components/contexts/PlayerContext';

function MyApp({ Component, pageProps }) {
  return (
    <PlayerCntextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerCntextProvider>
  )
}

export default MyApp
