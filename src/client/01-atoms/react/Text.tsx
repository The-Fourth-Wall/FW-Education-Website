import "../styles/Text.css";

type Props = {
  label: string;
  size: number;
  type: "primary" | "secondary" | "accent";
  color: string;
};

export const Text = ({label, size, type, color}: Props) => {
  return (
    <span
      className={`text ${type}`}
      style={
        {
          "--text-font-size": `${size}rem`,
          "--text-color": color,
        } as React.CSSProperties
      }>
      {label}
    </span>
  );
};
