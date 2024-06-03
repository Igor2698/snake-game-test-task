import Square from "./Square";




const Board = () => {

    const squares = [];
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            squares.push({ x, y, index: '' + x + y })
        }
    }

    return (<div className="Board">
        {squares.map(square => <span key={square.index}><Square square={square} /></span>)}
    </div>)

}

export default Board

