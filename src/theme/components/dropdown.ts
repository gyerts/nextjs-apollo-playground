import {ThemeColors, ThemedComponentPropsWithVariants} from "@deity/falcon-ui";

export interface CustomThemeColors extends ThemeColors {
    lightBorder: string;
    darkBorder: string;
}

export const themedDropdown: ThemedComponentPropsWithVariants = {
    borderRadius: 'none',
    boxShadow: 'none',
    bg: 'white',
    fontSize: 'xxs',
    css: ({ theme }) => ({
        color: theme.colors.black,
        borderColor: (theme.colors as CustomThemeColors).lightBorder,
        ':hover': {
            borderColor: '#dededf'
        },
        ':focus': {
            outline: 'none'
        }
    })
};

export const themedDropdownLabel: ThemedComponentPropsWithVariants = {
    px: 'sm',
    fontSize: 'xxs'
}

export const themedDropdownMenu: ThemedComponentPropsWithVariants = {
    borderRadius: 'none',
    boxShadow: 'none',
    bg: 'white',
    css: ({ theme }) => ({
        border: `1px solid ${(theme.colors as CustomThemeColors).lightBorder}`,
        marginLeft: -1,
        marginRight: -1,
        outline: 'none'
    })
}

export const themedDropdownMenuItem: ThemedComponentPropsWithVariants = {
    px: 'sm',
    css: ({ theme }) => ({
        cursor: 'pointer',
        ':hover': {
          background: theme.colors.secondaryLight,
          fontWeight: 900
        }
    })
}
