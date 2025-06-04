import "../styles/Divider.css";

type Props = {
  faded?: boolean;
  size: number;
};

export const Divider = ({faded, size}: Props) => {
  return (
    <div
      className={`divider ${faded ? "faded" : "non-faded"}`}
      style={
        {
          "--divider-size": `${size}rem`,
        } as React.CSSProperties
      }></div>
  );
};
