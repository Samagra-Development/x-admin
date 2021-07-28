import axios from "axios";

const sendLog = async (msg) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}/log`,
      data: {
        msg: msg,
      },
    });
    if (response.data?.error) {
      return { error: response.data?.error, success: null };
    } else if (response.data?.success) {
      return { success: response.data?.success, error: null };
    }
  } catch (err) {
    return err;
  }
};

export default sendLog;
