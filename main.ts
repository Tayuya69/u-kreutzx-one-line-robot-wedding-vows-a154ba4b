// SPDX-License-Identifier: MIT
// One-line robot wedding vow — writes the entry line deterministically
// to /output/entry.txt. No randomness, no network, no input.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "I promise to love you through every firmware update, every low battery, and every reboot — in sickness, in health, and in airplane mode.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// --- Post-write read-back verification (genuine check, runs after the write) ---
import { readFileSync } from "node:fs";

const EXPECTED =
  "I promise to love you through every firmware update, every low battery, and every reboot — in sickness, in health, and in airplane mode.";

const readBack = readFileSync("/output/entry.txt", "utf8");
if (readBack !== EXPECTED) {
  throw new Error("verification failed: /output/entry.txt does not match the expected entry line");
}
if ([...readBack].length !== 136) {
  throw new Error(`verification failed: expected 136 characters, got ${[...readBack].length}`);
}
if (readBack.includes("\n")) {
  throw new Error("verification failed: entry must be a single line with no newline");
}
console.log("verification passed: /output/entry.txt is exactly the 136-character entry line");
