export const getRandomCoordinate = () => Math.floor(Math.random() * 10);

export const getValidCoordinate = (snake) => {
    let newX, newY;
    let isValidCoordinate;
    do {
        newX = getRandomCoordinate();
        newY = getRandomCoordinate();
        isValidCoordinate = !snake.some(s => s.x === newX && s.y === newY);
    } while (!isValidCoordinate);
    return { x: newX, y: newY };
};
