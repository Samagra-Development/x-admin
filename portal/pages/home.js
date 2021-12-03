import dynamic from "next/dynamic";
import { useSession } from "next-auth/client";
import Login from "./login";

const Home = () => {
  const [session, loading] = useSession();
  if (loading) return null;

  if ((!loading && !session) || session?.jwt == undefined) {
    // signIn("fusionauth")
    return <Login />;
  }
  if (session) {
    return <h1>Log in success</h1>;
  }
};

export default Home;
