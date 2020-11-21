import React, {useCallback} from 'react';
import {Box, Input, Label} from '@market-ui/falcon-ui';
import {T} from "@market-ui/falcon-i18n";
import {SearchIcon} from "src/styling";
import {$semitransparentBlack} from "src/theme/variables";
import {colorsFromDesign, themedColors} from "src/theme/colors";
import {ICssObject} from "src/common/models";
import {SearchConsumer} from "src/uikitEjected/Search";
import {cssMobileTillMdOnly} from "src/styling/cssHelper";

export const HeaderSearch = () => {
  let productsSearchValue: HTMLInputElement;
  const updateTerm = useCallback((
    term: string,
    setTerm: (term: string) => void
  ): void => {
    if (term.length >= 3) {
      setTerm(term);
    }
  }, []);

  const handleKeyPress = useCallback((
    event:  React.KeyboardEvent<HTMLInputElement>,
    term: string,
    setTerm: (term: string) => void
  ) => {
    if (event.key === 'Enter' && term.length >= 3) {
      setTerm(term);
    }
  }, []);

  return <SearchConsumer>
    {(searchConsumerOutput: any) => {
      const {state, setTerm} = searchConsumerOutput;

      return (
        <Box css={getHeaderSearchStyles()}>
          <Input
            defaultValue={state.term}
            ref={inputValue => (productsSearchValue = inputValue)}
            onKeyPress={(e) => handleKeyPress(e, productsSearchValue.value, setTerm)}
            id="productsSearch"
            type="text"
            css={getInputStyles()}
          />
          <Label
            htmlFor="productsSearch"
            css={getIconWrapStyles()}
            className={'input-search-icon'}
            onClick={() => updateTerm(productsSearchValue.value, setTerm)}
          >
            <SearchIcon/>
          </Label>
          <Label
            className={'input-search-label'}
            htmlFor="productsSearch"
            css={getLabelStyles()}
          >
            <T id="headerSearch.searchLabel"/>
          </Label>
        </Box>
      );
    }}
  </SearchConsumer>
};

const getHeaderSearchStyles = () => ({
  display: "flex",
  position: "relative",
  width: '100%',
  maxWidth: 500,
  ...cssMobileTillMdOnly({
    maxWidth: 0
  })
});

const getIconWrapStyles = (): ICssObject => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: 'absolute',
  right: 0,
  top: '50%',
  transform: 'translateY(-50%)'
});

const getLabelStyles = (): ICssObject => ({
  fontSize: 11,
  color: `${$semitransparentBlack}`,
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  left: 0,
  ...cssMobileTillMdOnly({
    display: "none"
  })
});

const getInputStyles = (): ICssObject => ({
  height: 30,
  width: '100%',
  maxWidth: 500,
  fontSize: 15,
  padding: '0 30px 0 85px',
  background: 'transparent',
  border: 'none',
  borderBottom: `2px solid ${$semitransparentBlack}`,
  ':focus': {
    border: 'none',
    outline: 'none',
    borderBottom: `2px solid ${themedColors.black}`
  },
  ...cssMobileTillMdOnly({
    zIndex: -2,
    maxWidth: 0,
    ':focus': {
      zIndex: 0,
      position: "absolute",
      top: -15,
      right: 0,
      padding: '0 30px 0 30px',
      minWidth: 'calc(100vw - 50px);',
      background: colorsFromDesign.LightBrown
    },
  })
});
