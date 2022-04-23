import React, { createRef, useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { Flex, Input, InputProps, Text } from '@chakra-ui/react';
import { createUserInput } from 'src/utils/styles';
import useOnClickOutside from 'src/utils/useOnClickOutside';
import useCustomDebounce from 'src/utils/useCustomDebounce';

const AutoComplete: React.FC<Props> = ({
  onChange,
  options,
  onClick,
  value,
  onLostFocus,
  ...props
}) => {
  const [suggestions, setSuggestion] = useState<Options[]>([]);
  const [cursor, setCursor] = useState(0);
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState('');

  const [isTouched, setIsTouched] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const autocompleteRef = createRef<HTMLDivElement>();
  const suggestionRef = useRef<HTMLDivElement[]>([]);

  const select = (index: number) => {
    const selected = suggestions[index];

    if (_.isNil(selected)) return;

    setCursor(index);
    setInput(options[index].label);
    onChange(selected);
    setVisible(false);
  };

  const moveCursorUp = () => {
    if (cursor === 0) return;

    suggestionRef.current[cursor - 1]?.scrollIntoView();
    setCursor((c) => c - 1);
  };

  const moveCursorDown = () => {
    if (cursor + 1 > suggestions.length - 1) return;

    suggestionRef.current[cursor + 1]?.scrollIntoView();
    setCursor((c) => c + 1);
  };

  const _handleNav = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowUp':
        moveCursorUp();
        break;
      case 'ArrowDown':
        moveCursorDown();
        break;
      case 'Enter':
        if (cursor >= 0 && cursor < options.length) select(cursor);
        e.preventDefault();
        break;
    }
  };

  const _onChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;

    const filtered = _.filter(options, (option) =>
      _.includes(option.label.toLowerCase(), userInput.toLowerCase())
    );

    setInput(userInput);
    setSuggestion(filtered);
    setCursor(0);
    setVisible(true);

    if (_.trim(userInput) === '')
      onChange({
        value: '',
        label: '',
      });
  };

  const _onClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setVisible(false);
    onClick?.(e);
    setIsTouched(true);
  };

  useOnClickOutside(autocompleteRef, () => {
    if (!isTouched) return;

    setVisible(false);
    setIsTouched(false);
    onLostFocus(input);
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useCustomDebounce(
    () => {
      if (!isLoaded && isChanged) return;

      if (!value) return;

      setInput(value.label);
      setIsChanged(true);
    },
    250,
    [isLoaded]
  );

  return (
    <Flex position={'relative'} flexDirection={'column'} ref={autocompleteRef}>
      <Input
        value={input}
        onChange={_onChangeEvent}
        onClick={(e) => _onClick(e)}
        onKeyDown={_handleNav}
        {...props}
        {...createUserInput}
      />
      {visible && (
        <Flex>
          <Flex
            position={'absolute'}
            maxHeight={'10rem'}
            flexDirection={'column'}
            userSelect={'none'}
            overflow={'auto'}
            width={'100%'}
            zIndex={1}
            boxShadow={'md'}
          >
            {_.map(suggestions, (option, index) => {
              return (
                <Flex
                  p={2}
                  bg={cursor === index ? 'royalGray.200' : 'white'}
                  _hover={{
                    bg: 'royalGray.200',
                  }}
                  onClick={() => select(index)}
                  key={index}
                  ref={(el) => {
                    if (el) suggestionRef.current[index] = el;
                  }}
                >
                  <Text>{option.label}</Text>
                </Flex>
              );
            })}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export type Options = {
  value: string | number;
  label: string;
};

type Props = Omit<InputProps, 'value' | 'onChange' | 'onBlur'> & {
  onLostFocus: (label: string) => void;
  onChange: (value: Options) => void;
  options: Options[];
  value?: Options;
};

export default AutoComplete;
