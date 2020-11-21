import React from 'react';
import {T} from '@market-ui/falcon-i18n';
import {Box, Button, FlexLayout, Text} from '@market-ui/falcon-ui';
import {
  SearchConsumer,
} from 'src/uikitEjected';
import styled from "styled-components";
import {
  FiltersLayout,
  FiltersSummary,
  FilterTile,
} from "src/components/Filters";
import {themedBreakpoints} from "src/theme/breakpoints";
import {colorsFromDesign, themedColors} from "src/theme/colors";
import {getBgFullWidth} from "../../../utils/cssMixins";
import {FilterOperator} from "../../../uikitEjected/Search";

const FiltersInner = (props) => {
  const {data, isMobile, close, className, ...rest} = props;

  return <div className={className}>
    <SearchConsumer>
      {(props) => {
        const {state: {filters}, setFilter, removeFilters} = props;

        const applyHandler = () => {
          close();
        }

        return <>
          <FiltersLayout {...rest}
                         display={'flex'}
                         flexDirection={'column'}
                         css={{position: 'relative'}}>
            <div className={`filters-wrap`}>
              {data.map(({field, title, options, value}) => {
                return <FilterTile
                  key={field}
                  title={title}
                  initiallyOpen={false}
                  options={options}
                  selected={value}
                  onChange={x => setFilter(field, x, FilterOperator.equals)}
                />
              })}
            </div>
            {isMobile ?
              <Box css={getMobileFiltersFooterStyles()}
                   pt={'xl'}
                   pb={'xl'}>
                <Button onClick={applyHandler}
                        css={{
                          width: 'calc(100% - 40px)',
                          fontWeight: 600,
                          zIndex: 3
                        }}>
                  <T id={'filters.viewItems'}/>
                </Button>
              </Box>
              : null}
          </FiltersLayout>
          <FlexLayout className={'filters-summary-desktop'}>
            <FiltersSummary data={data}/>
            {filters.length > 0 && (
              <Text onClick={removeFilters}
                    pr={'xs'}
                    pl={'xs'}
                    css={{
                      textDecoration: 'underline',
                      cursor: 'pointer'
                    }}>
                <T id="filters.clearAll"/>
              </Text>
            )}
          </FlexLayout>
        </>
      }}
    </SearchConsumer>
  </div>
};

const getMobileFiltersFooterStyles = () => (
  {
    background: colorsFromDesign.LighterGrey,
    position: 'fixed',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    width: '100%',
    height: '120px',
    ...getBgFullWidth({
      background: colorsFromDesign.LighterGrey
    })
  }
);

const Filters = styled(FiltersInner)`
.multiple-filter-checkbox input:checked + .-inner-checkbox-frame {
  background: ${themedColors.black};
  border-color: ${themedColors.black};
}

.filters-wrap {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}

.filter-summary-wrap {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

.filter-item-list {
  display: flex;
  flex-wrap: wrap;
  max-width: 560px;
  width: max-content;
  position: absolute;
  top: 100%;
  background: ${themedColors.white};
  border: 1px solid #d1d1d1;
  max-height: 390px;
  overflow-y: scroll;
}

.multiple-filter-label-title,
.multiple-filter-label-count {
  font-weight: 400;
}

.multiple-filter-label-title {
  margin-left: 10px;
  margin-right: 10px;
  width: 125px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.multiple-filter-label-count {
  display: none;
}


@media (max-width: ${themedBreakpoints.md}px) {
  .filters-summary-desktop {
    display: none;
  }

  .filters-wrap {
    flex-direction: column;
    margin-bottom: 120px;
    overflow-y: scroll;
    overflow-x: hidden;
    height: calc(100vh - 179px);
    flex-wrap: nowrap;
    .themed-details {
      &:first-child {
        .filter-summary-wrap {
          &:after {
            display: none;
          }
        }
      }
    }
  }

  .filter-summary-wrap {
    padding: 24px 0;
    &:after {
      content: "";
      width: 200vw;
      height: 1px;
      background: #000;
      position: absolute;
      right: -50vw;
      top: 0;
      z-index: -1;
    }
  }

  .filter-item-list {
    position: static;
    flex-direction: column;
    border: none;
    max-width: none;
    width: 100%;
  }

  .multiple-filter-label {
    width: calc(100% - 36px);
    display: flex !important;
    justify-content: space-between;
  }

  .multiple-filter-label-count {
    font-size: 14px;
    color: #7b7b7b;
    display: block;
  }
}
`;

export default Filters;
