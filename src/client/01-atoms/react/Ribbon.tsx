import "../styles/Ribbon.css";

type Props = {
  text: string;
  color: string;
};

export const Ribbon = ({text, color}: Props) => {
  return (
    <div
      className="ribbon"
      style={{"--ribbon-color": color} as React.CSSProperties}>
      <span className="ribbon-text">{text}</span>
    </div>
  );
};
