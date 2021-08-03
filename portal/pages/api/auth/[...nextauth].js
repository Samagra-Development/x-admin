import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";
const CryptoJS = require('crypto-js');

const fusionAuthLogin = async (path, credentials) => {
  const parsedBase64Key = CryptoJS.enc.Base64.parse(process.env.NEXT_PUBLIC_BASE64_KEY);
  var bytes  = CryptoJS.AES.decrypt(credentials.loginId, parsedBase64Key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  var decryptedLoginId = bytes.toString(CryptoJS.enc.Utf8);

  var bytes1 = CryptoJS.AES.decrypt(credentials.password, parsedBase64Key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  var decryptedPassword = bytes1.toString(CryptoJS.enc.Utf8);
  
  const options = {
    headers: { Authorization: process.env.FUSIONAUTH_API_KEY },
  };
  const response = await axios.post(
    `${path}/api/login`,
    {
      loginId: decryptedLoginId,
      password: decryptedPassword,
      applicationId: credentials.applicationId,
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
      }
      return token;
    },
    async session(session, token) {
      session.jwt = token.jwt;
      session.role = token.role;
      session.fullName = token.fullName;
      session.username = token.username;
      session.applicationId = token.applicationId;
      return session;
    },
  },
});
