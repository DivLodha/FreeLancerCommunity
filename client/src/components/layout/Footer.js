import React from "react";

export default () => {
  return (
    <footer
      className="bg-dark text-white mt-5 p-4 text-center"
      style={{
        position: "fixed",
        width: "100%",
        textAlign: "center",
        bottom: "0px"
      }}
    >
      Copyright &copy; {new Date().getFullYear()} FreeLancerCommunity
    </footer>
  );
};
