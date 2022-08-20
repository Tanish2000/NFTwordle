import './App.css';
import ValidWords from './wordList.txt'
import Board from "./components/Board"
import KeyBoard from './components/KeyBoard';
import { defaultBoard , keys, boardColors, getWordSet } from './components/DefaultValues'; 
import { useState , createContext, useEffect , useCallback, useLayoutEffect } from "react"

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(defaultBoard);
  const [boardColor, setBoardColor] = useState(boardColors);
  const [wordSet, setWordSet] = useState();
  const [currAttempt , setcurrAttempt] = useState({
    attempt : 0,
    currLetterPos : 0
  }) 
  const [targetWord, setTargetWord ] = useState(null);

  const onEnter = () => {
    if(currAttempt.currLetterPos === 5) {
      const currAttempWord = board[currAttempt.attempt].reduce((acc, letter )=> acc += letter, "").toLowerCase();
      
      if(!wordSet.has(currAttempWord)) {
        alert("Invalid Word");
        return;
      }
      
      if(currAttempWord === targetWord) {
        alert("Right Guess");
        window.location.reload();
      }
      else {
        const newColorArray = new Array(5).fill(0);
        for(let i = 0 ; i < 5 ; i++)
        {
          if(currAttempWord[i] === targetWord[i]) newColorArray[i] = 2
          else if(targetWord.includes(currAttempWord[i])) newColorArray[i] = 1
        }
        const newBoardColor = [...boardColor];
        newBoardColor[currAttempt.attempt] = newColorArray;
        setBoardColor(newBoardColor);
      }
      setcurrAttempt({
        attempt : currAttempt.attempt + 1,
        currLetterPos : 0
      })
    };
  }

  const onKeyPress = (keyVal) => {
    if(currAttempt.currLetterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.currLetterPos] = keyVal;
    setBoard(newBoard);
    setcurrAttempt({
      ...currAttempt,
      currLetterPos : currAttempt.currLetterPos + 1
    })
  } 
  
  const onDelete = () => {
    if(currAttempt.currLetterPos === 0 ) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.currLetterPos - 1] = "";
    setBoard(newBoard);
    setcurrAttempt({
      ...currAttempt,
      currLetterPos : currAttempt.currLetterPos - 1
    })
  }

  const handleKeyDown = useCallback((e) => {
    if(e.key === "Enter") onEnter();
    else if (e.key === "Backspace") onDelete();
    else {
      const keysArray = keys.join().split(',');
      keysArray.forEach((key)=> {
        if(e.key.toUpperCase() === key)
          onKeyPress(key);
      })  
    }
  }, [currAttempt])

  useEffect(()=> {
    document.addEventListener('keydown' , handleKeyDown)
    return ()=> {
      document.removeEventListener('keydown' , handleKeyDown );
    }
  }, [handleKeyDown])

  useLayoutEffect(() => {
    getWordSet(ValidWords).then((res)=> {
      setTargetWord(res.randomWord);
      setWordSet(res.wordSet);
    })
  }, [])
  
  return (
    <div className="App">
      <nav>
        <span>Wordle</span>
      </nav>
      <AppContext.Provider 
        value={{
          board,
          setBoard,
          currAttempt,
          onKeyPress,
          onEnter,
          onDelete,
          boardColor
      }}>
        <Board />
        <KeyBoard />
      </AppContext.Provider>
    </div>
  );
}

export default App;
