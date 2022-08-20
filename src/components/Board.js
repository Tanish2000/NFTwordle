import React , { useContext } from 'react'
import Letter from "./Letter";
import { AppContext } from '../App';

const Board = () => {
  const { board, boardColor } = useContext(AppContext);
  return (
    <div className="guess_board">
    {
        board.map((row,row_idx)=> {
            return <div className='word_row' key={row_idx}>
                {
                    row.map((letterValue, letter_index)=>  <Letter letterValue={letterValue} key={letter_index} bg={boardColor[row_idx][letter_index]} />)
                }
            </div>
        })
    }
    </div>
  )
}

export default Board;