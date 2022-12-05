const rRange = document.getElementById('rRange')
const gRange = document.getElementById('gRange')
const bRange = document.getElementById('bRange')
const oRange = document.getElementById('oRange');

const run = document.getElementById('run');

const container = document.querySelector('#bg');
const random = document.getElementById('random');
const cRange = document.querySelectorAll('.cRange')
const output = document.getElementById('output');

const container2 = document.getElementById('second');


const w = window.screen.width;
const h = window.screen.height;
//default
container.style.setProperty('--w', w + "px");
container.style.setProperty('--h', h + "px");

let r = 0;
let g = 0;
let b = 0;
let o = 1;

rRange.value = r;
gRange.value = g;
bRange.value = b;
oRange.value = o * 100;

let tg = 'OFF';
let test = 0;
let opacity = false;


// integer to hexadecimal with length = 2 !! Done;
function hex02(a) {
    let b = (a * 1).toString(16);
    if ((b.length) < 2) {
        b = "0" + b;
    }
    return b;
};
//if opacity is on
function on() {
    //o = ((oRange.value) / 100);
    container.style.backgroundColor = `rgba(${r},${g},${b},${o})`;

    // add last
    container2.style.backgroundColor = `rgba(${r},${g},${b},${o})`;
    // add Hex opacity
    let hex = (hex02(r) + hex02(g) + hex02(b)).toUpperCase();
    output.textContent = '#' + hex


    if (o == 1) {
        ohex = "";
        output.textContent += ohex;
    } else {
        o = (o * 255).toFixed();
        let ohex = hex02(o).toUpperCase();
        output.textContent += ohex;
    }

};
//if opacity is off
function off() {
    //o = 1;
    container.style.backgroundColor = `rgb(${r},${g},${b})`;

    // add last
    container2.style.backgroundColor = `rgb(${r},${g},${b})`;

    //
    oRange.value = 100;
    let hex = (hex02(r) + hex02(g) + hex02(b)).toUpperCase();
    output.textContent = '#' + hex;

};
//output [2]
function out() {
    /*
        r = rRange.value;
        g = gRange.value;
        b = bRange.value;
        */
    o = ((oRange.value) / 100);


    if (o < 0.5 && o != 0) {
        o = (1 - o);
    } else if (o == 0) {
        o = 1;
    } else {
        o = ((oRange.value) / 100);
    };
    output.style.setProperty('--bg', `rgba(${r},${g},${b},${o})`);
    cRange.forEach((e) => { e.style.setProperty('--border', `rgba(${r},${g},${b},${o})`); });
    //output hex ;
    output.style.setProperty('--hex', `rgba(${r},${g},${b},${o})`);
    //antiWhite
    let som = (r * 1) + (g * 1) + (b * 1);
    if (r == 255 || g == 255 || b == 255 || som >= (255 * 3) / 1.5) {
        output.style.setProperty('--hex', 'rgb(0,0,0)');
    };
};
//after opacity
function begin() {
    r = rRange.value;
    g = gRange.value;
    b = bRange.value;
    o = ((oRange.value) / 100);
    if (tg === "ON") {
        on();
    } else if (tg === "OFF") {
        off();
    };
    out()
};

run.addEventListener('input', () => {
    test += 1;
    if ((test % 2) === 0) {
        tg = 'OFF';
    } else {
        tg = 'ON';
    };
    begin();
});
//random color;
random.addEventListener('click', () => {
    r = (Math.random() * 255).toFixed();
    g = (Math.random() * 255).toFixed();
    b = (Math.random() * 255).toFixed();
    rRange.value = r;
    gRange.value = g;
    bRange.value = b;
    begin();
});
//Change bg with range !! [o]
cRange.forEach((e) => {
        e.addEventListener('change', () => {
            begin();
        });
    })
    //
out();

//when u wanna test
/*
setInterval(() => {
    r = (Math.random() * 255).toFixed();
    g = (Math.random() * 255).toFixed();
    b = (Math.random() * 255).toFixed();
    rRange.value = r;
    gRange.value = g;
    bRange.value = b;
    begin();
}, 1000);
*/
//canvas




document.getElementById('btn').onclick = () => {
    const screemshotTarget = document.getElementById('bg')
    const output = document.getElementById('output').innerText;

    html2canvas(screemshotTarget).then((canvas) => {

        //canvas.setAttribute('height', window.screen.height);
        //canvas.setAttribute('width', window.screen.width);
        //canvas.height = window.screen.height
        //canvas.width = window.screen.width



        //canvas.style.cssText = ""
        //console.log(canvas.style.cssText);

        const base64image = canvas.toDataURL('image/jpeg');
        var anchor = document.createElement('a');
        anchor.setAttribute('href', base64image);
        anchor.setAttribute('download', `${output}.jpeg`);
        anchor.click();
        anchor.remove();

    });
};