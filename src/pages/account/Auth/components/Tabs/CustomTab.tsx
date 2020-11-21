import React, {useCallback} from "react";
import {useHistory} from "react-router";
import {Tab} from "@market-ui/falcon-ui";
import classNames from "classnames";
import {T} from "@market-ui/falcon-i18n";


interface ICustomTabProps {
  index: number
  tabName: string
  active: boolean
  to: string
}

export const CustomTab = (props: ICustomTabProps) => {
  const history = useHistory();

  const onClick = useCallback(function (e: React.SyntheticEvent) {
    e.preventDefault();
    history.replace(props.to);
  }, []);

  return (
    <Tab
      variant="secondary"
      className={classNames({'active': props.active})}
      color={props.active ? 'primaryText' : 'secondaryText'}
      fontWeight='bold'
      px='none'
      css={({theme}: any) => ({
        flex: 1,
        marginRight: 0,
        textAlign: 'center',
        borderBottom: `1px solid ${theme.colors.disabledText} !important`,
        "&.active": {
          borderBottom: `2px solid ${theme.colors.black} !important`,
        },
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      })}
      fontSize='md'
      active={props.active}
      onClick={onClick}
    >
      <T id={`auth.tabs.${props.tabName}`} />
    </Tab>
  );
};
