import {createGlobalStyle} from "styled-components";

const GlobalStyleForFullscreenModal= createGlobalStyle`
.fullScreenImageModal {
  width: 400px;
  min-width: 400px !important;
  
  & > div {
    padding: 0;
  }
}
`;

export default GlobalStyleForFullscreenModal;
