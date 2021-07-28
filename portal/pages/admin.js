import dynamic from "next/dynamic";
import { useSession } from "next-auth/client";
import Login from "./login";

const ReactAdmin = dynamic(() => import("../components/react-admin/app"), {
  ssr: false,
});

const Admin = () => {
  const [session, loading] = useSession();

  if (loading) return null;

  if (!loading && !session) {
    // signIn("fusionauth")
    return <Login />;
  }
  if (session) {
    // if(loading) return null;
    // if(!loading && !session) {
    //   signIn("fusionauth");
    //   return null;
    // }
    return <ReactAdmin />;
  }
};

export default Admin;
