import crypto from "crypto";

function generateSecureToken(length = 48) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer.toString("hex"));
      }
    });
  });
}

// Usage
generateSecureToken()
  .then((token) => {
    console.log("Generated secure token:", token);
  })
  .catch((err) => {
    console.error("Error generating token:", err);
  });
