import React from 'react';
import {Box, FlexLayout, Link} from '@deity/falcon-ui';
import {Link as RouterLink} from "react-router-dom";
import {CustomerQuery} from "src/api/Customer/CustomerQuery";
import {SearchBarArea} from "../../Searchbar/Searchbar";
import {T} from "@market-ui/falcon-i18n";
import {ProfileIconSelectedWhite} from "src/styling";
import {SearchWhiteIcon, CloseWhiteIcon} from "src/styling";
import {themedColors} from "src/theme/colors";
import {AccountIcon} from "../../../FunctionalIcons";

const menuHeaderLayoutTheme = {
  searchbarLayout: {
    bgFullWidth: 'black',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    css: {
      height: 40,
      paddingRight: 10,
      paddingLeft: 10
    }
  }
};

export const MobileMenuHeader = ({onCloseMobileMenu}) => {

  return <FlexLayout defaultTheme={menuHeaderLayoutTheme}>
    <CloseWhiteIcon onClick={onCloseMobileMenu}/>
    <Box>
      <FlexLayout alignItems='center'>
        <CustomerQuery>
          {({customer}) =>
            customer ? (
              <Link as={RouterLink} to="/account" gridArea={SearchBarArea.signIn}>
                <AccountIcon ml='xs' />
              </Link>
            ) : (
              <Link
                css={{
                  color: themedColors.white,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  paddingRight: 10,
                  paddingLeft: 10
                }}
                gridArea={SearchBarArea.signIn}
                as={RouterLink} to="/account"
              >
                <T id="banner.logIn"/>
              </Link>
            )
          }
        </CustomerQuery>
      </FlexLayout>
    </Box>
  </FlexLayout>
};
