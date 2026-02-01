const mazeBuilder = {
    createPath(blocks, grid) {
        let currentX = rand(blocks);
        let currentY = rand(blocks);

        while (true) {
            grid[idx(currentX, currentY, blocks)] = 1;

            const dir = rand(4);
            let nextX = currentX;
            let nextY = currentY;

            if (dir === 0) nextX--;
            else if (dir === 1) nextY--;
            else if (dir === 2) nextX++;
            else nextY++;

            if (nextX < 0 || nextX >= blocks || nextY < 0 || nextY >= blocks) break;

            currentX = nextX;
            currentY = nextY;
        }
    }

}

const idx = (x, y, blocks) => y * blocks + x;
const rand = (max) => Math.floor(Math.random() * max);

document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    const length = canvas.width;
    const blockSize = 20;
    const blocks = Math.floor(length / blockSize);

    const grid = new Uint8Array(blocks * blocks);
    mazeBuilder.createPath(blocks, grid);

    for (let y = 0; y < blocks; y++) {
        for (let x = 0; x < blocks; x++) {
            if (grid[idx(x, y, blocks)] === 1) {
                ctx.fillStyle = 'red';
                ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
            }
        }
    }

    for (let i = 0; i < blocks; i++) {
        ctx.beginPath();
        ctx.moveTo(blockSize * i, 0);
        ctx.lineTo(blockSize * i, length);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, blockSize * i);
        ctx.lineTo(length, blockSize * i);
        ctx.stroke();
    }

});
