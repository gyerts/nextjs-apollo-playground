import React from "react";
import {CmsSlot} from "../src/components/Cms";

const HomeLayout = (props) => {
  return (
    <div className={props.className}>
      <CmsSlot position="CMSMainTop" />
      <CmsSlot position="CMSMainCenter" />
      <CmsSlot position="CMSMainBottom" />
    </div>

  )
};

// const sdf = `
//   h2 {
//     text-transform: uppercase;
//     text-align: center;
//     padding-bottom: 10px;
//     padding-top: 40px;
//     font-size: 24px;
//
//     @media(min-width: themedBreakpoints.md) {
//       font-size: 40px;
//       padding-bottom: 30px;
//       padding-top: 60px;
//     }
//   }
// `;

export default HomeLayout;
