import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();

const PHONE_NUMBER_ID = process.env.Phone_number_ID;
const VERSION = process.env.version;
const WHATSAPP_USER_PHONE_NUMBER = process.env.WHATSAPP_USER_PHONE_NUMBER;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN; 

async function send() {
  try {
    const url = `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`;

    const data = {
      messaging_product: "whatsapp",
      to: WHATSAPP_USER_PHONE_NUMBER,
      type: "template",
      template: {
        name: "hello_world",
        language: { code: "en_US" },
      },
    };

    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(url, data, { headers });

    console.log(" Message sent successfully!");
    console.log(response.data);
  } catch (error) {
    console.error(
      "Error sending message:",
      error.response?.data || error.message
    );
  }
}

send();
console.log("🚀 chalgya");
