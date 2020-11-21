import React from 'react';
import { Box, ListItem, themed } from '@market-ui/falcon-ui';
import { HashLink } from 'react-router-hash-link';

export const FooterSectionsLayout = themed({
  tag: Box,
  defaultTheme: {
    footerSectionsLayout: {
      display: 'flex',
      bgFullWidth: 'secondaryLight',
      css: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        justifyItems: 'center',
        flexWrap: 'wrap'
      }
    }
  }
});

export const FooterSectionLayout = themed({
  tag: Box,
  defaultTheme: {
    footerSection: {
      p: 'md',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      css: {
        minWidth: 250,
        textAlign: {
          md: 'unset',
          xs: 'center'
        },
        alignItems: {
          md: 'unset',
          xs: 'center'
        }
      }
    }
  }
});

export const FooterSectionItem = themed({
  tag: ListItem,
  defaultTheme: {
    footerSectionItem: {

      p: 'xs',
      css: {
        "& > a": {
          color: 'black',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline'
          }
        }
      }
    }
  }
})

const scrollWithOffset = (el) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = -80; // height of fixed header + some margin
  window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
}

export const FooterLink = ({to, children}) => (
  <FooterSectionItem>
    <HashLink to={to} scroll={el => scrollWithOffset(el)}>
      {children}
    </HashLink>
  </FooterSectionItem>
);