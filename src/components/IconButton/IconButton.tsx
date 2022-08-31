import { ReactNode } from "react";
import "./IconButton.scss";

type IconButtonProp = {
  Icon: any;
  isActive?: boolean;
  children?: ReactNode;
  callToggleFavorite: () => void;
};

export function IconButton({
  Icon,
  isActive,
  children,
  callToggleFavorite,
}: IconButtonProp) {
  return (
    <>
      <button onClick={callToggleFavorite} className={`btn icon-btn ${isActive ? "icon-btn-active" : ""}`}>
        <span>
          <Icon />
        </span>
        {children}
      </button>
    </>
  );
}
