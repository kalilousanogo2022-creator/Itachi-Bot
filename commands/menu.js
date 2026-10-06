import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";
import configs from "../utils/configmanager.js";
import { getDevice } from "baileys";
import stylizedChar from "../utils/fancy.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function formatUptime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  return `${h}h ${m}m ${s}s`;
}

function getCategoryIcon(category) {
  const c = category.toLowerCase();

  if (c === "utils") return "⚙️";
  if (c === "media") return "📸";
  if (c === "group") return "👥";
  if (c === "bug") return "🐞";
  if (c === "tags") return "🏷️";
  if (c === "moderation") return "😶‍🌫️";
  if (c === "owner") return "✨";
  if (c === "creator")