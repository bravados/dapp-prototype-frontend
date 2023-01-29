import Head from 'next/head'
import { ComingSoon } from '../ui/viewComponents'
import styles from '../styles/Home.module.css'

export default function Home() {
    return (
        <>
            <Head>
                <title>Kiruna Labs</title>
                <meta name="description" content="Curated digital art" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <ComingSoon/>
            </main>
        </>
    )
}
