import React, { Dispatch, SetStateAction } from "react";
import Button from "../Button/Button";
import "./Menu.scss";

type MenuConfig = {
  label: string;
  icon: string;
  handleClick: () => void;
};

function Menu({
  config,
  toggleCollapsed,
  setToggleCollapsed,
}: {
  config: MenuConfig[];
  toggleCollapsed: boolean;
  setToggleCollapsed: Dispatch<SetStateAction<boolean>>;
}) {
  const getElementsFromConfig = () => {
    return config.map(({ label, icon, handleClick }) => {
      return (
        <div key={label}>
          <Button
            label={label}
            title={label}
            iconName={icon}
            onClick={() => {
              handleClick();
              setToggleCollapsed();
            }}
            active={true}
          />
        </div>
      );
    });
  };
  return (
    <div className={`menu-popup ${!toggleCollapsed ? "hidden" : ""}`}>
      {getElementsFromConfig()}
    </div>
  );
}

export default Menu;
