import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import styles from "../../styles/Track.module.css";
import controls from "./track.config";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import config from "@/components/config";

const Track = () => {
  const [trackingKey, setTrackingKey] = useState(null);
  const [captcha, setCaptcha] = useState(null);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [captchaImg, setCaptchaImg] = useState(null);
  const [trackingKeyValid, setTrackingKeyValid] = useState(false);
  const [trackingResponse, setTrackingResponse] = useState(null);
  const [deliveryStatus, setDeliveryStatus] = useState(false);
  const [displayCertificate, setDisplayCertificate] = useState(false);
  const captchaRef = useRef(null);

  useEffect(() => {
    const obj = config.statusChoices.find(
      (elem) => elem.id === trackingResponse?.delivery_status
    );
    if (obj) {
      setDeliveryStatus(obj);
      if (["received-state", "delivered-child"].includes(obj.id))
        setDisplayCertificate(true);
      else setDisplayCertificate(false);
    }
  }, [trackingResponse]);

  const handleInput = (e) => {
    setTrackingKey(e.target.value);
    setTrackingKeyValid(e.target.value != "" && captcha && captcha != "");
  };

  const handleInputCaptcha = (e) => {
    setCaptcha(e.target.value);
    setTrackingKeyValid(
      e.target.value != "" && trackingKey && trackingKey != ""
    );
  };

  const { addToast } = useToasts();

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
        addToast(err.response?.data?.errors || err.message, {
          appearance: "error",
        });
      });
  }, [refreshToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/track`,
        {
          id: trackingKey,
          captcha: captcha,
          captchaToken: captchaToken,
        }
      );
      const { error, success } = response.data;

      if (success) setTrackingResponse(success.data);

      if (error) {
        addToast(error, { appearance: "error" });
        var rightNow = new Date();
        setRefreshToken(rightNow.toISOString());
      }
    } catch (err) {
      addToast(JSON.stringify(err), { appearance: "error" });
    }
  };

  const fetchCertificate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/certificate`,
        {
          name: trackingResponse.name,
          trackingKey: trackingKey,
          udise: trackingResponse.recipient_school?.udise,
        }
      );
      const { error, success } = response.data;
      if (error) {
        addToast(error, { appearance: "error" });
      }
      if (success) {
        const pdfData = success.base64String;
        const byteCharacters = atob(pdfData);
        let byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const file = new Blob([byteArray], { type: "application/pdf;base64" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      }
    } catch (err) {
      addToast(err.message, { appearance: "error" });
    }
  };

  return (
    <>
      <h2 className="text-center">Track &#47; ट्रैक</h2>
      <div className={`${styles.grid}`}>
        <div className={`card`}>
          <h2 className="text-center">
            Enter tracking ID &#47; ट्रैकिंग आईडी भरें
          </h2>
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
            <div className="text-center">
              <Image
                src={"data:image/png;base64, " + captchaImg}
                width={100}
                height={20}
                alt="captcha"
              />
              <input
                type={"text"}
                name={"captcha"}
                autoComplete={"false"}
                required={"required"}
                placeholder={"captcha"}
                onChange={handleInputCaptcha}
              />
            </div>
            <button
              autoComplete="off"
              className={styles.button}
              disabled={!trackingKeyValid}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
        <div
          className={`card ${styles["blurrable-card"]} ${
            trackingResponse ? "" : styles.blur
          }`}
        >
          <h2 className="text-center">Status &#47; स्थिति</h2>
          <table className={styles.table}>
            <tbody className={styles.tableBody}>
              <tr className={`${styles.tableRow} ${styles.tableHeader}`}>
                <th>Donor Mobile No.</th>
                <th className={"text-center"}>Status</th>
              </tr>

              <tr className={styles.tableRow}>
                {trackingResponse ? (
                  <>
                    <td className={styles.tableCell}>
                      {trackingResponse.phone_number}
                    </td>
                    <td className={`${styles.tableCell}`}>
                      <span
                        className={`material-icons ${
                          styles[deliveryStatus.style]
                        } ${styles.icon}`}
                      >
                        {deliveryStatus.icon}
                      </span>
                      {deliveryStatus.name}
                    </td>
                  </>
                ) : (
                  <></>
                )}
              </tr>
              <tr>
                <td colSpan="2" className={styles.certificate}>
                  {displayCertificate && (
                    <button
                      className={styles.button}
                      autoComplete="off"
                      onClick={fetchCertificate}
                    >
                      <span
                        className={`material-icons ${styles.certificateIcon}`}
                      >
                        military_tech
                      </span>
                      Certificate
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Track;
