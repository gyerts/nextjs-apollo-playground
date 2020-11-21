import React, {useRef} from 'react';
import {UserIconDef, UserIconLoged} from "src/styling";
import {Link as RouterLink} from "react-router-dom";
import {CustomerQuery} from "src/api";
import {extractThemableProps, Link, ThemedComponentProps} from "@market-ui/falcon-ui";


interface IProps extends ThemedComponentProps {
}
export function AccountIcon (props: IProps) {
  const { themableProps } = extractThemableProps(props);

  const signInIcon = useRef(<UserIconDef width='md' {...themableProps} />);
  const accountIcon = useRef(<UserIconLoged width='md' {...themableProps} />);

  return (
    <Link as={RouterLink} to="/account" >
      <CustomerQuery>
        {({customer}: any) => customer ? accountIcon.current : signInIcon.current}
      </CustomerQuery>
    </Link>
  );
}
