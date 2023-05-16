import React from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import hangul from 'hangul-js';

const KoreanKey = () => {
  const [input, setInput] = React.useState('');

  const onChange = (input) => {
    setInput(input);
    console.log('Input changed', input);
  };

  const onKeyPress = (button) => {
    if (button === '{bksp}') {
      setInput(input.slice(0, -1));
    } else if (button === '{space}') {
      setInput(input + ' ');
    } else if (button === '{enter}') {
      setInput(input + '\n');
    } else {
      setInput(input + hangul.assemble([button]));
    }
  };

  return (
    <div>
      <input value={input} />
      <Keyboard
        onChange={onChange}
        onKeyPress={onKeyPress}
        layout={{
          default: [
            'ㅂ ㅈ ㄷ ㄱ ㅅ ㅛ ㅕ ㅑ ㅐ ㅔ',
            'ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ',
            'ㅃ ㅉ ㄸ ㄲ ㅆ ㅛ ㅕ ㅑ ㅒ ㅖ',
            'ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ',
            '{shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ',
            '{bksp} {space} {enter}',
          ],
          shift: [
            'ㅃ ㅉ ㄸ ㄲ ㅆ ㅛ ㅕ ㅑ ㅒ ㅖ',
            'ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ',
            '{shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ',
            '{bksp} {space} {enter}',
          ],
        }}
        display={{
          '{bksp}': '⌫',
          '{shift}': '⇧',
          '{space}': ' ',
          '{enter}': '↵',
        }}
        theme='hg-theme-default hg-layout-numeric numeric-theme'
        layoutName='default'
      />
    </div>
  );
};

export default KoreanKey;
