import axios from "axios";
import { getSession, session } from "next-auth/client";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    if (req.method === "POST") {
      const { msg } = req.body;
      const response = await axios({
        method: "POST",
        url: "https://slack.com/api/chat.postMessage",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SLACK_ADMIN_LOGGER_AUTH_TOKEN}`,
        },
        data: {
          channel: process.env.NEXT_PUBLIC_SLACK_ADMIN_LOGS_CHANNEL_ID,
          text: msg,
        },
      });

      const responseObject = response.data;
      if (responseObject?.ok === true) {
        res.status(200).json({
          error: null,
          success: "Successfully logged.",
        });
      } else {
        res.status(200).json({
          error: `Error sending log - Provider error code ${responseObject.error}`,
          success: null,
        });
      }
    }
  } else res.status(401).json({ error: "Unauthorised access.", success: null });
};

export default handler;
