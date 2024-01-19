import React from "react";
import logoImage from "../logo.png";

const Header = () => {
  return (
    <header
      style={{
        padding: "14px",
        display: "grid",
        placeItems: "center",
        width: "100%",
        backgroundColor: "rgb(236, 236, 236)",
      }}
    >
      <img
        src={logoImage}
        alt="StartupFund Bank Ltd. Logo"
        style={{
          maxWidth: "100%",
          maxHeight: "300px",
        }}
      />
    </header>
  );
};

export default Header;
