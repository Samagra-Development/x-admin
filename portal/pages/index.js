import styles from "../styles/Home.module.css";
import Login from "./login";
import React from "react";

const Home = () => {
  return (
    // <Layout>
    <div className={styles.grid}>
      <Login></Login>
      {/* {config.homepageCards.map((card, index) => {
          return (
            <Link key={index} href={card.target} passHref>
              <div className="card logo-card card-center">
                <span
                  className={`material-icons ${styles.icon} ${
                    styles[card.colour]
                  }`}
                >
                  {card.icon}
                </span>
                <h2>
                  {" "}
                  {card.title.en} &#47;
                  <br /> {card.title.hi} &#10230;
                </h2>
              </div>
            </Link>
          );
        })} */}
    </div>
    // </Layout>
  );
};

export default Home;
