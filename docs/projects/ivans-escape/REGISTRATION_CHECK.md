# Composition registration

Registered and resolved through Remotion's renderer and live Studio:

| Composition         | Dimensions | FPS | Frames | Duration |
| ------------------- | ---------- | --- | ------ | -------- |
| StudioPreflight     | 1920×1080  | 30  | 120    | 4s       |
| IvansEscape         | 1920×1080  | 30  | 1800   | 60s      |
| IvansEscapePilot    | 1920×1080  | 30  | 540    | 18s      |
| IvansEscapePacket01 | 1920×1080  | 30  | 180    | 6s       |

The full film, pilot and opening share the exact same production shots and assets. projectComponents in src/projects/components.ts adds project-specific authored SVG/montage overlays, while the standard ShotTimeline, templates, cameras, cels and audio remain shared. Projects without custom components retain the standard renderer.

The earlier static timing cards in project.ts are retained only as a planning fixture. No static board is presented as the active film.
