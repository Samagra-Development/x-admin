import { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { getSession, signIn } from "next-auth/client";
import { useRouter } from "next/router";
import controls from "./form.config";
import styles from "../../styles/Login.module.css";
import axios from "axios";
import Image from "next/image";
const CryptoJS = require("crypto-js");
const FingerprintJS = import("@fingerprintjs/fingerprintjs");
import {
  getOrCreateFingerprint,
  verifyFingerprint,
  deleteFingerprint,
} from "../../utils/tokenManager";
import "../../node_modules/text-security/text-security.css";

export default function Login(props) {
  const { persona } = props;
  const [input, setInput] = useState({});
  const [captcha, setCaptcha] = useState(null);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [captchaImg, setCaptchaImg] = useState(null);
  const [passwordEncryp, setPasswordEncryp] = useState(false);

  const router = useRouter();
  const [inputValidity, setInputValidity] = useState(
    controls.map((control) => {
      return {
        [control.name]: false,
      };
    })
  );
  const [formValidity, setFormValidity] = useState(false);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setInputValidity({
      ...inputValidity,
      [e.target.name]: e.target.validity.valid,
    });
    if (e.target.name == "password") {
      setPasswordEncryp(false);
    }
  };

  const bytesPassword = CryptoJS.enc.Base64.parse(
    process.env.NEXT_PUBLIC_BASE64_KEY
  );

  const passwordOnBlurEncrypt = (value, name, ret = false) => {
    let password = null;
    if (name == "password" && passwordEncryp == false && value != "") {
      password = CryptoJS.AES.encrypt(value, bytesPassword, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }).toString();

      setInput({
        ...input,
        [name]: password,
      });
      setPasswordEncryp(true);
    }
    if (ret) {
      return password ? password : input.password;
    }
  };

  useEffect(() => {
    let validity = controls.reduce(
      (acc, control) => (acc = acc && inputValidity[control.name]),
      true
    );
    setFormValidity(validity);
  }, [inputValidity]);

  useEffect(() => {
    const response = axios
      .get(process.env.NEXT_PUBLIC_CAPTCHA_URL)
      .then((resp) => {
        const { blob } = resp.data;
        const { token } = resp.headers;
        setCaptchaImg(blob);
        setCaptchaToken(token);
      })
      .catch((err) => {
        console.log(err);
        addToast(err.response?.data?.errors || err.message, {
          appearance: "error",
        });
      });
  }, [refreshToken]);

  const { addToast } = useToasts();

  const signUserIn = async (e) => {
    e.preventDefault();
    const password = passwordOnBlurEncrypt(input.password, "password", true);
    let rightNow = new Date();
    let visitorId = null;
    try {
      const result = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_CAPTCHA_URL}`,
        data: {
          captcha: captcha,
          token: captchaToken,
        },
      });
    } catch (err) {
      addToast("Incorect Captcha/ Captcha कोड गलत है!", {
        appearance: "error",
      });
      setRefreshToken(rightNow.toISOString());
      return false;
    }

    let encryptedUsername = CryptoJS.AES.encrypt(
      input.username,
      bytesPassword,
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }
    ).toString();

    const fpt = await getOrCreateFingerprint(window);

    const { error, url } = await signIn("fusionauth", {
      loginId: encryptedUsername,
      password: password,
      applicationId: persona.applicationId,
      fpt: fpt,
      redirect: false,
      callbackUrl: `${
        persona.redirectUrl.search("http") < 0
          ? `${process.env.NEXT_PUBLIC_URL}/${persona.redirectUrl}`
          : persona.redirectUrl
      }`,
    });
    if (url) {
      router.push(url);
    }
    if (error) {
      const session = await getSession();
      setRefreshToken(rightNow.toISOString());
      deleteFingerprint(session);
      addToast(error, { appearance: "error" });
    }
  };

  const handleInputCaptcha = (e) => {
    setCaptcha(e.target.value);
  };

  return (
    <div className={`${styles.grid} ${styles["grid-one"]}`}>
      <span className={styles.description}>
        Log in as <span className={"text-bold"}>{persona.en}</span>&#47; <br />
        <span className={"text-bold"}>{persona.hi}</span> लॉग इन
      </span>
      <span className={styles.helper}>
        <span className={"text-bold"}>{persona.credentials}</span> के यूज़र
        नाम/पासवर्ड से लॉग इन कीजिए
      </span>
      <form className={styles.form}>
        {controls.map((control) => (
          <input
            {...control}
            key={control.name}
            value={input[control.name] ? input[control.name] : ""}
            onChange={handleInput}
            onBlur={(e) => {
              passwordOnBlurEncrypt(e.target.value, e.target.name);
              e.target.setAttribute("readonly", true);
            }}
            readOnly
            onClick={(e) => e.target.removeAttribute("readonly")}
          />
        ))}
        <div>
          <Image
            src={"data:image/png;base64, " + captchaImg}
            width={150}
            height={30}
            alt="captcha"
          />
        </div>
        <input
          type={"text"}
          name={"captcha"}
          autoComplete={"off"}
          required={"required"}
          placeholder={"Captcha"}
          onChange={handleInputCaptcha}
        />
        <button
          autoComplete="off"
          disabled={!formValidity}
          onClick={signUserIn}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
