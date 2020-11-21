import React from 'react';
import { Box, themed } from '@deity/falcon-ui';
import { T } from '@market-ui/falcon-i18n';

export const CopyrightLayout = themed({
    tag: Box,
    defaultTheme: {
        copyrightLayout: {
            p: 'xs',
            color: 'copyrightText',
            fontSize: 'xxs',
            bgFullWidth: 'secondaryDark',
            css: {
                textAlign: 'center',
            }
        }
    }
});

export const Copyright = () => (
    <CopyrightLayout>
        <T id="footer.copyright" />
    </CopyrightLayout>
);
