import React from "react";
import {SortOrderDropdown} from "src/uikitEjected/Category";
import {SortOrdersProvider} from "src/uikitEjected/SortOrders";
import {Toggle} from "react-powerplug";
import {T} from "@market-ui/falcon-i18n";
import {Box, FlexLayout, Icon, Text} from "@market-ui/falcon-ui";
import {Sidebar} from "src/uikitEjected/Sidebar";
import {Responsive} from "src/components/Responsive";
import {colorsFromDesign, themedColors} from "src/theme/colors";
import SortOrderMobile from "./SortOrderMobile";
import {getBgFullWidth} from "../../../utils/cssMixins";

const getMobileSortingHeaderStyles: any = () => {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    background: colorsFromDesign.LightBrown,
    marginBottom: 16,
    ...getBgFullWidth({
      background: colorsFromDesign.LightBrown,
      top: '-16px',
      height: 'calc(100% + 32px)',
      boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.16)'
    })
  }
};

const SortOrderDropdownPlp = () => {
  return (
    <SortOrdersProvider>
      {(sortOrdersProps: any) => {
        return <Responsive width="md">
          {(matches: boolean) =>
            matches ? (
              <SortOrderDropdown {...sortOrdersProps} />
            ) : (
              <Toggle initial={false}>
                {({on, toggle}) => (
                  <React.Fragment>
                    <Text
                      as={'span'}
                      onClick={toggle}
                      className={'refine-by'}
                    >
                      <T id={'sort.sortOrderDropdownLabel'}/>
                      <Icon
                        src={'dropdownArrowDown'}
                        fallback={'▾'}
                      />
                    </Text>
                    <Sidebar
                      isOpen={on}
                      side="left"
                      close={toggle}
                    >
                      <FlexLayout flexDirection={'column'}>
                        <Box
                          css={getMobileSortingHeaderStyles()}
                        >
                          <Text css={{
                            fontSize: 18
                          }}>
                            <T id={'sort.sortOrderDropdownLabel'}/>
                          </Text>
                          <Icon
                            onClick={toggle}
                            css={{
                              stroke: themedColors.black,
                              position: 'absolute',
                              top: '50%',
                              right: 0,
                              transform: 'translateY(-50%)'
                            }}
                            src={'buttonArrowRight'}
                          />
                        </Box>
                        <SortOrderMobile toggle={toggle} {...sortOrdersProps} />
                      </FlexLayout>
                    </Sidebar>
                  </React.Fragment>
                )}
              </Toggle>
            )
          }
        </Responsive>
      }}
    </SortOrdersProvider>
  );
}

export default SortOrderDropdownPlp;
