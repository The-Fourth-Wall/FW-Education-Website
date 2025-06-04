type Props = {
  href: string;
  accessibility: string;
  children: React.ReactNode;
};

export const LinkButton = ({href, accessibility, children}: Props) => {
  return (
    <a
      href={href}
      draggable="false"
      aria-label={accessibility}
      onClick={event => {
        if (history.state?.url.includes("/course") && href === "/") {
          event.preventDefault();
          event.stopPropagation();
          history.back();
        }
      }}>
      {children}
    </a>
  );
};
