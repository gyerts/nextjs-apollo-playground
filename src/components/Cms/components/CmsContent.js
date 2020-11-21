import React from 'react';
import { Box } from '@market-ui/falcon-ui';
import styled from 'styled-components';
import { withTheme } from '@market-ui/falcon-ui';

const cmsContentTheme = {
  cmsContent: {
    fontSize: 'md',
    css: ({ theme }) => ({
      margin: '0 auto',

      p: {
        marginTop: 0,
        marginBottom: theme.spacing.md
      },
      img: {
        objectFit: 'contain',
        maxWidth: '100%'
      },
      figure: {
        marginBottom: theme.spacing.xxl
      }
    })
  }
};

const CMSContentComponent = ({ content, className }) => (
  <Box className={className} defaultTheme={cmsContentTheme} dangerouslySetInnerHTML={{ __html: `${content}` }} />
);

export const CMSContent = withTheme(styled(CMSContentComponent)`

    h1 {
      text-align: center;
    }
    
    h1, h2, h3, h4 {
      margin: 0;
    }
    
    .tab {
      background-color: ${({theme}) => theme.colors.white};
      margin-bottom: ${({theme}) => theme.spacing.xs}px;
      
      &:last-child {
        margin: 0;
      }
    }
    
    .tab-label {
      padding: ${({theme}) => 3*theme.spacing.xs}px ${({theme}) => 5*theme.spacing.xs}px;
      
      @media (max-width: ${({theme}) => theme.breakpoints.md}px) {
        padding-left: ${({theme}) => 2*theme.spacing.xs}px;
        padding-right: ${({theme}) => 2*theme.spacing.xs}px;
      }
    }
    
    .tab-content {
      padding: ${({theme}) => theme.spacing.xs}px ${({theme}) => 5*theme.spacing.xs}px;
      
      @media (max-width: ${({theme}) => theme.breakpoints.md}px) {
        padding-left: ${({theme}) => 2*theme.spacing.xs}px;
        padding-right: ${({theme}) => 2*theme.spacing.xs}px;
      }
    }
    
    .tab > input[type=checkbox] {
      display: none;
    }
    
    .tab-label {
      display: flex;
      justify-content: space-between;
      font-weight: 900;
      cursor: pointer;
      position: relative;
      
      a {
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    
    .tab-label::after {
      content: "➕";
      width: 1rem;
      height: 1rem;
    }
    
    .tab > input + label + .tab-content {
      display: none;
    }
    
    .tab > input:checked {
      & + label {
        margin-bottom: ${({theme}) => theme.spacing.xs}px;
        
         & + .tab-content {
          display: block;
        }
        
        &::after {
          content: "▬";
        }
      }
    }
    
`);
