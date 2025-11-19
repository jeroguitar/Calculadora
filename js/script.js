"use strict";
const pantalla = document.querySelector(".pantalla");
const contenedorTeclas = document.querySelector(".contenedorTeclas");

let numero1 = "";
let numero2 = "";
let operador = null;
let escribiendoSegundoNumero = false;

contenedorTeclas.addEventListener("click", (e) => {
  const tecla = e.target;

  
  if (!tecla.classList.contains("btnTecla")) return;

  const valor = tecla.textContent;

  
  if (valor === "CE") {
    numero1 = "";
    numero2 = "";
    operador = null;
    escribiendoSegundoNumero = false;
    pantalla.value = "";
    return;
  }

  
  if (!isNaN(valor)) {
    
    if (!escribiendoSegundoNumero) {
      numero1 += valor;
      pantalla.value = numero1;
    } else {
      numero2 += valor;
      pantalla.value = numero2;
    }
    return;
  }

  
  if (["+", "-", "X", "/"].includes(valor)) {
    if (numero1 === "") return; 
    operador = valor;
    escribiendoSegundoNumero = true;
    return;
  }

  
  if (valor === "=") {
    if (numero1 === "" || numero2 === "" || !operador) return;

    const n1 = parseFloat(numero1);
    const n2 = parseFloat(numero2);
    let resultado;

    switch (operador) {
      case "+":
        resultado = n1 + n2;
        break;
      case "-":
        resultado = n1 - n2;
        break;
      case "X":
        resultado = n1 * n2;
        break;
      case "/":
        resultado = n2 === 0 ? "Error" : n1 / n2;
        break;
    }

    pantalla.value = resultado;

    
    numero1 = String(resultado);
    numero2 = "";
    operador = null;
    escribiendoSegundoNumero = false;
  }
});
