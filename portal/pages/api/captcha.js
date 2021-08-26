import axios from "axios";
import { getSession, session } from "next-auth/client";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const response = await axios.get(`${process.env.CAPTCHA_URL}/verify`, {
      params: req.body,
    });
    const responseObject = response.data;
    if (responseObject) {
      res.status(200).json({ errors: null, success: responseObject });
    }
  }
  if (req.method === "GET") {
    try {
      const response = await axios.get(`${process.env.CAPTCHA_URL}/`);
      if (response.data) {
        res.setHeader("token", response.headers.token);
        res.status(200).json(response.data);
      } else {
        res
          .status(200)
          .json({ errors: "Failed to get captcha", success: null });
      }
      return true;
    } catch (err) {
      res
        .status(500)
        .json({ errors: "Captcha service unavailable", success: null , err:err});
      return true;
    }
  }
};

export default handler;
