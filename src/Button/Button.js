import React from "react";
import "./Button.css";

export default function NavButton(props) {
  const { tag, className, childrenm, ...otherProps } = props;

  return React.createElement(
    props.tag,
    {
      className: ["NavButton", props.className].join(" "),
      ...otherProps
    },
    props.children
  );
}

NavButton.defaultProps = {
  tag: "a"
};
