window.onload=()=>{

const canvas = document.getElementById('micanvas');
const img = new Image();
const color = document.getElementById('color');
const name = document.getElementById('diseñador-name')
const ctxImagen = canvas.getContext('2d');

img.src = 'https://cdn.discordapp.com/avatars/528061757365944330/995f25ab5407944b29f72e795cec2af2.webp';
img.crossOrigin = "Anonymous";

ctxImagen.drawImage(img, 0, 0);
//.getImageData(izquierda, arriba, ancho, alto);
var rgb = ctxImagen.getImageData(64, 64, 1, 1).data; //<-- un pixel en las coordenadas  5 y 5

color.style.backgroundColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
name.style.color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;

};