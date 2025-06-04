import "../styles/Badge.css";

import type {Difficulty} from "@models";

type Props = {
  text: string;
  variant: Difficulty;
  size: number;
};

export const Badge = ({text, variant, size}: Props) => {
  return (
    <span
      className={`badge ${variant === "master" && "master"}`}
      style={
        {
          "--badge-font-size": `${size}rem`,
          "--badge-padding": `${size * 0.226}rem ${size * 0.857}rem`,
          "--badge-background-color": `var(--${variant}-background)`,
        } as React.CSSProperties
      }>
      {text}
    </span>
  );
};
