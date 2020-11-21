import {createGlobalStyle} from "styled-components";
import {$black} from "src/theme/variables";

const GlobalStyleForCategory = createGlobalStyle`
  body[dir=rtl] label.themed-label {
  margin-right: 0;
  margin-left: 0;
}

body[dir=rtl] .themed-dropdown-menu {
  left: 0 !important;
  right: auto !important;
}

body .multiple-filter-checkbox input:checked + .-inner-checkbox-frame {
  background: ${$black};
  border-color: ${$black};
  &:hover {
    background: ${$black};
    border-color: ${$black};
  }
}

body .multiple-filter-checkbox input:hover {
    & + .-inner-checkbox-frame {
      border-color: ${$black};
    }
}

body .multiple-filter-checkbox input:checked:hover {
    & + .-inner-checkbox-frame {
      background: ${$black};
    }
}

body.scrolling-down .header-navigation-sticky-mobile.active {
  .sticky-inner-wrapper {
    position: relative !important;
  }
}

body.scrolling-up .mobile-filters-sticky.active {
  .sticky-inner-wrapper {
    top: 89px !important;
  }
}
`

export default GlobalStyleForCategory
