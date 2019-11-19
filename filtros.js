function toData(x, y, width) {
    return y*width*4 + x*4;
}

function subtractPixel(data, coord1, coord2) {
    r = data[coord1] - data[coord2];
    g = data[coord1+1] - data[coord2+1];
    b = data[coord1+2] - data[coord2+2];
    return (Math.abs(r) + Math.abs(g) + Math.abs(b))/3 
}

function negative(ctx) {
    let width = ctx.canvas.width;
    let height = ctx.canvas.height;
    let imgData = ctx.getImageData(0, 0, width, height);
    let d = imgData.data;
    for(i = 0; i < width * height * 4; i+=4) {
        d[i] = 255-d[i];
        d[i+1] = 255-d[i+1];
        d[i+2] = 255-d[i+2];
    }
    ctx.putImageData(imgData, 0, 0);
}

function hell(ctx) {
    let width = ctx.canvas.width;
    let height = ctx.canvas.height;
    let imgData = ctx.getImageData(0, 0, width, height);
    let d = imgData.data;
    for(i = 0; i < width * height * 4; i+=4) {
        d[i+1] = 0;
        d[i+2] = 0;
    }
    ctx.putImageData(imgData, 0, 0);
}

function borda(ctx) {
    let width = ctx.canvas.width;
    let height = ctx.canvas.height;

    let imgData = ctx.getImageData(0, 0, width, height);
    let data = imgData.data;
    let newImgData = new ImageData(width, height);
    let newData = newImgData.data;

    console.log('borda');

    for(x = 1; x < width - 1; x++) {
        for(y = 1; y < height - 1; y++) {
            let pixel = toData(x, y, width);
            let top = toData(x, y-1, width);
            let bottom = toData(x, y+1, width);
            let left = toData(x-1, y, width);
            let right = toData(x+1, y, width);

            let value = 255-(subtractPixel(data, top, bottom) + subtractPixel(data, left, right))/2;
            value = Math.pow(value, 2)/255;

            newData[pixel] = newData[pixel+1] = newData[pixel+2] = value;
            newData[pixel+3] = 255;
        }
    }
    ctx.putImageData(newImgData, 1, 1);
}

function nada(ctx) {
    // nada aqui ;)
}