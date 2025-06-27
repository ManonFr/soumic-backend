// Run this script with a password as argument to generate a bcrypt hash
// Usage: node src/generateHash.js myPassword

const bcrypt = require("bcrypt");

const passwordToHash = process.argv[2];

if (!passwordToHash) {
  // Exit silently with error code if no password is provided
  process.exit(1);
}

bcrypt
  .hash(passwordToHash, 10)
  .then((hash) => {
    // Output the result (can be copied manually)
    process.stdout.write(`${hash}/n`);
  })
  .catch(() => {
    // Exit silently on error
    process.exit(1);
  });
