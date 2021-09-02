import axios from "axios";
import { getSession, session } from "next-auth/client";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    if (req.method === "POST") {
      const response = await axios({
        method: "POST",
        url: process.env.HASURA_URL,
        headers: req.headers,
        data: req.body,
      });

      const responseObject = response.data;
      if (responseObject) {
        console.log("Error in graphQl",responseObject)
        res.status(200).json(responseObject);
      }
    }
  } else {
    // console.log("Error in graphQl")
    res.status(401).json({ error: "Unauthorised access.", success: null });}
};

export default handler;
