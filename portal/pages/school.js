import Link from "next/link";
import { useSession } from "next-auth/client";
import Layout from "../components/layout";
import Login from "./login";
import styles from "../styles/Home.module.css";
import config from "@/components/config";

const School = () => {
  const [session, loading] = useSession();

  if (loading) return null;

  if (!loading && !session) {
    // signIn("fusionauth")
    return <Login />;
  }
  return (
    <Layout>
      <div className={styles.grid}>
        {config.schoolPageCards.map((card, index) => {
          return (
            <Link key={index} href={card.target} passHref>
              <div className="card logo-card">
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
        })}
      </div>
    </Layout>
  );
};

export default School;
