import React from "react";
import "Form.css";

export default function Form(props) {
  const { className, ...otherProps } = props;
  return (
    <form className={["form", className].join("")} action="#" {...otherProps} />
  );
}
