import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "../styles/layout.module.css";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
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
        <title>समर्थ हिमाचल</title>
        <link rel="preload" href="/Bahnschrift.otf" as="font" crossOrigin="" />
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Rozgar Saathi </h1>
          {/* <h2 className={styles.subtitle}>Bacchon ka sahara, phone humara</h2>
          <h3 className={styles.subsubtitle}>
            An initiative of the Government of Himachal Pradesh, India
          </h3> */}
        </header>
        <main
          onTransitionEnd={() => {
            transitionEnd();
          }}
          className={`${styles.main} ${styles[transitionStage]}`}
        >
          {activeChildren}
        </main>
        <span className={styles.credit}>
          For more details, contact 1800-180-8190{" "}
        </span>
        <footer className={styles.footer}>
          <div className={styles.logo}>
            <Image
              src="/DPlogo.png"
              alt="HP Govt Logo"
              width={120}
              height={60}
            />
            <span className={styles.address}>
              State Project Office (Samagra Shiksha), Directorate Education,
              DPEP Bhawan, Below Old ISBT, Lalpani, Shimla - 171001
            </span>
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

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;
