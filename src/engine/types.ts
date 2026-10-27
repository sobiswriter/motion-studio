export type Keyframe<T> = {
  frame: number;
  value: T;
  easing?: "linear" | "smooth";
};
export type Transform2D = {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
};
export type Camera2DState = {
  x: number;
  y: number;
  zoom: number;
  pivotX: number;
  pivotY: number;
};
export type Camera3DState = {
  x: number;
  y: number;
  z: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  zoom: number;
};
export type Asset = {
  id: string;
  src: string;
  kind: "image" | "audio" | "video";
  width?: number;
  height?: number;
  alpha?: boolean;
};
export type AssetManifest = Record<string, Asset>;
export type PoseCue = { frame: number; assetId: string };
export type GeometricMask = {
  shape: "wipe-left" | "circle";
  from: number;
  duration: number;
};
export type ArtworkLayer = {
  id: string;
  assetId: string;
  type:
    | "background"
    | "environment"
    | "character"
    | "foreground"
    | "overlay"
    | "video";
  x: number;
  y: number;
  width: number;
  height: number;
  scale?: number;
  rotation?: number;
  opacity?: number;
  anchor?: [number, number];
  depth?: number;
  depthMotion?: Keyframe<{ z: number }>[];
  rotation3D?: Keyframe<{ x: number; y: number; z: number }>[];
  parallax?: number;
  cameraFollow?: boolean;
  motion?: Keyframe<Transform2D>[];
  cels?: PoseCue[];
  mask?: { assetId: string } | GeometricMask;
  cropSafe?: { inset: number };
};
export type Graphic = {
  id: string;
  kind: "text" | "rect" | "ellipse" | "path";
  from: number;
  duration: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
  color: string;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  path?: string;
  strokeWidth?: number;
  motion?: Keyframe<Transform2D>[];
  reveal?: GeometricMask;
};
export type Transition = { kind: "wipe-left" | "circle"; duration: number };
type ShotBase = {
  id: string;
  startFrame: number;
  duration: number;
  layers: ArtworkLayer[];
  graphics?: Graphic[];
  transition?: Transition;
  audioCueRefs?: string[];
  template?: "title" | "montage";
};
export type ShotDefinition = ShotBase &
  (
    | { mode: "flat-2d" | "multiplane-2d"; camera: Keyframe<Camera2DState>[] }
    | {
        mode: "image-plane-3d";
        camera: Keyframe<Camera3DState>[];
        projection?: "perspective" | "orthographic";
        fov?: number;
      }
  );
export type AudioCueMap = Record<
  string,
  {
    frame: number;
    label: string;
    analysis?: { rms?: number };
    sound?: {
      assetId: string;
      duration: number;
      volumeDb: number;
      trimBefore?: number;
    };
  }
>;
export type MotionProject = {
  id: string;
  title: string;
  width: number;
  height: number;
  fps: number;
  backgroundColor: string;
  assets: AssetManifest;
  shots: ShotDefinition[];
  cues?: AudioCueMap;
  audio?: { src: string; offsetFrames?: number };
};
