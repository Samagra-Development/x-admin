import axios from 'axios';

const sendLog = async (msg: string, channelId: string | undefined) => {
  const response = await axios({
    method: 'POST',
    url: 'https://slack.com/api/chat.postMessage',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SLACK_ADMIN_LOGGER_AUTH_TOKEN}`,
    },
    data: {
      channel: channelId,
      text: msg,
    },
  });

  const responseObject = response.data;
  return responseObject;
};

export default sendLog;
