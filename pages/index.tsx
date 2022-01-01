import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import Main from '../components/main'

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Main />
            </main>
        </div>
    )
}

export default Home
