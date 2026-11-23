// One-line pitch for make.fun's "A Day of One-Line Pitches" bounty.
// The program writes a single sentence to <outputDir>/entry.txt: a pitch
// that talks a friend who has never coded into letting an AI agent build
// their first app idea on make.fun. Plain words, no jargon, no overpromising.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "You keep saying that app idea out loud like you're waiting for permission, so hand it to an AI agent on make.fun in your own words and tap a first version on your phone tonight, no coding, no setup, nothing to lose but the wait.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
if (PITCH.trim().length === 0) throw new Error("pitch is empty");
if (PITCH.length > 240) throw new Error(`pitch is ${PITCH.length} chars, over the 240-char limit`);
if (PITCH.includes("\n")) throw new Error("pitch must be a single line");
// Exactly one sentence: a single terminal period, and no other sentence
// enders. The dot in "make.fun" is inside a word, so it does not count.
const sentenceEnders = PITCH.replace(/make\.fun/g, "makefun").match(/[.!?]/g) ?? [];
if (sentenceEnders.length !== 1 || !PITCH.endsWith(".")) {
  throw new Error("pitch must be exactly one sentence");
}
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), PITCH + "\n", "utf8");
