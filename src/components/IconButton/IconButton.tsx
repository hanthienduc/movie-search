import { ReactNode } from "react";
import "./IconButton.scss";

type IconButtonProp = {
  Icon: any;
  isActive?: boolean;
  children?: ReactNode;
  onClick?: () => void;
};

export function IconButton({
  Icon,
  isActive,
  children,
  onClick,
}: IconButtonProp) {
  return (
    <>
      <button onClick={onClick} className={`btn icon-btn ${isActive ? "icon-btn-active" : ""}`}>
        <span>
          <Icon />
        </span>
        {children}
      </button>
    </>
  );
}
