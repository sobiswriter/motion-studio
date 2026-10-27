import { access, realpath } from "node:fs/promises";
import { resolve, relative, isAbsolute } from "node:path";
import sharp from "sharp";
import { projects } from "../src/projects";
import { validateProject } from "../src/engine/validation/project";
import type { MotionProject } from "../src/engine/types";

export async function validateAssets(
  project: MotionProject,
  publicRoot = resolve("public"),
) {
  const duration = validateProject(project);
  const root = await realpath(publicRoot);
  for (const asset of Object.values(project.assets)) {
    const path = resolve(root, asset.src);
    try {
      await access(path);
    } catch {
      throw new Error(`${project.id}: missing asset ${asset.id} at ${path}`);
    }
    const actualPath = await realpath(path);
    const rel = relative(root, actualPath);
    if (rel.startsWith("..") || isAbsolute(rel))
      throw new Error(`Asset escapes public/: ${asset.src}`);
    if (asset.kind === "image") {
      const meta = await sharp(path).metadata();
      if (meta.width !== asset.width || meta.height !== asset.height)
        throw new Error(
          `${asset.id}: source dimensions changed; manifest ${asset.width}x${asset.height}, actual ${meta.width}x${meta.height}`,
        );
      if (asset.alpha && !meta.hasAlpha)
        throw new Error(`${asset.id}: expected an alpha channel`);
    }
  }
  console.log(
    `${project.id}: ${duration} frames, ${project.width}x${project.height} @ ${project.fps}; all assets valid`,
  );
}

if (require.main === module)
  Promise.all(projects.map((project) => validateAssets(project))).catch(
    (e: unknown) => {
      console.error(e);
      process.exitCode = 1;
    },
  );
