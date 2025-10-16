import React, { useState } from "react";

export default function Calculadora() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);

  const num = (n) => setDisplay(display === "0" ? n : display + n);
  const oper = (o) => { setPrev(parseFloat(display)); setOp(o); setDisplay("0"); };
  const clear = () => { setDisplay("0"); setPrev(null); setOp(null); };
  const equals = () => {
    if (prev === null || op === null) return; 
    const result = eval(`${prev}${op}${parseFloat(display)}`);
    setDisplay(result.toString());
    setPrev(null);
    setOp(null);
  }; 

  // Arreglo con btns
  const botones = [
    "7","8","9","+",
    "4","5","6","-",
    "1","2","3","*",
    "0","=","/","C"
  ];

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#f2f2f2"
    }}>
      <div style={{
        textAlign: "center",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        background: "#ffffff"
      }}>
        <h3>Calculadora Básica 5IV8 TGE </h3>

        <input
          readOnly
          value={display}
          style={{
            width: "250px",
            height: "50px",
            fontSize: "28px",
            textAlign: "right",
            paddingRight: "10px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            background: "#f9f9f9"
          }}
        />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 60px)",
          gap: "10px",
          justifyContent: "center"
        }}>
          {botones.map((b) => (
            <button
              key={b}
              onClick={() =>
                !isNaN(b)
                  ? num(b)
                  : b === "C"
                  ? clear()
                  : b === "="
                  ? equals()
                  : oper(b)
              }
              style={{
                width: "60px",
                height: "60px",
                fontSize: "22px",
                borderRadius: "8px",
                cursor: "pointer",
                background: "#e6e6e6",
                border: "1px solid #ccc"
              }}
            >
              {b}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
 



    // Estado que guarda el número que se muestra en pantalla
  const [display, setDisplay] = useState("0");

  // Estado que guarda el número anterior antes de realizar una operación
  const [prev, setPrev] = useState(null);

  // Estado que guarda la operación actual (+, -, *, /)
  const [op, setOp] = useState(null);

  // Función para manejar la entrada de números
  // Si el display está en "0", lo reemplaza por el número nuevo
  // Si no, concatena el número al final del valor actual
  const num = (n) => setDisplay(display === "0" ? n : display + n);

  // Función que se ejecuta cuando se presiona una operación (+, -, *, /)
  // Guarda el número actual como 'prev', la operación como 'op', y reinicia el display
  const oper = (o) => { 
    setPrev(parseFloat(display));  // Convierte el número en pantalla a tipo numérico
    setOp(o);                      // Guarda la operación seleccionada
    setDisplay("0");               // Reinicia el display para el siguiente número
  };

  // Función para limpiar la calculadora
  // Reinicia todos los estados a sus valores iniciales
  const clear = () => { 
    setDisplay("0"); 
    setPrev(null); 
    setOp(null); 
  };

  // Función que se ejecuta al presionar "="
  const equals = () => {
    // Si no hay número previo u operación, no hace nada
    if (prev === null || op === null) return;

    // Usa 'eval' para calcular el resultado de la operación
    // Ejemplo: eval("8+4") devuelve 12
    const result = eval(`${prev}${op}${parseFloat(display)}`);

    // Muestra el resultado en pantalla
    setDisplay(result.toString());

    // Limpia los valores previos y la operación
    setPrev(null);
    setOp(null);
  };

  // Arreglo con los textos de los botones de la calculadora
  const botones = [
    "7","8","9","+",
    "4","5","6","-",
    "1","2","3","*",
    "0","=","/","C"
  ];

  // Estructura visual (interfaz) de la calculadora
  return (
    // Contenedor principal que centra la calculadora en la pantalla
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#f2f2f2"
    }}>
      
      {/* Caja blanca que contiene la calculadora */}
      <div style={{
        textAlign: "center",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        background: "#ffffff"
      }}>
        
        {/* Título de la calculadora */}
        <h3>Calculadora Básica 5IV8 TGE </h3>

        {/* Pantalla donde se muestra el número actual */}
        <input
          readOnly                // Solo lectura (no se puede escribir manualmente)
          value={display}         // Muestra el valor del estado 'display'
          style={{
            width: "250px",
            height: "50px",
            fontSize: "28px",
            textAlign: "right",   // Alinea los números a la derecha
            paddingRight: "10px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            background: "#f9f9f9"
          }}
        />

        {/* Contenedor de los botones, organizado como una cuadrícula */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 60px)",  // 4 columnas de 60px cada una
          gap: "10px",                             // Separación entre botones
          justifyContent: "center"
        }}>
          
          {/* Genera un botón por cada elemento del arreglo 'botones' */}
          {botones.map((b) => (
            <button
              key={b} // Clave única para cada botón
              
              // Evento que se ejecuta al hacer clic
              onClick={() =>
                !isNaN(b)       // Si el botón es un número...
                  ? num(b)      // ...llama a la función num()
                  : b === "C"   // Si es "C", limpia todo
                  ? clear()
                  : b === "="   // Si es "=", calcula el resultado
                  ? equals()
                  : oper(b)     // En cualquier otro caso, es una operación
              }

              // Estilos visuales del botón
              style={{
                width: "60px",
                height: "60px",
                fontSize: "22px",
                borderRadius: "8px",
                cursor: "pointer",
                background: "#e6e6e6",
                border: "1px solid #ccc"
              }}
              >
                {/* Texto visible del botón */}
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  
