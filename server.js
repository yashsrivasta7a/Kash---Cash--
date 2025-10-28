import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();
app.use(express.json());

const PHONE_NUMBER_ID = process.env.Phone_number_ID;
const VERSION = process.env.version;
const WHATSAPP_USER_PHONE_NUMBER = process.env.WHATSAPP_USER_PHONE_NUMBER;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

function get_text(recipient, text) {
  return {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipient,
    type: "text",
    text: {
      preview_url: false,
      body: text,
    },
  };
}

async function send(data) {
  try {
    const url = `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`;

    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(url, data, { headers });

    console.log("✅ Message sent successfully!");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error sending message:", error.response?.data || error.message);
  }
}

app.post("/send", async (req, res) => {
  const { to, message } = req.body;

  const recipient = to || WHATSAPP_USER_PHONE_NUMBER;
  const text = message || "Hello Test message";

  const data = get_text(recipient, text);
  const result = await send(data);

  res.json({
    success: true,
    sent_to: recipient,
    message: text,
    response: result,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
