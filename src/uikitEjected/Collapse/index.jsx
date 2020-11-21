import React, {useCallback, useState} from "react";
import {Box, Details, DetailsContent, FlexLayout, Summary} from "@market-ui/falcon-ui";
import {ResponsiveIf} from "src/components";

export const Collapse = ({title, children}) => {
  const [opened, setOpened] = useState(false);

  const toggle = useCallback(function (e) {
    e.preventDefault();
    setOpened(opened => !opened);
  }, [])

  return (
    <FlexLayout position='relative' alignItems='center'>
      <ResponsiveIf mobile>
        <Box
          css={{position: 'absolute', top: 0, left: '-50%', width: '200vw', height: '100%', zIndex: -1}}
          borderTop='regular'
          borderBottom='regular'
          bg='secondary'
        />
      </ResponsiveIf>
      <Details open={opened} css={{
        'summary::after': {display: "none"},
        width: '100%',
      }}>
        <Summary bg='none' my='xs' justifyContent='start' onClick={toggle}>{title(opened)}</Summary>
        <DetailsContent>{children}</DetailsContent>
      </Details>
    </FlexLayout>
  );
}
