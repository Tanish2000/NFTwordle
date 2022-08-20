import { useContext } from 'react';
import { AppContext } from '../App';

const GameOver = () => {
    const { targetWord, gameResult } = useContext(AppContext);
    return (
    <div className='result'>
        <div className='result_box'>
            { gameResult ?
                <div>
                    <h3>🎉 Congratulations</h3>
                </div> 
                :<div>
                    <h3>😔 Better Luck next time!</h3>
                    <span style={{display : 'block' , marginBottom : '10px'}}>Word - { targetWord.toUpperCase() }</span>

                </div> 
            }            
            <button className='play_again' onClick={()=> window.location.reload()}>Play Again</button>
        </div>
    </div>
  )
}

export default GameOver