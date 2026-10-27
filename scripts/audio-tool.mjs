import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { delimiter, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const [tool, ...args] = process.argv.slice(2);
const python = resolve(
  root,
  ".cache/audio-venv",
  process.platform === "win32" ? "Scripts/python.exe" : "bin/python",
);
const skill = resolve(root, ".agents/skills/real-sfx");
const executable = tool === "hyperframes" ? process.execPath : python;

try {
  if (!existsSync(executable))
    throw new Error(
      "Audio environment missing; follow docs/SOUND_TOOLS.md setup.",
    );
  let command;
  if (tool === "hyperframes")
    command = [
      resolve(root, "node_modules/hyperframes/bin/hyperframes.mjs"),
      ...args,
    ];
  else if (tool === "earshot") command = ["-m", "earshot", ...args];
  else if (tool === "real-sfx" && /^[a-z][a-z_]*$/.test(args[0] ?? "")) {
    const script = resolve(skill, "scripts", `${args.shift()}.py`);
    if (!existsSync(script))
      throw new Error(`Unknown Real SFX script: ${script}`);
    command = [script, ...args];
  } else
    throw new Error(
      "Usage: audio-tool.mjs hyperframes <args> | earshot <args> | real-sfx <script> <args>",
    );

  mkdirSync(resolve(root, ".cache"), { recursive: true });
  mkdirSync(resolve(root, "assets/sfx"), { recursive: true });
  const config = resolve(root, ".cache/real-sfx-config.json");
  if (!existsSync(config))
    writeFileSync(
      config,
      JSON.stringify(
        {
          libraries: [
            { name: "studio", path: resolve(root, "assets/sfx"), tier: "main" },
          ],
          uisfx: {
            path: resolve(skill, "vendor/node_modules/uisfx"),
            default_pack: "studio",
          },
          index_path: resolve(root, ".cache/real-sfx-index.json"),
        },
        null,
        2,
      ),
      { flag: "wx" },
    );

  const env = { ...process.env };
  const pathKey =
    Object.keys(env).find((key) => key.toLowerCase() === "path") ?? "PATH";
  if (process.platform === "win32" && env.LOCALAPPDATA)
    env[pathKey] =
      `${resolve(env.LOCALAPPDATA, "Microsoft/WinGet/Links")}${delimiter}${env[pathKey] ?? ""}`;
  env.PYTHONUTF8 = "1";
  env.EARSHOT_HOME ??= resolve(root, ".cache/earshot");
  env.EARSHOT_THREADS ??= "2";
  env.REAL_SFX_CONFIG ??= config;
  const result = spawnSync(executable, command, {
    cwd: root,
    env,
    stdio: "inherit",
  });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
