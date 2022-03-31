import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconWrapper = ({ iconName, rotation, children }) => {
  return (
    <div>
      <span
        style={{
          marginRight: "5px",
        }}
      >
        {children}
      </span>
      <FontAwesomeIcon rotation={rotation} icon={iconName} />
    </div>
  );
};
IconWrapper.defaultProps = {
  iconName: "arrow-up",
  rotation: 0,
};

export default IconWrapper;
