import React from "react";
import {Tab, Tabs, Box} from "@market-ui/falcon-ui";
import {State} from "react-powerplug";
import {I18n} from "@market-ui/falcon-i18n";
import {themedColors} from "src/theme/colors";
import {IAttribute} from "src/common/models";
import {themedBreakpoints} from "src/theme/breakpoints";

interface IPDPTabs {
  attributes: IAttribute[];
}

export const PDPTabs = (props: IPDPTabs) => {
  const { attributes } = props;

  return (
    <I18n>
      {t => (
        <State
          initial={{
            activeIndex: 0,
            tabs: attributes }}>
          {({ state, setState }) => (
            <>
              <Tabs variant={'secondary'}>
                {state.tabs
                  .filter((tab) => (tab.value))
                  .map((tab, index) => (
                  <Tab
                    key={tab.name + index}
                    active={index === state.activeIndex}
                    css={{
                      borderBottom: index === state.activeIndex ? `1px solid ${themedColors.black}` : 'none',
                      borderBottomColor: themedColors.black,
                      whiteSpace: 'nowrap',
                      margin: 0
                    }}
                    onClick={() => setState({ activeIndex: index })}
                  >
                    {t(`pdp.tabs.${tab.name}`)}
                  </Tab>
                ))}
              </Tabs>
              <Box css={{
                maxWidth: 450,
                [`@media screen and (max-width: ${themedBreakpoints.md}px)`]: {
                  maxWidth: 400,
                }
              }}>
                {state.tabs[state.activeIndex].value}
              </Box>
            </>
          )}
        </State>
      )}
    </I18n>

  );
}
