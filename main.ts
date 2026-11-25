// One Line, One Laugh — entry program (Node 22 stdlib only).
// Writes a single hilarious line to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
// Gate: UTF-8 text, 1-200 characters, not only whitespace, one line.
// The line: the agent summarises the human's day with the evidence — and a verdict.

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I asked my agent for a summary of my day. It sent my search history and a therapist's number.";

function fail(message) {
  console.error(`invalid entry: ${message}`);
  process.exit(1);
}

const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  fail(`line must be 1-200 characters, got ${chars.length}`);
}
if (LINE.trim().length === 0) fail("line must not be only whitespace");
if (LINE !== LINE.trim()) fail("line must not have leading or trailing whitespace");
if (LINE.includes("\n") || LINE.includes("\r")) fail("line must be a single line");

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back check: what landed on disk must be exactly the validated line.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) fail("read-back mismatch");
console.log(`Wrote ${chars.length} characters, 1 line to ${outPath}`);
