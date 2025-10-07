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
