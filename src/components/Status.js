import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef } from 'react';
import { changeStatus, moveSnake, setDirection, clearStrawberry, clearBanana, setStrawberry, checkStrawberry, checkBanana, checkApple, setBanana, checkGameover } from "../store/gameSlice";


const Status = () => {
    const status = useSelector(store => store.game.status);
    const score = useSelector(store => store.game.score);
    const banana = useSelector(store => store.game.banana);
    const strawberry = useSelector(store => store.game.strawberry)
    const interval = score < 50 ? 200 : 100;




    const dispatch = useDispatch();
    let immidiateTimer = useRef(null);
    let bananaTimer = useRef(null)
    let strawberyTimer = useRef(null)
    const strawberryExistTimer = useRef(null);
    const bananaExistTimer = useRef(null);

    const update = () => {
        dispatch(moveSnake());
        dispatch(setDirection());
        dispatch(checkApple());
        dispatch(checkGameover());
        dispatch(checkBanana())
        dispatch(checkStrawberry())
    }

    useEffect(() => {
        if (!strawberry.x && status === 'Pause') {
            strawberyTimer.current = setTimeout(() => dispatch(setStrawberry()), 14000);
        }
    }, [strawberry, dispatch, status])

    useEffect(() => {
        if (!banana.x && status === 'Pause') {
            bananaTimer.current = setTimeout(() => dispatch(setBanana()), 8000);
        }
    }, [banana, dispatch, status])

    useEffect(() => {
        if (strawberry.x) {
            strawberryExistTimer.current = setTimeout(() => {
                dispatch(clearStrawberry());
            }, 3500);
        } else {
            clearTimeout(strawberryExistTimer.current);
        }
    }, [strawberry, dispatch]);


    useEffect(() => {
        if (banana.x) {
            bananaExistTimer.current = setTimeout(() => {
                dispatch(clearBanana());
            }, 3500);
        } else {
            clearTimeout(bananaExistTimer.current);
        }
    }, [banana, dispatch]);




    useEffect(() => {
        if (status !== 'Pause' || status === 'Restart') {
            if (immidiateTimer.current) {
                clearInterval(immidiateTimer.current);
            }
        } else {
            immidiateTimer.current = setInterval(update, interval);
        }
        return () => clearInterval(immidiateTimer.current);
    }, [status, interval, banana]);

    const clickHandler = () => {
        if (status === 'Restart') {
            window.location.reload();
            return;
        }
        dispatch(changeStatus());
    };

    return <><button className='start-button' onClick={clickHandler}>{status}</button>
    </>
}


export default Status