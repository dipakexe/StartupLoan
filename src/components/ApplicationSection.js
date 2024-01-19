import React from "react";

const ApplicationSection = ({ children }) => {
  return (
    <section
      style={{
        width: "100%",
        display: "grid",
        justifyContent: "center",
        padding: "3em 0px",
      }}
    >
      {children}
    </section>
  );
};

export default ApplicationSection;
