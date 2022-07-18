import _ from 'lodash';
import React, { useState } from 'react';
import Autosuggest, { ChangeEvent } from 'react-autosuggest';
import { defaultTheme } from 'react-autosuggest/dist/theme';
import { connect, ConnectedProps } from 'react-redux';
import { Flex, Input, Text } from '@chakra-ui/react';
import styles from './AutoComplete.module.css';
import { IOrangTua, ReactSetter } from 'src/utils/interface';
import { RootState } from 'src/store';
import * as resources from 'src/store/selectors/resources';
import { IFlexibleResource } from 'src/utils/resourceInterface';
import { RESOURCE_NAME } from 'src/utils/constant';
import { createUserInput } from 'src/utils/styles';

const renderSuggestion = ({ namaLengkap }: IOrangTua) => (
  <Flex px="1rem" py="0.7rem" alignItems="center" gap={3} borderBottom="1px solid black">
    <Text fontWeight="semibold" fontSize="sm">
      {namaLengkap}
    </Text>
  </Flex>
);

const AutoComplete: React.FC<Props> = ({
  keyword,
  setKeyword,
  orangTuas,
  placeholder,
  isRequired,
  setOrangTuaId,
  onBlur,
  onFocus,
  setIsError,
  setIsTouched,
}) => {
  const [suggestions, setSuggestions] = useState<IOrangTua[]>([]);

  const getSuggestions = (data: IFlexibleResource<'orang-tuas'>, value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : _.values(data.rows).filter(({ namaLengkap }) =>
          namaLengkap.toLowerCase().includes(inputValue)
        );
  };

  /** Function to handle clicking on the option */
  const getSuggestionValue = (orangTua: IOrangTua) => {
    setOrangTuaId(orangTua.id);
    setIsError('');
    setIsTouched(true);

    return orangTua.namaLengkap;
  };

  /** Function to handle changing input value */
  const onChange = (event: React.FormEvent<HTMLElement>, { newValue }: ChangeEvent) => {
    setKeyword(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(orangTuas, value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: 'Nama Orang Tua',
    value: keyword,
    onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderInputComponent={(props: any) => (
        <Input
          type="text"
          placeholder={placeholder ?? 'Nama Orang Tua'}
          isRequired={isRequired}
          letterSpacing="wider"
          {...createUserInput}
          onBlur={() => {
            props?.onBlur?.();
            onBlur();
          }}
          onFocus={() => {
            props?.onFocus?.();
            onFocus();
          }}
          {..._.omit(props, ['onBlur', 'onFocus'])}
        />
      )}
      theme={{
        ...defaultTheme,
        input: styles.input,
        inputFocused: styles.inputFocused,
        suggestionsContainer: styles.suggestionsContainer,
        suggestionsContainerOpen: styles.suggestionsContainerOpen,
        suggestionsList: styles.suggestionsList,
        suggestion: styles.suggestion,
        suggestionHighlighted: styles.suggestionHighlighted,
      }}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  orangTuas: resources.getResource(RESOURCE_NAME.ORANG_TUAS)(state),
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector> & {
  keyword: string;
  setKeyword: ReactSetter<string>;
  isRequired?: boolean;
  placeholder?: string;
  setOrangTuaId: ReactSetter<number | undefined>;
  onFocus: () => void;
  onBlur: () => void;
  setIsError: ReactSetter<string>;
  setIsTouched: ReactSetter<boolean>;
};

export default connector(AutoComplete);
