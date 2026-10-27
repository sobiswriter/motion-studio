import { FlatShot } from "../flat-shot";
import type { ShotProps } from "../flat-shot";

// Montage images are cels on an ordinary artwork layer, using the same cut semantics.
export const MontageShot = (props: ShotProps) => <FlatShot {...props} />;
