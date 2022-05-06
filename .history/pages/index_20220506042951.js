import  { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
// import LinkList from '../components/LinkList'
// import CreateLink from '../components/CreateLink'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css'
        />
      </Head>

      <main className={styles.main}>
        {/* <LinkList /> */}
        {/* <CreateLink /> */}
      </main>
    </div>
  )
}

export default Home