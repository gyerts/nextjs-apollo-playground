import React from 'react';
import {Box, H4, List, themed} from '@market-ui/falcon-ui';
import { T } from '@market-ui/falcon-i18n';
import {
  FooterSectionLayout,
  FooterLink,
} from '../../uikitEjected';
import { Copyright } from './Copyright/Copyright';
import { FollowUs } from "./FollowUs/FollowUs";
import { Newsletter } from "./Newsletter/Newsletter";
import styled from "styled-components";
import {
  $mobileScreenWidthBreakPoint,
  $white,
  iconSpriteUrl
} from "../../theme/variables";

const FooterLayout = themed({
  tag: Box,
  defaultTheme: {
    footerLayout: {

      // mt: 'md', // removed mt due to issue that if bg of page is not white it looks not as on design,
      // some white line on bottom of the page
      bgFullWidth: 'footerPrimaryColor',
      p: 'xl',
      pb: 'none'
    }
  }
});

const MainFooterSectionLayout = themed({
  tag: Box,
  defaultTheme: {
    footerLayout: {
      display: 'flex',
      justifyContent: 'space-around'
    }
  }
});

const SitemapLayout = themed({
  tag: Box,
  defaultTheme: {
    footerLayout: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }
});

export const Sitemap = () => (
  <SitemapLayout className={'sitemap-layout'}>
    <FooterSectionLayout p={'none'} className={'sitemap-layout-inner'}>
      <input type="checkbox"
             className={'accordion-checkbox'}
             id="careListCheckbox"/>
      <label htmlFor="careListCheckbox"
             className={'accordion-label'}>
        <H4 fontWeight="bold"
            fontSize='xs'>
          <T id="footer.sitemap.care" />
        </H4>
        <i className={'sitemap-checkbox-label'} />
      </label>

      <List fontSize='xxs'
            className={'care-list'}
            flexDirection={'column'}
            css={{
              width: '100%',
              textAlign: 'inherit'
            }}>
        <FooterLink to="/shopping-with-us#shipping-information" pl='none'>
          <T id="footer.sitemap.defaultShipping" />
        </FooterLink>
        <FooterLink to="/shopping-with-us#ways-to-pay">
          <T id="footer.sitemap.payment" />
        </FooterLink>
        <FooterLink to="/shopping-with-us#return-policy">
          <T id="footer.sitemap.returns" />
        </FooterLink>
        <FooterLink to="/shopping-with-us#order-tracking">
          <T id="footer.sitemap.orderTracking" />
        </FooterLink>
        <FooterLink to="/contact-us">
          <T id="footer.sitemap.contactUs" />
        </FooterLink>
      </List>
    </FooterSectionLayout>
    <FooterSectionLayout p={'none'} className={'sitemap-layout-inner'}>
      <input type="checkbox"
             className={'accordion-checkbox'}
             id="infoListCheckbox"/>
      <label htmlFor="infoListCheckbox"
             className={'accordion-label'}>
        <H4 fontWeight="bold"
            fontSize='xs'>
          <T id="footer.sitemap.info" />
        </H4>
        <i className={'sitemap-checkbox-label'} />
      </label>

      <List fontSize='xxs'
            flexDirection={'column'}
            className={'info-list'}
            css={{
              width: '100%',
              textAlign: 'inherit'
            }}>
        <FooterLink to="/store-locator">
          <T id="footer.sitemap.storeLocator" />
        </FooterLink>
        <FooterLink display={'flex'} to="/terms-conditions">
          <T id="footer.sitemap.terms" />
        </FooterLink>
        <FooterLink display={'flex'} to="/privacy-cookies" target={'_blank'}>
          <T id="footer.sitemap.privacy" />
        </FooterLink>
        <FooterLink display={'flex'} to="/privacy-cookies#cookies" target={'_blank'}>
          <T id="footer.sitemap.cookies" />
        </FooterLink>
        <FooterLink display={'flex'} to="/accessibility">
          <T id="footer.sitemap.accessibility" />
        </FooterLink>
      </List>
    </FooterSectionLayout>
  </SitemapLayout>
);

export const FooterInner = (props) => (
  <div className={props.className}>
    <FooterLayout as="footer" className={'footer'}>
      <MainFooterSectionLayout className={'main-footer-section-layout'} pb={'lg'}>
        <Sitemap className={'sitemap'} />
        <Newsletter className={'newsletter'} />
      </MainFooterSectionLayout>
      {/*<LanguageSection> /!*!lang*!/*/}
      {/*  <LocaleSwitcher>{({ ...props }) => <LocaleSwitcherDropdown {...props} />}</LocaleSwitcher>*/}
      {/*</LanguageSection>*/}
      <FollowUs />
      <Copyright />
    </FooterLayout>
  </div>
);

export const Footer = styled(FooterInner) `
.main-footer-section-layout a {
    font-size: 12px;
 }
 
 .sitemap-layout li {
    padding-right: 0;
    padding-left: 0;
    display: flex;
 }
 
.sitemap-layout-inner {
  position: relative;
}

.sitemap-checkbox-label {
  display: none;
}

.accordion-checkbox {
  display: none;
}

.accordion-label {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  align-items: center;
}

@media (max-width: ${$mobileScreenWidthBreakPoint}) {

  .sitemap-checkbox-label {
    display: inline-block;
    width: 14px;
    height: 14px;
    background-repeat: no-repeat;
    background-image: url(${iconSpriteUrl});
    background-position-x: 0;
    background-position-y: -149px;
  }

  .accordion-checkbox:checked + .accordion-label .sitemap-checkbox-label {
    background-position-x: -23px;
  }

  .info-list,
  .care-list {
    max-height: 0;
    overflow: hidden;
    transition: 0.3s;
  }

  #infoListCheckbox:checked ~ .info-list {
    max-height: 10000px;
  }

  #careListCheckbox:checked ~ .care-list {
    max-height: 10000px;
  }

  .main-footer-section-layout {
    flex-direction: column;
    padding: 10px 0;
  }

  .sitemap-layout {
    flex-direction: column;
    margin-bottom: 10px;
  }

  .sitemap-layout-inner {
    padding: 10px 0 20px;
  }

  .sitemap-layout-inner:not(:first-child) {
    padding: 20px 0;
  }

  .footer {
    padding: 0;
  }

  .sitemap-layout-inner {
    border-bottom: 2px solid ${$white};
    &:after {
      content: "";
      width: 200vw;
      height: 2px;
      background: ${$white};
      position: absolute;
      right: -50vw;
      bottom: -2px;
      display: inline-block;
    }
  }
}
`;
