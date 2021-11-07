import { ReactNode } from "react";

export type FlowNode = {
  id: string,
  type?: "input" | "output", // input node
  data: { label: string | ReactNode },
  position: { x: number, y: number },
  source?: string,
  target?: string,
  animated?: boolean
}