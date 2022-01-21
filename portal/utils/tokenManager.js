const FingerprintJS = import("@fingerprintjs/fingerprintjs");
import * as localForage from "localforage";
import axios from "axios";

const fusionAuthLogout = async (fingerprint) => {
  const response = await axios
    .post(`${process.env.NEXT_PUBLIC_FUSIONAUTH_SCHOOL_APP_ID}/api/logout`, {
      headers: { fpt: fingerprint },
    })
    .catch((e) => {
      return "Not implemented";
    });
  return response;
};

export const getOrCreateFingerprint = async (window) => {
  if (window) {
    const fingerprint = await localForage.getItem("fingerprint");
    // console.log({ fingerprint });
    if (fingerprint) {
      console.info("Fingerprint already exists");
      return fingerprint;
    } else {
      return await FingerprintJS.then((FingerprintJS) => FingerprintJS.load())
        .then((fp) => fp.get())
        .then(async (result) => {
          await localForage.setItem("fingerprint", result.visitorId);
          return result.visitorId;
        });
    }
  }
};

export const verifyFingerprint = async (session, signOut) => {
  if (window) {
    const fingerprint = await localForage.getItem("fingerprint");
    // console.log("Inside verifyFingerprint", fingerprint);
    if (fingerprint && session.tokens.includes(fingerprint)) {
      console.log("Fingerprint Verified");
      return true;
    } else {
      console.error("No existing fingerprint - logging user out");
      deleteFingerprint(window);
      signOut();
      return false;
    }
  }
};

export const deleteFingerprint = async (window) => {
  const fingerprint = await localForage.getItem("fingerprint");
  await localForage.removeItem("fingerprint");
  await fusionAuthLogout(fingerprint);
};
