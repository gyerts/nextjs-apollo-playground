import React, {CSSProperties, useCallback, useState} from 'react';
import PlacesAutocomplete, {
  Suggestion,
} from 'react-places-autocomplete';
import {Box, FlexLayout, Text} from "@market-ui/falcon-ui";
import {useFormikContext} from "formik";
import {IReformattedFromGoogleAddress, parseAddress} from "./common/parseAddress";


interface IProps {
  gridArea: string
  name?: string
  autoComplete?: string
  autoCompleteOptions: {
    country: string
  }
  setAddress?: (props: IReformattedFromGoogleAddress) => void
  children: (props: {googleAutocompleteProps: any}) => React.ReactElement
  placeholder?: string
}

/**
 * https://app.zeplin.io/project/5f10358f95f8319efc97669f/screen/5f1eb2ed2b5b4f44f7653281
 */
export const GooglePlacesAutocomplete = ({autoCompleteOptions, gridArea, ...props}: IProps) => {
  const [address, setAddress] = useState('');
  const { setFieldValue } = useFormikContext();

  const handleSelect = useCallback((address: string) => {
    const addressObject = parseAddress(address);
    setAddress( addressObject.streetName );
    props.setAddress && props.setAddress(addressObject);

    setFieldValue('street1', addressObject.streetName || '');
    setFieldValue('street2', addressObject.streetNumber || '');
    setFieldValue('city', addressObject.city || '');
  }, []);

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
      searchOptions={{
        componentRestrictions: {
          country: [autoCompleteOptions.country],
        },
        types: ['address']
      }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <Box
          gridArea={gridArea}
          position='relative'
        >
          {props.children({
            googleAutocompleteProps: {
              ...getInputProps({ placeholder: props.placeholder }),
            }
          })}
          <AutoCompleteList
            suggestions={suggestions}
            loading={loading}
            getSuggestionItemProps={getSuggestionItemProps}
          />
        </Box>
      )}
    </PlacesAutocomplete>
  );
};

/**
 * AutoCompleteList
 */
interface IAutoCompleteListProps {
  suggestions: ReadonlyArray<Suggestion>
  loading: boolean
  getSuggestionItemProps: IFnGetSuggestionItemProps
}
const AutoCompleteList = ({suggestions, loading, getSuggestionItemProps}: IAutoCompleteListProps) => {
  return (
    <Box
      className="autocomplete-dropdown-container"
      position='absolute'
      css={{
        display: suggestions.length ? 'block' : 'none',
        marginTop: -11,
        width: '100%',
        border: `1px solid ${suggestions.length ? '#F8F5F0' : '#E0E1E2'}`,
        borderTop: 'unset',
      }}
      bg='white'
    >
      {/*{loading && <Loading size='lg' />}*/}
      {suggestions.map(suggestion => (
        <AutoCompleteItem
          key={suggestion.description}
          suggestion={suggestion}
          getSuggestionItemProps={getSuggestionItemProps}
        />
      ))}
      <FlexLayout justifyContent='flex-end' m="xs">
        <img style={{width: 100}} src="/powered_by_google.png" alt="powered by google" />
      </FlexLayout>
    </Box>
  );
};

/**
 * AutoCompleteItem
 */
interface IAutoCompleteItemProps {
  suggestion: Suggestion
  getSuggestionItemProps: IFnGetSuggestionItemProps
}
const AutoCompleteItem = ({suggestion, getSuggestionItemProps}: IAutoCompleteItemProps) => {
  const splittedAddr = suggestion.description.split(',').map(addr => addr.trim());
  const firstAddr = splittedAddr[0];
  const other = splittedAddr.slice(1, splittedAddr.length).join(', ');

  return (
    <Box {...getSuggestionItemProps(suggestion, { style: style(suggestion.active) })}>
      <Text color='black'>{firstAddr}</Text>&nbsp;<Text color={'grey' as any}>{other}</Text>
    </Box>
  );
};

// inline style for demonstration purpose
const activeStyles = {
  backgroundColor: '#f8f8f8', cursor: 'pointer'
};
const style = (active: boolean): CSSProperties => ({
  backgroundColor: 'white',
  cursor: 'pointer',
  padding: '10px 18px',
  height: 40,
  display: 'flex',
  alignItems: 'center',
  ...(active ? activeStyles : {})
});

type IFnGetSuggestionItemProps = <SuggestionProps extends {}>(suggestion: Suggestion, options?: SuggestionProps) => {
  key: number;
  id: string | undefined;
  role: 'option';
  onMouseEnter: React.MouseEventHandler;
  onMouseLeave: React.MouseEventHandler;
  onMouseDown: React.MouseEventHandler;
  onMouseUp: React.MouseEventHandler;
  onTouchStart: React.TouchEventHandler;
  onTouchEnd: React.TouchEventHandler;
  onClick: React.MouseEventHandler;
} & SuggestionProps;
