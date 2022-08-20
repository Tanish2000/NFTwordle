const Letter = ({ letterValue , bg}) => {
  return (
    <div className='letter_box' id={bg === 2?'green': (bg === 1 ? 'yellow' : (bg === 0 ? 'disabled' : ''))}>
        <span>{ letterValue }</span>
    </div>
  )
}

export default Letter