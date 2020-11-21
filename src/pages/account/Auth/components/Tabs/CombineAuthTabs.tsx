import React, {useEffect, useState} from "react";
import {T} from "@market-ui/falcon-i18n";
import {FlexLayout, Tabs, Text} from "@market-ui/falcon-ui";

import {CustomTab} from "./CustomTab";
import {Delimiter} from "./Delimiter";
import {ITabType} from "../../types";


interface ITabsCombineProps {
  activeTab: ITabType
  isCheckout: boolean
  tabs: [ITabType, ITabType]
  next: string
}

export const CombineAuthTabs = ({next, tabs, activeTab, isCheckout}: ITabsCombineProps) => {
  const [activeIndex, setActiveIndex] = useState();

  useEffect(function () {
    setActiveIndex(activeTab === tabs[0] ? 0 : 1);
  }, [activeTab]);

  return (
    <FlexLayout css={{width: '100%'}} justifyContent='center'>
      {/* todo: back this line when social media registration will be implemented */}
      {/*<Text fontSize='xxs' fontWeight='bold' color='secondaryText'><T id='auth.tabDelimiter' /></Text>*/}
      <Tabs
        variant="secondary"
        alignItems='center'
        p='none'
        css={{
          width: '100%',
        }}
      >
        <CustomTab
          index={0}
          tabName={tabs[0]}
          active={activeIndex === 0}
          to={`/authorization/${tabs[0]}?next=${next}&checkout=${JSON.stringify(isCheckout)}`}
        />
        <Delimiter width={2} />
        <CustomTab
          index={1}
          tabName={tabs[1]}
          active={activeIndex === 1}
          to={`/authorization/${tabs[1]}?next=${next}&checkout=${JSON.stringify(isCheckout)}`}
        />
      </Tabs>
    </FlexLayout>
  );
};
