//selecionar elemento sin clase (con el nombre de la etiqueta)
let nav = document.querySelector("nav");
//console.log(nav);

//seleccionar elemento con clase
let active = document.querySelector(".active");
//console.log(active);

//Seleccionar multiples elementos con la misma etiqueta
let headersAndParagraph = document.querySelectorAll("p, h1");
//console.log(headersAndParagraph[0].innerText); //Se accede al numero del elemento con los corchetes y al contenido con .innerText

//Elemento padre
document.body.parentNode

//Devuelve el total de elementos hijos ignorando el texto
document.body.children.length
document.body.childElementCount

//primer elemento hijo
document.body.children[0]

//primer y ultimos nodos hijos 
document.body.firstElementChild
document.body.lastElementChild

//siguien y anterior hermano
document.body.nextElementSibling
document.body.previousElementSibling

//Acceder al link con clase active a traves de los hijos mediante .children[0].
nav.children[0];
// console.log(nav.children[0].children[0].children[0]);

// console.log(nav.firstElementChild.firstElementChild.firstElementChild.parentNode.nextElementSibling.firstElementChild.firstChild.parentNode);

//Una misma manera
//console.log(headersAndParagraph[2]);
//console.log(headersAndParagraph[0].nextElementSibling.nextElementSibling.nextElementSibling);
 
//Seleciona atraves del id
let main = document.querySelector("#first");
 //console.log(main);

//  console.log(nav.firstElementChild.lastElementChild.firstElementChild);

//
// console.log(nav.firstElementChild.childElementCount);
// console.log(nav.firstElementChild.children.length);

//
//  console.log(nav.firstElementChild.childNodes);
//  console.log(nav.firstElementChild.firstChild.nodeValue);

//Nombre del nodo en mayusuculas
//  console.log(nav.firstElementChild.nodeName);
 console.log(nav.firstElementChild.firstChild.nextSibling.nextSibling.previousSibling);