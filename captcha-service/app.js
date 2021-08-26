/**
 * Captcha PNG img generator
 * @Author: Chakshu Gautam
 * @Email: chaks.gautam@gmail.com
 * @Version: 2.0
 * @Date: 2020-08-18
 * @license http://www.opensource.org/licenses/bsd-license.php BSD License
 */
const { v1: uuid } = require("uuid");

const captchapng = require("./captchapng");
const cors = require("cors");

const express = require("express");
const app = express();
const port = process.env.PORT || 9000;
const host = process.env.PORT || "0.0.0.0";

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

db.defaults({ captchas: [] }).write();

app.listen(port, host, () => console.log(`listening on port: ${port}`));

app.get("/", (request, response) => {
  const captchaParsed = Math.random().toString(36).substr(2,6).toUpperCase();
  var p = new captchapng(120, 30, captchaParsed); // width,height,numeric captcha
  p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
  p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

  var img = p.getBase64();
  // var imgbase64 = new Buffer(img,'base64');

  const token = uuid();
  db.get("captchas")
    .push({ token, captchaParsed, timestamp: Math.floor(Date.now() / 1000) })
    .write();
  console.log({ token });

  response.header({
    "Content-Type": "application/json",
    token,
    "access-control-expose-headers": "token",
  });

  // Request token
  // response.send(imgbase64);
  response.json({ blob: img });
});

const removeOldCaptchas = () => {
  // Delete all captchas that are more than 600 seconds old.
  const now = Math.floor(Date.now() / 1000);
  const allData = db.get("captchas").value();

  allData
    .filter((captcha) => now - captcha.timestamp > 600)
    .forEach((filteredCaptcha) => {
      db.get("captchas").remove({ token: filteredCaptcha.token }).write();
    });
};

app.get("/verify", (request, response) => {
  removeOldCaptchas();

  try {
    const userResponse = request.query.captcha;
    const token = request.query.token;
    const captcha = db.get("captchas").find({ token: token }).value();

    if (!captcha) {
      response.status(400).send({ status: "Token Not Found" });
      return;
    }

    deleteUsedCaptcha(token);
    if (userResponse === (captcha && captcha.captchaParsed)) {
      response.status(200).send({ status: "Success" });
    } else {
      response.status(400).send({ status: "Code Incorrect" });
    }
  } catch (err) {
    console.log({ err });
    response.status(500).send({ status: "Internal Server Error" });
  }
});
function deleteUsedCaptcha(token) {
  db.get("captchas").remove({ token: token }).write();
}
