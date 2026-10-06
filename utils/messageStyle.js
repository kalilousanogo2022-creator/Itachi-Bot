import fs from "fs"
import stylizedChar from "./fancy.js"

export default function stylizedCardMessage(text) {
  return {
    text: stylizedChar(text),
    contextInfo: {
      externalAdReply: {
        title: "ITACHI",
        body: "𓆩 𝐔𝐂𝐇𝐈𝐇𝐀-𝐈𝐓𝐀𝐂𝐇𝐈 𓆪",
        thumbnail: fs.readFileSync("./database/ITACHI.jpg"),
        sourceUrl: "https://whatsapp.com",
        mediaType: 1,
        renderLargerThumbnail: false
      }
    }
  }
}