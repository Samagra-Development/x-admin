import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
const CryptoJS = require("crypto-js");

const verifyRefreshToken = (token) => {
  const cert = fs.readFileSync(path.resolve("", "./jwt.pem"));
  jwt.verify(token, cert, { algorithms: ["RS256"] }, function (err, payload) {
    console.log(payload);
    // if token alg != RS256,  err == invalid signature
  });
};

const fusionAuthLogin = async (path, credentials) => {
  const options = {
    headers: { Authorization: process.env.FUSIONAUTH_API_KEY },
  };

  const response = await axios.post(
    `${path}/api/login`,
    {
      loginId: credentials.loginId,
      password: credentials.password,
      applicationId: credentials.applicationId,
    },
    {
      headers: { fpt: credentials.fpt },
    },
    options
  );
  return response;
};

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      id: "fusionauth",
      name: "FusionAuth Credentials Login",
      async authorize(credentials, req) {
        let response = null;
        try {
          response = await fusionAuthLogin(
            process.env.FUSIONAUTH_DOMAIN,
            credentials
          );
          verifyRefreshToken(response.data.token);
          if (response) {
            return response.data;
          }
        } catch (err) {
          throw err;
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    redirect(url, baseUrl) {
      return url;
    },
    async jwt(token, user, account, profile, isNewUser) {
      // Add access_token to the token right after signin
      if (account) {
        token.username = profile.user?.username;
        token.fullName = profile.user?.fullName;
        token.role = profile.user?.registrations?.[0].roles?.[0];
        token.applicationId = profile.user?.registrations?.[0].applicationId;
        token.jwt = profile.token;
        token.tokens = profile.user.data.tokens;
      }
      return token;
    },
    async session(session, token) {
      session.jwt = token.jwt;
      session.role = token.role;
      session.fullName = token.fullName;
      session.username = token.username;
      session.applicationId = token.applicationId;
      session.tokens = token.tokens;
      return session;
    },
  },
});
