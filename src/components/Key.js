import { useContext } from 'react'
import { AppContext } from '../App'

const Key = ({ keyVal, disable }) => {
  const { onKeyPress, onEnter, onDelete } = useContext(AppContext);
  const handleClick = () => {
    if(keyVal === "Enter") onEnter();
    else if(keyVal === "Delete") onDelete();
    else {
      onKeyPress(keyVal);
    }
  }
  return (
    <div className="key" onClick={handleClick} id={disable? 'disabled' : ''}>{keyVal}</div>
  )
}

export default Key