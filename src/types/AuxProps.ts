import { ReactChild, ReactChildren, ReactNode } from "react";

export default interface AuxProps {
  children: ReactNode | ReactNode[];
  height?: string;
}