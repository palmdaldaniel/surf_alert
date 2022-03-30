import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconWrapper = ({ iconName, rotation, children }) => {
  return (
    <div>
      <FontAwesomeIcon rotation={rotation} icon={iconName} />
      {children}
    </div>
  );
};
IconWrapper.defaultProps = {
  iconName: "chevron-up",
  rotation: 0,
};

export default IconWrapper;
