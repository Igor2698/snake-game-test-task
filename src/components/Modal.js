import { useDispatch } from "react-redux";
import { setName } from "../store/gameSlice";
import { useState } from "react";


const Modal = ({ setModalIsOpen, dates }) => {
    const [enteredSymbols, setEnteredSymbols] = useState('');




    const dispatch = useDispatch();
    const handleSubmit = (ev) => {
        ev.preventDefault();
        dispatch(setName(enteredSymbols))
        setModalIsOpen(false)
    }
    const sortedDates = dates.sort((a, b) => b.score - a.score).slice(0, 5)


    return <div className="backdrop">
        <div className="modal-wrapper">
            <h1>Gamer Scores</h1>
            <ul className="gamer-list"> {sortedDates.map((gamer) => <li className="gamer-item" key={gamer.id}><p className="gamer-name">{gamer.first_name}</p><p className="gamer-score">{gamer.score}</p></li>)}</ul>
            <form onSubmit={handleSubmit}>
                <label id="name">Please enter your name</label>
                <input value={enteredSymbols} onChange={(ev) => setEnteredSymbols(ev.target.value)} type="text" id="name" name="name" />
                <button disabled={enteredSymbols.length <= 2}>Save</button>
            </form>
        </div>
    </div>
}


export default Modal