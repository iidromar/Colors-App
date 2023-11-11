import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function generateRandomHexColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  return (
    <div className='App'>
      <RandomColorGenerator />
    </div>
  );
}

export default App;

export const RandomColorGenerator = () => {
  const [randomColor, setRandomColor] = useState(generateRandomHexColor());
  const [correctColor, setCorrectColor] = useState(randomColor);
  const [options, setOptions] = useState(generateOptionsColors());
  const [message, setMessage] = useState('');

  // know correct color when ever we have new generated random color so we can set it as correct color
  useEffect(() => {
    setCorrectColor(randomColor);
  }, [randomColor]);

  // change options when correct color changes so if you chose wrong color , the option remain the same
  useEffect(() => {
    setOptions(generateOptionsColors());
  }, [correctColor]);

  function generateOptionsColors() {
    const options = Array.from({ length: 2 }, () => generateRandomHexColor());
    options.push(randomColor);
    return shuffleArray(options);
  }

  const handleOptionClick = (selectedColor: any) => {
    if (selectedColor === correctColor) {
      setRandomColor(generateRandomHexColor());
      setMessage('');
    } else {
      setMessage('Wrong choice. Try again.');
    }
  };

  return (
    <div>
      <h2>Welcome to Solutions Colors App</h2>
      <h3>Could you guess the Color?</h3>
      <div
        style={{
          backgroundColor: randomColor,
          width: '100px',
          height: '100px',
          margin: '20px auto',
        }}
      />
      {/* <div>{randomColor}</div>
      <div>correct {correctColor}</div> */}

      <div
        style={{
          display: 'flex',
          gap: 10,
          justifyContent: 'center',
          margin: '20px 0',
        }}
      >
        {options.map((option: any) => (
          <div
            style={{
              border: '1px solid gray',
              padding: '2px',
              cursor: 'pointer',
              // backgroundColor: 'lightgray',
              // color: 'white',
            }}
            onClick={() => handleOptionClick(option)}
          >
            {' '}
            {option}
          </div>
        ))}
      </div>
      <div style={{ color: 'red' }}>{message}</div>
    </div>
  );
};
