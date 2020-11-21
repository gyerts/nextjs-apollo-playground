import {themedDropdown, themedDropdownLabel, themedDropdownMenu, themedDropdownMenuItem} from './dropdown';
import {ThemedComponents} from "@deity/falcon-ui";
import {themedIcon} from "./icon";
import {themedButton} from "./button";
import {themedLink} from "./link";
import {themedBreadcrumb} from "./breadcrumb";
import {themedNavbar} from "./navbar";
import {themedNavbarItemMenu} from "./navbarItemMenu";
import {themedSidebar} from "./sidebar";
import {themedBadge} from "./badge";
import {themedInput} from "./input";
import {themedSelect} from "./select";
import {themedLabel} from "./label";
import {themedDivider} from "./divider";
import {themedH1} from "./headings/h1";
import {themedH7} from "./headings/h7";
import {themedH6} from "./headings/h6";
import {themedH5} from "./headings/h5";
import {themedH4} from "./headings/h4";
import {themedH3} from "./headings/h3";
import {themedH2} from "./headings/h2";
import {themedText} from "./text";
import {themedMenuItem} from "./menuItem";
import {themedMenu} from "./menu";


export const themedComponents: ThemedComponents = {
  icon: themedIcon,
  link: themedLink,
  text: themedText,
  breadcrumb: themedBreadcrumb,
  navbar: themedNavbar,
  navbarItemMenu: themedNavbarItemMenu,
  sidebar: themedSidebar,
  badge: themedBadge,
  button: themedButton,
  input: themedInput,
  select: themedSelect,
  label: themedLabel,
  divider: themedDivider,
  h1: themedH1,
  h2: themedH2,
  h3: themedH3,
  h4: themedH4,
  h5: themedH5,
  h6: themedH6,
  h7: themedH7,
  dropdown: themedDropdown,
  dropdownLabel: themedDropdownLabel,
  dropdownMenu: themedDropdownMenu,
  dropdownMenuItem: themedDropdownMenuItem,
  menuItem: themedMenuItem,
  menu: themedMenu,
};
