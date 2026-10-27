import type { ReactNode } from "react";
import type { Transition } from "../types";
import { MaskReveal } from "../compositing/MaskReveal";

export const TransitionLayer = (props: {
  transition?: Transition;
  children: ReactNode;
}) => (
  <MaskReveal
    mask={
      props.transition
        ? {
            shape: props.transition.kind,
            from: 0,
            duration: props.transition.duration,
          }
        : undefined
    }
  >
    {props.children}
  </MaskReveal>
);
