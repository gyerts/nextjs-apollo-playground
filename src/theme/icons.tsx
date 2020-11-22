import React from "react";
import {ThemedIcons} from "@deity/falcon-ui";


// @ts-ignore
export const themedIcons: ThemedIcons = {
  cart: { icon: () => null },
  user: { icon: () => null },
  arrowRight: { icon: () => null },
  dropdownArrowDown: {
    icon: () => null,
    size: 'md',
    ml: 'xs'
  },
  dropdownArrowUp: {
    icon: () => null,
    size: 'md',
    ml: 'xs'
  },
  buttonArrowRight: {
    icon: () => null,
    size: 'md',
    ml: 'xs',
    stroke: 'white'
  },
  close: {
    icon: () => null,
    css: {
      cursor: 'pointer'
    }
  },
  logOut: { icon: () => null },
  remove: { icon: () => null },
  nextPage: {
    icon: () => null,
    stroke: 'black'
  },
  prevPage: {
    icon: () => null,
    stroke: 'black'
  },
  lock: { icon: () => null },
  trash: { icon: () => null },
  check: { icon: () => null },
  checkCircle: { icon: () => null },
  eye: { icon: () => null },
  eyeOff: { icon: () => null },
  logo: {
    icon: () => (
      <svg
        id="Logo-desktop-main-menu"
        xmlns="http://www.w3.org/2000/svg"
        width="149.51"
        height="30"
        viewBox="0 0 149.51 30"
      >
        <path
          id="Контур_200"
          data-name="Контур 200"
          d="M50.7,21.875,57.523,43.51,64.66,21.875h8.528L62.325,50.8H53.355l-3.221-8.513-2.782-9.623-2.777,9.623L41.353,50.8H32.382L21.456,21.875h8.59L37.183,43.51l6.76-21.635Z"
          transform="translate(-21.456 -21.336)"
          fill="#fff"
        />
        <path
          id="Контур_201"
          data-name="Контур 201"
          d="M89.282,36.5c0,8.288-6.127,15-16.232,15s-16.17-6.712-16.17-15c0-8.228,6.187-15,16.1-15S89.282,28.27,89.282,36.5Zm-24.7,0c0,4.378,2.844,8.462,8.466,8.462s8.462-4.085,8.462-8.462a8.407,8.407,0,0,0-8.462-8.521C67.49,27.977,64.585,32.179,64.585,36.5Z"
          transform="translate(-3.852 -21.498)"
          fill="#fff"
        />
        <path
          id="Контур_202"
          data-name="Контур 202"
          d="M108.751,21.875l6.823,21.635,7.134-21.635h8.528L120.372,50.8H111.4l-3.221-8.513L105.4,32.663l-2.779,9.623L99.4,50.8H90.434L79.506,21.875h8.589L95.233,43.51l6.76-21.635Z"
          transform="translate(7.124 -21.336)"
          fill="#fff"
        />
        <path
          id="Контур_203"
          data-name="Контур 203"
          d="M124.43,41.085c0,6.07-9.729,6.07-9.729,0S124.43,35.015,124.43,41.085Z"
          transform="translate(25.081 -15.766)"
          fill="#fff"
        />
      </svg>
    ),
    // @ts-ignore
    stroke: 'none',
    css: {
      width: 'auto',
      height: '100%'
    }
  },
  loader: {
    icon: (props: any) => (
      <svg viewBox="0 0 50 50" {...props}>
        <path
          d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
          transform="rotate(241.969 25 25)"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    ),
    size: 'xxl',
    stroke: 'transparent',
    fill: 'primaryLight'
  },
};
