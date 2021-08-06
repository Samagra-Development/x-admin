import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../styles/layout.module.css";

const Layout = ({ children, home }) => {
  const transitionStages = {
    FADE_OUT: "fadeOut",
    FADE_IN: "fadeIn",
  };

  const [activeChildren, setActiveChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState(
    transitionStages.FADE_OUT
  );

  const compareElem = (a, b) => {
    return a.type.name === b.type.name;
  };

  const transitionEnd = () => {
    if (transitionStage === transitionStages.FADE_OUT) {
      setActiveChildren(children);
      setTransitionStage(transitionStages.FADE_IN);
    }
  };

  useEffect(() => {
    setTransitionStage(transitionStages.FADE_IN);
  }, [transitionStages.FADE_IN]);

  useEffect(() => {
    if (!compareElem(children, activeChildren))
      setTransitionStage(transitionStages.FADE_OUT);
  }, [transitionStages.FADE_OUT, children, activeChildren]);

  return (
    <>
      <Head>
        <title>Admin Console</title>
        <link rel="preload" href="/Bahnschrift.otf" as="font" crossOrigin="" />
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerLogos}>
            <Image
              src="/logo-haryana.png"
              alt="Campaign Logo"
              width={397}
              height={119}
            />
          </div>
        </header>
        <main
          onTransitionEnd={() => {
            transitionEnd();
          }}
          className={`${styles.main} ${styles[transitionStage]}`}
        >
          {activeChildren}
        </main>
        <footer className={styles.footer}>
          <div className={styles.logo}>
            <Image
              src="/default.png"
              alt="Haryana Govt Logo"
              width={80}
              height={80}
            />
            <Image
              src="/SSA_logo.png"
              className={styles["ssa-logo"]}
              alt="SSA Logo"
              width={200}
              height={80}
            />
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
