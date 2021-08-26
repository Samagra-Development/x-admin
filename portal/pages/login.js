import Image from "next/image";
import { useState } from "react";
import Layout from "../components/layout";
import Login from "../components/login/login";
import styles from "../styles/Login.module.css";
import config from "@/components/config";

const LoginWrapper = () => {
  const [selectedPersona, setSelectedPersona] = useState(null);
  if (selectedPersona) {
    return (
      <Layout>
        <Login persona={selectedPersona}></Login>
      </Layout>
    );
  }

  return (
    <Layout>
      <>
        <h2 className="text-center">Admin Console &#47; प्रशासन कौंसोल</h2>
        <div className={`${styles.grid} ${styles["grid-two"]}`}>
          {config.personas.map((persona, index) => (
            <div
              onClick={() => {
                setSelectedPersona(persona);
              }}
              key={index}
              className={`card card-center`}
            >
              <h2 className={"capitalize"}>
                Login &#47; <br />
                लॉग इन&rarr;
              </h2>
              <p>
                I am a{persona.consonant ? "" : "n"} {persona.en}
                <br /> मैं राज्य में {persona.hi} हूँ{" "}
              </p>
            </div>
          ))}
        </div>
      </>
    </Layout>
  );
};

export default LoginWrapper;
