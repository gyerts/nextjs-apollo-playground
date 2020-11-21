
import React from 'react';
import {extractThemableProps, themed, ThemedComponentProps, CSSObject} from "@market-ui/falcon-ui";

interface IIconProps extends ThemedComponentProps {
  onClick?: () => void
  css?: CSSObject
}

const IconLayout = themed({
  tag: 'svg',
  defaultTheme: {
    iconLayout: {
      fontSize: 'xs',
    },
  }
});

export const SecurityIconTransp = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#security-icon-transp" href="#security-icon-transp"/>
    </IconLayout>
  );
};

export const WarningIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#warning-icon" href="#warning-icon"/>
    </IconLayout>
  );
};

export const ProfileIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#profile-icon" href="#profile-icon"/>
    </IconLayout>
  );
};

export const HamburgerIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#hamburger-icon" href="#hamburger-icon"/>
    </IconLayout>
  );
};

export const TwitterLogoIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#twitter-logo-icon" href="#twitter-logo-icon"/>
    </IconLayout>
  );
};

export const ArrowUpMdWhiteIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#arrow-up-md-white-icon" href="#arrow-up-md-white-icon"/>
    </IconLayout>
  );
};

export const CancelIconGreen = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#cancel-icon-green" href="#cancel-icon-green"/>
    </IconLayout>
  );
};

export const ProfileIconSelectedWhite = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#profile-icon-selected-white" href="#profile-icon-selected-white"/>
    </IconLayout>
  );
};

export const ArrowDownMdWhiteIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#arrow-down-md-white-icon" href="#arrow-down-md-white-icon"/>
    </IconLayout>
  );
};

export const LogoutIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#logout-icon" href="#logout-icon"/>
    </IconLayout>
  );
};

export const CloseWhiteIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#close-white-icon" href="#close-white-icon"/>
    </IconLayout>
  );
};

export const ArrowWhiteLeft = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#arrow-white-left" href="#arrow-white-left"/>
    </IconLayout>
  );
};

export const SnapchatLogoIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#snapchat-logo-icon" href="#snapchat-logo-icon"/>
    </IconLayout>
  );
};

export const ProfileIconWhite = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#profile-icon-white" href="#profile-icon-white"/>
    </IconLayout>
  );
};

export const PinterestLogoIconWhite = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#pinterest-logo-icon-white" href="#pinterest-logo-icon-white"/>
    </IconLayout>
  );
};

export const InfoIconWhite = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#info-icon-white" href="#info-icon-white"/>
    </IconLayout>
  );
};

export const BagEmptyIconWhite = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#bag-empty-icon-white" href="#bag-empty-icon-white"/>
    </IconLayout>
  );
};

export const BagIconSelected = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#bag-icon-selected" href="#bag-icon-selected"/>
    </IconLayout>
  );
};

export const TwitterLogoIconWhite = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#twitter-logo-icon-white" href="#twitter-logo-icon-white"/>
    </IconLayout>
  );
};

export const ProfileIconSelected = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#profile-icon-selected" href="#profile-icon-selected"/>
    </IconLayout>
  );
};

export const UserIconLoged = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#user-icon-loged" href="#user-icon-loged"/>
    </IconLayout>
  );
};

export const QuestionIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#question-icon" href="#question-icon"/>
    </IconLayout>
  );
};

export const YoutubeLogoIconWhite = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#youtube-logo-icon-white" href="#youtube-logo-icon-white"/>
    </IconLayout>
  );
};

export const HeartFilledWhiteIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#heart-filled-white-icon" href="#heart-filled-white-icon"/>
    </IconLayout>
  );
};

export const CheckboxOnIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#checkbox-on-icon" href="#checkbox-on-icon"/>
    </IconLayout>
  );
};

export const CloseIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#close-icon" href="#close-icon"/>
    </IconLayout>
  );
};

export const FacebookLogoIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#facebook-logo-icon" href="#facebook-logo-icon"/>
    </IconLayout>
  );
};

export const GoogleLogoColorIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#google-logo-color-icon" href="#google-logo-color-icon"/>
    </IconLayout>
  );
};

export const SnapchatLogoHoverIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#snapchat-logo-hover-icon" href="#snapchat-logo-hover-icon"/>
    </IconLayout>
  );
};

export const Star = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#star" href="#star"/>
    </IconLayout>
  );
};

export const FacebookLogoColorIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#facebook-logo-color-icon" href="#facebook-logo-color-icon"/>
    </IconLayout>
  );
};

export const ArrowRightLgIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#arrow-right-lg-icon" href="#arrow-right-lg-icon"/>
    </IconLayout>
  );
};

export const PaymentMaestro = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#payment-maestro" href="#payment-maestro"/>
    </IconLayout>
  );
};

export const DeleteIconSelected = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#delete-icon-selected" href="#delete-icon-selected"/>
    </IconLayout>
  );
};

export const HeartWhiteIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#heart-white-icon" href="#heart-white-icon"/>
    </IconLayout>
  );
};

export const ArrowDownMdIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#arrow-down-md-icon" href="#arrow-down-md-icon"/>
    </IconLayout>
  );
};

export const ArrowUpXsIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#arrow-up-xs-icon" href="#arrow-up-xs-icon"/>
    </IconLayout>
  );
};

export const SearchWhiteIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#search-white-icon" href="#search-white-icon"/>
    </IconLayout>
  );
};

export const N552 = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#_55-2" href="#_55-2"/>
    </IconLayout>
  );
};

export const YoutubeLogoHoverIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#youtube-logo-hover-icon" href="#youtube-logo-hover-icon"/>
    </IconLayout>
  );
};

export const SnapchatLogoIconWhite = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#snapchat-logo-icon-white" href="#snapchat-logo-icon-white"/>
    </IconLayout>
  );
};

export const Tick = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#Tick" href="#Tick"/>
    </IconLayout>
  );
};

export const PaymentIsracardNew = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#payment-isracard-new" href="#payment-isracard-new"/>
    </IconLayout>
  );
};

export const FacebookLogoHoverIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#facebook-logo-hover-icon" href="#facebook-logo-hover-icon"/>
    </IconLayout>
  );
};

export const HeartFilledIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#heart-filled-icon" href="#heart-filled-icon"/>
    </IconLayout>
  );
};

export const ShippingIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#shipping-icon" href="#shipping-icon"/>
    </IconLayout>
  );
};

export const PaymentIsracard = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#payment-Isracard" href="#payment-Isracard"/>
    </IconLayout>
  );
};

export const ArrowDownXsIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#arrow-down-xs-icon" href="#arrow-down-xs-icon"/>
    </IconLayout>
  );
};

export const MinusIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#minus-icon" href="#minus-icon"/>
    </IconLayout>
  );
};

export const BagEmptyIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#bag-empty-icon" href="#bag-empty-icon"/>
    </IconLayout>
  );
};

export const GoogleLogoHoverIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#google-logo-hover-icon" href="#google-logo-hover-icon"/>
    </IconLayout>
  );
};

export const SecurityIconBlack = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#security-icon-black" href="#security-icon-black"/>
    </IconLayout>
  );
};

export const ScrollUpIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#scroll-up-icon" href="#scroll-up-icon"/>
    </IconLayout>
  );
};

export const CircleFilled = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#circle-filled" href="#circle-filled"/>
    </IconLayout>
  );
};

export const YoutubeLogoIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#youtube-logo-icon" href="#youtube-logo-icon"/>
    </IconLayout>
  );
};

export const GoogleLogoIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#google-logo-icon" href="#google-logo-icon"/>
    </IconLayout>
  );
};

export const SecurityIconWhite = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#security-icon-white" href="#security-icon-white"/>
    </IconLayout>
  );
};

export const ShareIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#share-icon" href="#share-icon"/>
    </IconLayout>
  );
};

export const InfoIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#info-icon" href="#info-icon"/>
    </IconLayout>
  );
};

export const CancelIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#cancel-icon" href="#cancel-icon"/>
    </IconLayout>
  );
};

export const InstagramLogoIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#instagram-logo-icon" href="#instagram-logo-icon"/>
    </IconLayout>
  );
};

export const CloseIconRed = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#close-icon-red" href="#close-icon-red"/>
    </IconLayout>
  );
};

export const PaymentMastercard = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#payment-mastercard" href="#payment-mastercard"/>
    </IconLayout>
  );
};

export const PaymentDci = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#payment-dci" href="#payment-dci"/>
    </IconLayout>
  );
};

export const ArrowLeftLgIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#arrow-left-lg-icon" href="#arrow-left-lg-icon"/>
    </IconLayout>
  );
};

export const PaymentDiscover = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#payment-discover" href="#payment-discover"/>
    </IconLayout>
  );
};

export const DeleteIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#delete-icon" href="#delete-icon"/>
    </IconLayout>
  );
};

export const BagIconWhiteSelected = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#bag-icon-white-selected" href="#bag-icon-white-selected"/>
    </IconLayout>
  );
};

export const Circle = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#circle" href="#circle"/>
    </IconLayout>
  );
};

export const N55 = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#_55" href="#_55"/>
    </IconLayout>
  );
};

export const PinterestLogoIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#pinterest-logo-icon" href="#pinterest-logo-icon"/>
    </IconLayout>
  );
};

export const AddressbookIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#addressbook-icon" href="#addressbook-icon"/>
    </IconLayout>
  );
};

export const ClearIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#clear-icon" href="#clear-icon"/>
    </IconLayout>
  );
};

export const PlusIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#plus-icon" href="#plus-icon"/>
    </IconLayout>
  );
};

export const ShippingIconWhite = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#shipping-icon-white" href="#shipping-icon-white"/>
    </IconLayout>
  );
};

export const FacebookLogoIconWhite = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#facebook-logo-icon-white" href="#facebook-logo-icon-white"/>
    </IconLayout>
  );
};

export const UniversalAccessIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#universal-access-icon" href="#universal-access-icon"/>
    </IconLayout>
  );
};

export const PaymentVisa = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#payment-visa" href="#payment-visa"/>
    </IconLayout>
  );
};

export const CreditCardIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#credit-card-icon" href="#credit-card-icon"/>
    </IconLayout>
  );
};

export const EmailIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#email-icon" href="#email-icon"/>
    </IconLayout>
  );
};

export const PinterestLogoHoverIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#pinterest-logo-hover-icon" href="#pinterest-logo-hover-icon"/>
    </IconLayout>
  );
};

export const ArrowUpMdIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#arrow-up-md-icon" href="#arrow-up-md-icon"/>
    </IconLayout>
  );
};

export const HeartEmptyIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#heart-empty-icon" href="#heart-empty-icon"/>
    </IconLayout>
  );
};

export const BoxIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#box-icon" href="#box-icon"/>
    </IconLayout>
  );
};

export const InstagramLogoHoverIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#instagram-logo-hover-icon" href="#instagram-logo-hover-icon"/>
    </IconLayout>
  );
};

export const PasswordIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#password-icon" href="#password-icon"/>
    </IconLayout>
  );
};

export const CreditCardCvvIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#credit-card-CVV-icon" href="#credit-card-CVV-icon"/>
    </IconLayout>
  );
};

export const CheckboxOffHoverIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#checkbox-off-hover-icon" href="#checkbox-off-hover-icon"/>
    </IconLayout>
  );
};

export const PaymentAmex = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#payment-amex" href="#payment-amex"/>
    </IconLayout>
  );
};

export const InstagramLogoIconWhite = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#instagram-logo-icon-white" href="#instagram-logo-icon-white"/>
    </IconLayout>
  );
};

export const RadioOffIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#radio-off-icon" href="#radio-off-icon"/>
    </IconLayout>
  );
};

export const SearchIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#search-icon" href="#search-icon"/>
    </IconLayout>
  );
};

export const QuestionIconSelected = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#question-icon-selected" href="#question-icon-selected"/>
    </IconLayout>
  );
};

export const UserIconDef = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#user-icon-def" href="#user-icon-def"/>
    </IconLayout>
  );
};

export const HomeIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#home-icon" href="#home-icon"/>
    </IconLayout>
  );
};

export const RadioOnIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#radio-on-icon" href="#radio-on-icon"/>
    </IconLayout>
  );
};

export const TwitterLogoHoverIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#twitter-logo-hover-icon" href="#twitter-logo-hover-icon"/>
    </IconLayout>
  );
};

export const FullScreenIcon = ({onClick, width='sm', ...restProps}: IIconProps) => {
  const {themableProps, rest} = extractThemableProps(restProps);

  return (
    <IconLayout
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
      width={width as any}
      height={themableProps.height as any || width as any}
      {...themableProps}
      css={{ ...themableProps.css, cursor: onClick ? 'pointer' : 'unset' }}
    >
      <use xlinkHref="#full-screen-icon" href="#full-screen-icon"/>
    </IconLayout>
  );
};
