import * as React from 'react';

import styled from 'styled-components';

const Input = styled.input``;


const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setText: (text: string) => void) => {
  e.preventDefault();
  const newText = e.target.value;

  setText(newText);
};

interface InputProps {
  onChange: (text: string) => void;
}
const TextInput:React.FC<InputProps> = (props) => {
  const [text, setText] = React.useState<string>('');

  return (<Input value={text} onChange={(e) => {handleChange(e, setText); props.onChange(e.target.value)} } />);
};

export default TextInput;
