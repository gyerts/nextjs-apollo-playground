import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, ListItem, themed } from '@market-ui/falcon-ui';

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

export const FooterLink = ({ to, target, children }) => (
    <ListItem p="xs">
        <Link as={RouterLink} to={to} target={target}>
            {children}
        </Link>
    </ListItem>
);
