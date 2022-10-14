// import logo from './logo.svg';
import './App.css';
import { GlobalStyles } from './styless/global';
import TypingBox from './components/TypingBox'
 //             --- creating the random words function through inbuild --- 
 var randomWords = require('random-words');

function App() {

  const words = randomWords(50);
  console.log('')
  return (
    <div className="canvas">
      <GlobalStyles/>
      <h1 className='heading' style={{textAlign:'center'}}>Typing Website</h1>
      <TypingBox words={words}/>
      <h1 style={{textAlign:'center'}}>Footer</h1>
    </div>
  );
}

export default App;
