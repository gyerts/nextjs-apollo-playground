import React from 'react';
import { Box } from '@deity/falcon-ui';
// import './AccountIconStyles.scss'

interface IProps {
    onClick?: () => void
    gridArea?: string
}
export const AccountIcon  = ({ onClick, gridArea }: IProps) => (
    <Box
        gridArea={gridArea}
        onClick={() => onClick && onClick()}
        css={{ cursor: onClick ? 'pointer' : undefined, position: 'relative' }}
    >
        <i className='icon-account-logged-in' />
    </Box>
);
