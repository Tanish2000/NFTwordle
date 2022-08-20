export const defaultBoard = [
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','','']
]

export const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
]

export const boardColors = [
    [-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1]
]

export const getWordSet = async(fileAddress) => {
    const data = await fetch(fileAddress);
    const res = await data.text();
    const wordsArray = res.split("\r\n");
    const randomWord  = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    const wordSet = new Set(wordsArray);
    return { wordSet , randomWord };   
}