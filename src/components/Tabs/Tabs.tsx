import React from "react";
import {TabsContextProvider} from "./context";
import {DefaultThemeProps, FlexLayout} from "@deity/falcon-ui";
import {TabsLinks} from "./components/TabsLinks";
import {TabsRoutes} from "./components/TabsRoutes";
import {ResponsiveIf} from "../ResponsiveIf";

interface IProps {
  placement: {
    xs?: PlacementType
    sm?: PlacementType
    md?: PlacementType
    lg?: PlacementType
    xl?: PlacementType
  }
  children?: any
  menuAndContentLayout: DefaultThemeProps
  menuGridArea: string
  contentGridArea: string
  gridArea?: string
}
export const Tabs = ({children, placement, ...restProps}: IProps) => {
  return (
    <TabsContextProvider>
      {children}

      <ResponsiveIf maxWidth='sm'>
        <Layout placement={placement.xs} {...restProps} />
      </ResponsiveIf>

      <ResponsiveIf minWidth='sm' maxWidth='md'>
        <Layout placement={placement.sm} {...restProps} />
      </ResponsiveIf>

      <ResponsiveIf minWidth='md' maxWidth='lg'>
        <Layout placement={placement.md} {...restProps} />
      </ResponsiveIf>

      <ResponsiveIf minWidth='lg' maxWidth='xl'>
        <Layout placement={placement.lg} {...restProps} />
      </ResponsiveIf>

      <ResponsiveIf minWidth='xl'>
        <Layout placement={placement.xl} {...restProps} />
      </ResponsiveIf>

    </TabsContextProvider>
  );
};

export type PlacementType = 'menu-from-left'|'content-inside';

const Layout = ({placement, menuAndContentLayout, contentGridArea, menuGridArea, gridArea}: {
  placement: PlacementType
  menuAndContentLayout: DefaultThemeProps
  menuGridArea: string
  contentGridArea: string
  gridArea?: string
}) => {
  return (
    <React.Fragment>
      {placement === 'menu-from-left' && (
        <FlexLayout
          flexDirection='row'
          alignItems='start'
          justifyContent='center'
          defaultTheme={menuAndContentLayout}
          gridArea={gridArea}
        >
          <TabsLinks gridArea={menuGridArea} />
          <TabsRoutes gridArea={contentGridArea} />
        </FlexLayout>
      )}
      {placement === 'content-inside' && (
        <FlexLayout
          flexDirection='row'
          alignItems='start'
          justifyContent='center'
          gridArea={gridArea}
        >
          <TabsLinks showInsideActiveLink={<TabsRoutes />} />
        </FlexLayout>
      )}
    </React.Fragment>
  );
};
