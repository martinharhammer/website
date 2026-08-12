const mazeBuilder = {
    createPath(blocks, grid) {
        let currentX = rand(blocks);
        let currentY = rand(blocks);
        grid[idx(currentX, currentY, blocks)] = 1;

        while (true) {
            const neighbors = [];
            if (currentX > 0 && grid[idx(currentX - 1, currentY, blocks)] === 0) neighbors.push([currentX - 1, currentY]);
            if (currentX < blocks - 1 && grid[idx(currentX + 1, currentY, blocks)] === 0) neighbors.push([currentX + 1, currentY]);
            if (currentY > 0 && grid[idx(currentX, currentY - 1, blocks)] === 0) neighbors.push([currentX, currentY - 1]);
            if (currentY < blocks - 1 && grid[idx(currentX, currentY + 1, blocks)] === 0) neighbors.push([currentX, currentY + 1]);

            if (neighbors.length === 0) break;

            [currentX, currentY] = neighbors[rand(neighbors.length)];
            grid[idx(currentX, currentY, blocks)] = 1;
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
                ctx.fillRect(x * blockSize + 1, y * blockSize + 1, blockSize - 2, blockSize - 2);
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
