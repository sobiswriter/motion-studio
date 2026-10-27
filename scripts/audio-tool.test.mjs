import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

const launcher = fileURLToPath(new URL("./audio-tool.mjs", import.meta.url));
const run = (...args) =>
  spawnSync(process.execPath, [launcher, ...args], { encoding: "utf8" });

test("audio launcher forwards arguments to the installed tools", () => {
  for (const args of [
    ["hyperframes", "--help"],
    ["earshot", "--help"],
    ["real-sfx", "setup", "--help"],
  ]) {
    const result = run(...args);
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /usage:/i);
  }
});

test("audio launcher rejects unknown tools and script path traversal", () => {
  for (const args of [
    ["unknown"],
    ["real-sfx", "../common"],
    ["real-sfx", "missing_script"],
  ]) {
    const result = run(...args);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Usage:|Unknown Real SFX script/);
  }
});
