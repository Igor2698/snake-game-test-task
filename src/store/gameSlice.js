import { createSlice } from "@reduxjs/toolkit";
import { addDates } from "./operations";

import { getValidCoordinate } from "../helpers";

const gameSlice = createSlice({
    name: "game",
    initialState: {
        name: null,
        status: 'Start',
        statusValues: {
            Start: 'Pause',
            Pause: 'Resume',
            Resume: 'Pause',
        },
        isGameOver: false,
        score: 0,
        snake: [
            { x: 0, y: 0 },
            { x: 1, y: 0 }
        ],
        snakeHead: { x: 1, y: 0 },
        banana: { x: null, y: null },
        strawberry: { x: '', y: '' },
        snakeSize: 2,
        direction: 'KeyD',
        stopKeyCombinations: [
            ['KeyW', 'KeyS'],
            ['KeyS', 'KeyW'],
            ['KeyA', 'KeyD'],
            ['KeyD', 'KeyA'],
            ['ArrowUp', 'ArrowDown'],
            ['ArrowDown', 'ArrowUp'],
            ['ArrowLeft', 'ArrowRight'],
            ['ArrowRight', 'ArrowLeft'],
            ['ArrowUp', 'KeyS'],
            ['ArrowDown', 'KeyW'],
            ['ArrowLeft', 'KeyD'],
            ['ArrowRight', 'KeyA'],

        ],
        apple: { x: 1, y: 1 },
        savedKey: 'KeyD',
        allowedValues: ["KeyS", 'KeyW', 'KeyD', 'KeyA', "ArrowUp", "ArrowLeft", "ArrowRight", "ArrowDown"]
    },
    reducers: {
        setName(state, action) {
            state.name = action.payload
        },
        checkBanana(state) {
            const { x: xSnakeHead, y: ySnakeHead } = state.snakeHead;
            const { x: xBanana, y: yBanana } = state.banana;
            if (xSnakeHead === xBanana && ySnakeHead === yBanana) {
                console.log('AUFFF')
                state.banana = {
                    x: "",
                    y: ""
                };
                state.snakeSize += 1;
                state.score += 5;
            }
        },
        checkStrawberry(state) {
            console.log('YOU ARE HERE!!!')
            const { x: xSnakeHead, y: ySnakeHead } = state.snakeHead;
            const { x: xStrawberry, y: yStrawberry } = state.strawberry;

            if (xSnakeHead === xStrawberry && ySnakeHead === yStrawberry) {

                state.strawberry = {
                    x: "",
                    y: ""
                };
                state.snakeSize += 1;
                state.score += 10;
            }
        },
        checkApple(state) {
            const { x: xSnakeHead, y: ySnakeHead } = state.snakeHead;
            const { x: xApple, y: yApple } = state.apple

            if (xSnakeHead === xApple && ySnakeHead === yApple) {
                const { x, y } = getValidCoordinate(state.snake);
                state.apple = {
                    x,
                    y,
                };
                state.snakeSize += 1;
                state.score += 1;
            }

        },
        clearStrawberry(state) {
            state.strawberry = {
                x: "",
                y: ""
            };
        },
        clearBanana(state) {
            state.banana = {
                x: "",
                y: ""
            };
        },
        changeStatus(state) {
            state.status = state.statusValues[state.status]
        },
        moveSnake(state) {
            if (state.status === 'Restart' || state.isGameOver) return;
            let { x, y } = state.snakeHead;
            switch (state.direction) {
                case 'KeyD':
                case "ArrowRight":
                    x = (x >= 9) ? 0 : x + 1;
                    break;
                case 'KeyA':
                case "ArrowLeft": x = (x <= 0) ? 9 : x - 1; break;
                case "KeyW":
                case "ArrowUp": y = (y <= 0) ? 9 : y - 1; break;
                case "KeyS":
                case "ArrowDown": y = (y >= 9) ? 0 : y + 1; break;
                default: break;
            }
            state.snakeHead = { x, y };
            state.snake.push({ x, y });
            state.snake = state.snake.slice(-state.snakeSize);
        },

        setDirection(state) {
            if (state.allowedValues.includes(state.savedKey)) state.direction = state.savedKey;
        },

        saveKey(state, action) {
            for (let [a, b] of state.stopKeyCombinations) {
                if (a === state.direction && b === action.payload) return;
            }
            state.savedKey = action.payload;
        },
        checkGameover(state) {

            const crashing = state.snake.some((element, index, self) => {
                return index !== self.findIndex((el) => (
                    el.x === element.x && el.y === element.y
                ));
            });
            if (crashing) {
                state.isGameOver = "true"
                state.snake = [{
                    x: 0, y: 0
                }]
                state.status = "Restart"
            }
        },
        setBanana(state) {
            const { x, y } = getValidCoordinate(state.snake);
            state.banana = {
                x,
                y,
            }
        },
        setStrawberry(state) {
            const { x, y } = getValidCoordinate(state.snake);
            state.strawberry = {
                x,
                y,
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addDates.fulfilled, (state, action) => {
                console.log(action.payload)
            })

    }
})


export const gameReducer = gameSlice.reducer;


export const { changeStatus, moveSnake, setBanana, clearStrawberry, clearBanana, checkStrawberry, checkBanana, setStrawberry, setName, setDirection, saveKey, checkApple, checkGameover } = gameSlice.actions;