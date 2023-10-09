import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function CalculadoraPliegosNecesarios(props) {
  const { resultadoHorizontal, resultadoVertical } = props;

  const [cantidadTarjetas, setCantidadTarjetas] = useState(0);
  const [modoCalculo, setModoCalculo] = useState('horizontal');
  const [pliegosNecesarios, setPliegosNecesarios] = useState(0);

  useEffect(() => {
    const resultadoH = Number(resultadoHorizontal);
    const resultadoV = Number(resultadoVertical);

    if (modoCalculo === 'horizontal' && !isNaN(resultadoH) && resultadoH !== 0) {
      setPliegosNecesarios(Math.ceil(cantidadTarjetas / resultadoH));
    } else if (modoCalculo === 'vertical' && !isNaN(resultadoV) && resultadoV !== 0) {
      setPliegosNecesarios(Math.ceil(cantidadTarjetas / resultadoV));
    }
  }, [cantidadTarjetas, modoCalculo, resultadoHorizontal, resultadoVertical]);

  console.log('Props resultadoHorizontal:', resultadoHorizontal);
  console.log('Props resultadoVertical:', resultadoVertical);

  return (
    <div>
      <h1>Calculadora de Pliegos y Pliegos Necesarios</h1>
      <div>
        <label>Cantidad de Tarjetas a Imprimir:</label>
        <input
          type="number"
          placeholder="Cantidad"
          value={cantidadTarjetas}
          onChange={(e) => setCantidadTarjetas(e.target.value)}
        />
      </div>
      <div>
        <label>Modo de Cálculo:</label>
        <select
          value={modoCalculo}
          onChange={(e) => setModoCalculo(e.target.value)}
        >
          <option value="horizontal">Horizontal</option>
          <option value="vertical">Vertical</option>
        </select>
      </div>
      <div>
        <p>Pliegos Necesarios: {pliegosNecesarios}</p>
      </div>
    </div>
  );
}

CalculadoraPliegosNecesarios.propTypes = {
  resultadoHorizontal: PropTypes.number.isRequired,
  resultadoVertical: PropTypes.number.isRequired,
};

export default CalculadoraPliegosNecesarios;
