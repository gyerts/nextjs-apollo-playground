import React from 'react';
import {
  Box,
  Breadcrumb,
  Breadcrumbs,
  DefaultThemeProps, extractThemableProps,
  GridLayout,
  H2,
  Link,
  Text,
  ThemedComponentProps
} from '@market-ui/falcon-ui';

import {
  TopPageMessage,
  TopPageMessageContextProvider,
  Tabs,
  TabLink,
  TabRoute,
  ResponsiveIf, TT,
} from "src/components";

import {bothResolutions, mobileOnly, useMobileBgFullWidthCss} from "src/styling/cssHelper";
import {Link as RouterLink, Redirect, Route, Switch} from "react-router-dom";
import {AddressbookIcon, BoxIcon, LogoutIcon, ProfileIcon} from "src/styling";
import {T} from "@market-ui/falcon-i18n";
import {SignOutLogic} from "src/api";
import {OrderHistory} from "./components/OrderHistory";
import {MyDetails} from "./components/MyDetails";
import {toGridTemplate} from "src/uikitEjected";
import {ViewOrder} from "./components/OrderHistory/ViewOrder";
import {MyAddresses} from "./components/MyAddresses";


const BreadCrumbs = ({...props}: any) => {
  return (
    <ResponsiveIf minWidth='sm'>
      <Breadcrumbs
        my="xs"
        alignSelf="flex-start"
        className='breadcrumbs'
        {...props}
      >
        <Breadcrumb><Link as={RouterLink} to="/"><T id="breadcrumbs.home" /></Link></Breadcrumb>
        <Breadcrumb><T id="breadcrumbs.account" /></Breadcrumb>
        <Switch>
          <Route
            path='/account/details'
            render={() => <Breadcrumb><T id="breadcrumbs.details" /></Breadcrumb>} />
          {/*<Route*/}
          {/*  path={['/account/orders', '/account/orders/:id']}*/}
          {/*  render={() => <Breadcrumb><T id="breadcrumbs.orders" /></Breadcrumb>} />*/}
          <Route
            path='/account/addresses'
            render={() => <Breadcrumb><T id="breadcrumbs.addresses" /></Breadcrumb>} />
        </Switch>
      </Breadcrumbs>
    </ResponsiveIf>
  )
};

export const Account = () => {
  const mobileCss = useMobileBgFullWidthCss();

  return (
    <Box bgFullWidth='primary' pb='xl'>
      <TopPageMessageContextProvider>
        <TopPageMessage mb='xs' />

        <GridLayout css={mobileCss} defaultTheme={layout}>
          <ResponsiveIf desktop>
            <BreadCrumbs gridArea={area.breadcrumbs} mb='lg' />
          </ResponsiveIf>

          <H2
            gridArea={area.title}
            mb='sm'
            justifySelf={bothResolutions('flex-end', 'flex-start')}
            mx={mobileOnly('sm')}
          >
            <ResponsiveIf desktop>
              <Text as='span' variant='uppercase'><T id='breadcrumbs.account' /></Text>
            </ResponsiveIf>
            <ResponsiveIf mobile>
              <Text as='span'><T id='breadcrumbs.account' /></Text>
            </ResponsiveIf>
          </H2>

          <Tabs
            placement={bothResolutions('content-inside', 'menu-from-left')}
            menuAndContentLayout={menuAndContentLayout}
            menuGridArea={area.menu}
            contentGridArea={area.content}
            gridArea={area.content}
          >
            <TabLink to="/account/details">{active => (
              active ? (
                <AlignedText text={<T id="breadcrumbs.details" />} icon={<ProfileIcon mr='xs' />} flex={1} fontSize='sm' p="xs" />
              ) : (
                <Link as={RouterLink} to="/account/details" flex={1} fontSize='sm' p="xs">
                  <AlignedText text={<T id="breadcrumbs.details" />} icon={<ProfileIcon mr='xs' />} />
                </Link>
              )
            )}</TabLink>
            {/*<TabLink to={["/account/orders", "/account/orders/:orderId"]}>{active => (*/}
            {/*  active ? (*/}
            {/*    <AlignedText text={<T id="breadcrumbs.orders" />} icon={<BoxIcon mr='xs' />} flex={1} fontSize='sm' p="xs" />*/}
            {/*  ) : (*/}
            {/*    <Link as={RouterLink} to="/account/orders" flex={1} fontSize='sm' p="xs">*/}
            {/*      <AlignedText text={<T id="breadcrumbs.orders" />} icon={<BoxIcon mr='xs' />} />*/}
            {/*    </Link>*/}
            {/*  )*/}
            {/*)}</TabLink>*/}
            <TabLink to="/account/addresses">{active => (
              active ? (
                <AlignedText text={<T id="breadcrumbs.addresses" />} icon={<AddressbookIcon mr='xs' />} flex={1} fontSize='sm' p="xs" />
              ) : (
                <Link as={RouterLink} to="/account/addresses" flex={1} fontSize='sm' p="xs">
                  <AlignedText text={<T id="breadcrumbs.addresses" />} icon={<AddressbookIcon mr='xs' />} />
                </Link>
              )
            )}</TabLink>
            <TabLink to="/account" collapsible={false}>{() => (
              <SignOutLogic>
                {({ signOut }) => (
                  <Link p="xs" flex={1} fontSize='sm' onClick={signOut}>
                    <AlignedText text={<T id="signOut.link" />} icon={<LogoutIcon mr='xs' />} />
                  </Link>
                )}
              </SignOutLogic>
            )}</TabLink>

            <TabRoute exact path="/account/details" component={MyDetails} />
            <TabRoute exact path="/account/orders/:orderId" component={ViewOrder} />
            <TabRoute exact path="/account/orders" component={OrderHistory} />
            <TabRoute exact path="/account/addresses" component={MyAddresses} />
            <TabRoute exact path="/account" component={() => <Redirect to='/account/details' />} />
          </Tabs>

        </GridLayout>
      </TopPageMessageContextProvider>
    </Box>
  )
};

const AlignedText = ({text, icon, ...props}: {
  text: React.ReactElement
  icon: React.ReactElement
} & ThemedComponentProps) => {
  const { themableProps } = extractThemableProps(props);
  return (
    <Text as='span' display='flex' alignItems='center' {...themableProps}>
      {icon} <Text as='span'>{text}</Text>
    </Text>
  );
};

const area = {
  empty: '.',
  breadcrumbs: 'breadcrumbs',
  title: 'title',
  menu: 'menu',
  content: 'content',
};

const menuAndContentLayout: DefaultThemeProps = {
  accountLayout: {
    display: 'grid',
    gridGap: {
      md: 'xl',
      sm: 'sm',
    },
    // prettier-ignore
    gridTemplate: {
      xl: toGridTemplate([
        ['1fr',      '400px',    '700px',      '1fr'      ],
        [area.empty, area.menu,  area.content, area.empty ],
      ]),
      lg: toGridTemplate([
        ['1fr',      '400px',    '700px',      '1fr'      ],
        [area.empty, area.menu,  area.content, area.empty ],
      ]),
      md: toGridTemplate([
        ['1fr',     '2fr'       ],
        [area.menu,  area.content ],
      ]),
      sm: toGridTemplate([
        ['1.5fr',     '2fr'       ],
        [area.menu,  area.content ],
      ]),
    }
  }
};

const layout: DefaultThemeProps = {
  accountLayout: {
    display: 'grid',
    // prettier-ignore
    gridTemplate: {
      xl: toGridTemplate([
        ['1fr',      '400px',    '750px',      '1fr'      ],
        [area.empty, area.breadcrumbs,  area.empty, area.empty ],
        [area.empty, area.title,  area.title, area.empty ],
        [area.empty, area.content,  area.content, area.empty ],
      ]),
      lg: toGridTemplate([
        ['1fr',      '400px',    '750px',      '1fr'      ],
        [area.empty, area.breadcrumbs,  area.empty, area.empty ],
        [area.empty, area.title,  area.title, area.empty ],
        [area.empty, area.content,  area.content, area.empty ],
      ]),
      md: toGridTemplate([
        ['1fr',     '2fr'       ],
        [area.breadcrumbs,  area.empty ],
        [area.title,  area.title ],
        [area.content,  area.content],
      ]),
      sm: toGridTemplate([
        ['1.5fr',     '2fr'       ],
        [area.breadcrumbs,  area.empty ],
        [area.title,  area.title ],
        [area.content,  area.content],
      ]),
      xs: toGridTemplate([
        ['1fr',     ],
        [area.breadcrumbs],
        [area.title],
        [area.content],
      ]),
    }
  }
};
