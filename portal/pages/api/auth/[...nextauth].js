import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";
import fs from "fs";
import pathFile from "path";
import jwt from "jsonwebtoken";
const CryptoJS = require("crypto-js");

const verifyOrCreate = async (token, refreshToken) => {
  const cert = fs.readFileSync(pathFile.resolve("", "./jwt.pem"));
  let verify = false;
  return jwt.verify(
    token,
    cert,
    { algorithms: ["RS256"] },
    async function (err, payload) {
      if (err) {
        try {
          const responce = await axios.get(
            `${process.env.FUSIONAUTH_DOMAIN}/api/jwt/issue`,
            {
              headers: { Authorization: "Bearer " + token },
              params: {
                applicationId: process.env.NEXT_PUBLIC_FUSIONAUTH_STATE_APP_ID,
                refreshToken: refreshToken,
              },
            }
          );
          if (responce.data) {
            return responce.data.token;
          }
        } catch (err) {
          throw err;
        }
      } else {
        return token;
      }
      // if token alg != RS256,  err == invalid signature
    }
  );
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
          if (response.data) {
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
  cookies: {    
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    }    
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
        token.refreshToken = profile.refreshToken;
        token.tokens = profile.user.data.tokens;
      }
      return token;
    },
    async session(session, token) {
      session.jwt = await verifyOrCreate(token.jwt, token.refreshToken);
      session.refreshToken = token.refreshToken;
      session.role = token.role;
      session.fullName = token.fullName;
      session.username = token.username;
      session.applicationId = token.applicationId;
      session.tokens = token.tokens;
      return session;
    },
  },
});
