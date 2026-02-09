import makeWASocket, {
  useMultiFileAuthState
} from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";

export async function sendWhatsApp(message) {
  const { state, saveCreds } = await useMultiFileAuthState("./auth");

  const sock = makeWASocket({
    auth: state,
    browser: ["MarketAgent", "Chrome", "1.0"]
  });

  sock.ev.on("creds.update", saveCreds);

  await new Promise((resolve) => {
    sock.ev.on("connection.update", (update) => {
      const { connection, qr } = update;

      if (qr) {
        console.log("📱 Scan QR NOW (one time only):");
        qrcode.generate(qr, { small: true });
      }

      if (connection === "open") {
        console.log("✅ WhatsApp logged in successfully");
        resolve();
      }
    });
  });

  await sock.sendMessage("91xxxxxxxx@s.whatsapp.net", {
    text: message
  });

  console.log("📨 Message sent");
}