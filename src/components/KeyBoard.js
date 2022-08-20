import { useContext, useMemo } from "react";
import { keys } from "./DefaultValues"
import { AppContext } from '../App';
import Key from "./Key";

const KeyBoard = () => {
    const { boardColor , board } = useContext(AppContext);
    const disabledkeySet = useMemo(()=> {
        const newSet = new Map();
        board.forEach((row, row_idx)=> {
            row.forEach((letter, col_idx)=> {
                if(boardColor[row_idx][col_idx] === 0) newSet.set(letter, boardColor[row_idx][col_idx])
            })
        })
        // console.log()
        return newSet;
    }, [boardColor]);

    return (
        <div className='keyboard'>
            <div className='key_row'>
                {
                    keys[0].map((keyVal, idx) => <Key keyVal={keyVal} key={idx} disable={disabledkeySet.has(keyVal)}/>)
                }
            </div>
            <div className='key_row'>
                {
                    keys[1].map((keyVal, idx) => <Key keyVal={keyVal} key={idx} disable={disabledkeySet.has(keyVal)}/>)
                }
            </div>
            <div className='key_row'>
                <Key keyVal={"Enter"} />
                {
                    keys[2].map((keyVal, idx) => <Key keyVal={keyVal} key={idx} disable={disabledkeySet.has(keyVal)}/>)
                }
                <Key keyVal={"Delete"} />
            </div>
        </div>
    )
}

export default KeyBoard