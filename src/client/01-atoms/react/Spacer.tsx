type Props = {
  size: number;
};

export const Spacer = ({size}: Props) => {
  return (
    <div
      style={{
        height: `${size}rem`,
        width: `${size}rem`,
      }}
    />
  );
};
