import { useEffect, useState } from 'react';
import { saveKey } from '../store/gameSlice';
import './App.css';
import Board from './Board';
import Modal from './Modal';
import Status from './Status';
import { useDispatch, useSelector } from 'react-redux';
import { addDates, getDates } from '../store/operations';







function App() {
  const dispatch = useDispatch();

  const [dates, setDates] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const keyDownHandler = (event) => {
    dispatch(saveKey(event.code));
  }
  const isGameOver = useSelector(store => store.game.isGameOver);
  const score = useSelector(store => store.game.score)
  const name = useSelector(store => store.game.name)





  useEffect(() => {
    const fetchDates = async () => {
      try {
        const data = await getDates();
        setDates(data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchDates();
  }, []);


  useEffect(() => { if (isGameOver) dispatch(addDates({ first_name: name, score })) }, [isGameOver, dispatch, name, score])





  return (
    <div className="App" onKeyDownCapture={keyDownHandler}>
      {modalIsOpen && <Modal dates={dates} setModalIsOpen={setModalIsOpen} />}
      <span>Score: {score}</span>
      {isGameOver && <span className='game-over-text'>GAME OVER!!!!!!!</span>}
      <Board />
      <Status />

    </div>
  );
}

export default App;
