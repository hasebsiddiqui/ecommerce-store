import React from "react";
import Menu from "./Menu";
import "../styles.css";

//title = 'Title', that's how we can set default value
const Layout = ({
  title = "Title",
  className,
  description = "Description",
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="jumbotron">
        <h2>{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children} </div>
    </div>
  );
};

export default Layout;
