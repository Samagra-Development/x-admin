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
        <title></title>
        <link rel="preload" href="/Bahnschrift.otf" as="font" crossOrigin="" />
      </Head>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
            src="/DPlogo.png"
            alt="Haryana Govt Logo"
            width={120}
            height={127.5}
          />
        </div>
        <header className={styles.header}>
          <h1 className={styles.title}>Rozgar Saathi</h1>
        </header>
        <main
          onTransitionEnd={() => {
            transitionEnd();
          }}
          className={`${styles.main} ${styles[transitionStage]}`}
        >
          {activeChildren}
        </main>
      </div>
    </>
  );
};

export default Layout;
