import { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import controls from "./form.config";
import styles from "../../styles/Login.module.css";
import axios from "axios";
import Image from "next/image";
const CryptoJS = require('crypto-js');

export default function Login(props) {
  const { persona } = props;
  const [input, setInput] = useState({});
  const [captcha, setCaptcha] = useState(null);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [captchaImg, setCaptchaImg] = useState(null);

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
        console.log(err)
        addToast(err.response?.data?.errors || err.message, {
          appearance: "error",
        });
      });
  }, [refreshToken]);

  const { addToast } = useToasts();

  const signUserIn = async (e) => {
    e.preventDefault();
    let rightNow = new Date();

    try{  
      const result = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_CAPTCHA_URL}`,
        data: {
          captcha: captcha,
          token: captchaToken,
        },
      });
    }  catch (err) {
      addToast('Incorect Captcha/ Captcha कोड गलत है!', { appearance: "error" });
      setRefreshToken(rightNow.toISOString());
      return false;
    }

    const parsedBase64Key = CryptoJS.enc.Base64.parse(process.env.NEXT_PUBLIC_BASE64_KEY);
    let encryptedUsername = CryptoJS.AES.encrypt(input.username, parsedBase64Key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    encryptedUsername = encryptedUsername.toString();      
    const encryptedPassword = CryptoJS.AES.encrypt(input.password, parsedBase64Key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString();

    const { error, url } = await signIn("fusionauth", {
      loginId: encryptedUsername,
      password: encryptedPassword,
      applicationId: persona.applicationId,
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
      setRefreshToken(rightNow.toISOString());
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
            key={control.name}
            type={control.type}
            name={control.name}
            autoComplete={control.autocomplete}
            required={control.required}
            placeholder={control.placeholder}
            pattern={control.pattern}
            onChange={handleInput}
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
          placeholder={"captcha"}
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
