import crypto, {createHash, randomBytes, type CipherGCMTypes} from "crypto";

const ALGORITHM: CipherGCMTypes = "aes-256-gcm";
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

function getKey(): Buffer {
  const keyHex = process.env.SS_ENCRYPTION_KEY;
  if (!keyHex || keyHex.length !== 64) {
    throw new Error(
      "Invalid ENCRYPTION_KEY. Must be a 64-character hex string (32 bytes)."
    );
  }
  return Buffer.from(keyHex, "hex");
}

export function encrypt(text: string): string {
  if (text == null) {
    throw new Error("Input text to encrypt cannot be null or undefined.");
  }
  const key = getKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv, {
    authTagLength: AUTH_TAG_LENGTH,
  });

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag();

  return `${iv.toString("hex")}:${encrypted}:${authTag.toString("hex")}`;
}

export function decrypt(encryptedText: string): string {
  if (encryptedText == null) {
    throw new Error("Input text to decrypt cannot be null or undefined.");
  }
  const key = getKey();
  const parts = encryptedText.split(":");
  if (parts.length !== 3) {
    throw new Error(
      "Invalid encrypted text format. Expected iv:encrypted:authTag"
    );
  }

  const iv = Buffer.from(parts[0]!, "hex");
  const encryptedData = parts[1]!;
  const authTag = Buffer.from(parts[2]!, "hex");

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv, {
    authTagLength: AUTH_TAG_LENGTH,
  });
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

export function hashString(data: string) {
  return createHash("sha256").update(data).digest("hex");
}

export function generateSecureString(
  length: number,
  encoding: "base64" | "hex" | "base64url" = "base64url"
): string {
  let byteLength: number;
  if (encoding === "hex") {
    byteLength = Math.ceil(length / 2);
  } else {
    byteLength = Math.ceil((length * 3) / 4);
  }

  const buffer = randomBytes(byteLength);

  let randomString = "";
  if (encoding === "base64url") {
    randomString = buffer
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  } else {
    randomString = buffer.toString(encoding);
  }

  return randomString.slice(0, length);
}
