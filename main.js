let mainCanvas = document.querySelector('canvas');
let mainCtx = canvas.getContext('2d');
let filtrosEl = document.querySelector('#filtros');
let original = document.createElement('canvas');
let originalCtx = original.getContext('2d');
let salvarEl = document.querySelector('#salvar');
let conviteEl = document.querySelector('#convite');

let filtros = [borda, negative, hell, nada];

function loadImage(evt) {
    console.log(evt);
    
    let img = new Image();

    img.onload = () => {
        console.log('load');
        
        mainCanvas.width = img.width;
        mainCanvas.height = img.height;
        mainCtx.drawImage(img, 0, 0, mainCanvas.width, mainCanvas.height);
        if(img.width * window.innerHeight/window.innerWidth > img.height) {
            canvas.style = 'width: 80%';
        }
        else {
            canvas.style = 'height: 80%';
        }

        original.width = img.width;
        original.height = img.height;
        originalCtx.drawImage(img, 0, 0, mainCanvas.width, mainCanvas.height);

        filtrosEl.innerHTML = '';
        filtros.forEach(filtro => {
            let novo = document.createElement('canvas');
            novo.width = 200;
            novo.height = img.height/(img.width/200);
            novo.addEventListener('click', () => {
                mainCtx.drawImage(original, 0, 0);
                filtro(mainCtx);
            });
            filtrosEl.appendChild(novo);

            let novoCtx = novo.getContext('2d');
            novoCtx.drawImage(img, 0, 0, novo.width, novo.height);
            filtro(novoCtx);
        });

        conviteEl.classList.add('hidden');
        salvarEl.classList.remove('hidden');
    }

    img.src = evt.target.result;
}

function handleDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    let file = evt.dataTransfer.files[0];
    if (!file.type.match('image.*')) {
        return;
    }

    let reader = new FileReader();
    reader.onload = loadImage;
    reader.readAsDataURL(file);
}

window.addEventListener('drop', handleDrop);
window.addEventListener('dragover', evt => {
    evt.stopPropagation();
    evt.preventDefault();
});

function salvar() {
    let a = document.createElement('a');
    a.href = mainCanvas.toDataURL();
    a.download = 'made with infiltro';
    a.click();
}

salvarEl.addEventListener('click', salvar);