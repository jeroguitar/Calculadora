"use strict";
// Referencio objetos del DOM
const pantalla = document.querySelector(".pantalla");
const contenedorTeclas = document.querySelector(".contenedorTeclas");

let numero1 = "";
let numero2 = "";
let operador = null;
let escribiendoSegundoNumero = false;

// Función auxiliar para formatear con separador de miles (sin toLocaleString)
function formatearNumero(valor) {
  if (valor === "" || valor === "Error") return valor;

  const n = Number(valor);
  if (Number.isNaN(n)) return valor;

  // Lo paso a string sin formato
  const partes = n.toString().split(".");
  const parteEntera = partes[0];
  const parteDecimal = partes[1];

  // Insertar puntos cada 3 dígitos desde la derecha
  const conPuntos = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Si hay decimales, separarlos con coma
  return parteDecimal ? `${conPuntos},${parteDecimal}` : conPuntos;
}

contenedorTeclas.addEventListener("click", (e) => {
  const tecla = e.target;

  // Si lo clickeado no es un botón, salir
  if (!tecla.classList.contains("btnTecla")) return;

  // De lo contrario obtener el texto del botón (tecla)
  const valor = tecla.textContent;

  // 1. Limpiar (CE)
  if (valor === "CE") {
    numero1 = "";
    numero2 = "";
    operador = null;
    escribiendoSegundoNumero = false;
    pantalla.value = "";
    return;
  }

  // 2. Si es un número
  if (!isNaN(valor)) {
    // '0'..'9'
    if (!escribiendoSegundoNumero) {
      numero1 += valor; // interno sin formato
      pantalla.value = formatearNumero(numero1); // mostrar con formato
    } else {
      numero2 += valor; // interno sin formato
      pantalla.value = formatearNumero(numero2); // mostrar con formato
    }
    return;
  }

  // 3. Si es un operador
  if (["+", "-", "X", "/"].includes(valor)) {
    if (numero1 === "") return; // si aún no hay número1, no hacemos nada
    operador = valor;
    escribiendoSegundoNumero = true;
    return;
  }

  // 4. Si es '='
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

    pantalla.value = formatearNumero(resultado); // mostrar con formato
    // Preparar para una nueva operación
    numero1 = resultado === "Error" ? "" : String(resultado);
    numero2 = "";
    operador = null;
    escribiendoSegundoNumero = false;
  }
});
