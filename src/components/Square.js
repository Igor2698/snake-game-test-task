import { useSelector } from "react-redux";
import { ReactComponent as AppleIcon } from '../assets/apple-icon.svg';
import { ReactComponent as BananaIcon } from '../assets/banana.svg';
import { ReactComponent as StrawberryIcon } from '../assets/strawberry.svg';
import { ReactComponent as SnakeHeadIcon } from '../assets/snake-head-icon.svg';




export const Square = ({ square }) => {




    const { x, y } = square;
    let IconComponent = null;




    const snake = useSelector(store => store.game.snake);
    const apple = useSelector(store => store.game.apple);
    const banana = useSelector(state => state.game.banana)
    const strawberry = useSelector(state => state.game.strawberry);
    const snakeHead = useSelector(state => state.game.snakeHead);
    const direction = useSelector(state => state.game.direction);

    console.log(direction)


    let buttonStyle = "";

    for (let s of snake) {
        if (s.x === x && s.y === y) buttonStyle = "snake";
    }

    if (x === apple.x && y === apple.y) {
        IconComponent = AppleIcon;
        buttonStyle = "apple"
    }

    if (x === snakeHead.x && y === snakeHead.y) {
        IconComponent = SnakeHeadIcon;
        buttonStyle = "snake-head"

        switch (direction) {
            case "KeyD":
            case "ArrowRight":
                buttonStyle += " direction-right";
                break;
            case "KeyA":
            case "ArrowLeft":
                buttonStyle += " direction-left";
                break;
            case "KeyW":
            case "ArrowUp":
                buttonStyle += " direction-up";
                break;
            case "KeyS":
            case "ArrowDown":
                buttonStyle += " direction-down";
                break;
            default:
                buttonStyle += " direction-right";
        }
    }

    if (x === banana.x && y === banana.y) { IconComponent = BananaIcon; buttonStyle = "banana" }

    if (x === strawberry.x && y === strawberry.y) { buttonStyle = "strawberry"; IconComponent = StrawberryIcon }




    return (
        <span className="Square">

            <button className={buttonStyle}>{IconComponent && <IconComponent className="icon" />}</button>
        </span >
    )

}

export default Square