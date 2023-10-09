import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

function CalculadoraPliegos({
  onResultadosActualizados,
  resultadoHorizontal,
  resultadoVertical,
}) {
  const [anchoPliego, setAnchoPliego] = useState('');
  const [altoPliego, setAltoPliego] = useState('');
  const [anchoTarjeta, setAnchoTarjeta] = useState('');
  const [altoTarjeta, setAltoTarjeta] = useState('');
  const [sangreTarjeta, setSangreTarjeta] = useState('');
  const [medidaAdicional, setMedidaAdicional] = useState('');

  const handleChange = (e, setState) => {
    setState(e.target.value);
  };

  const calcularTarjetasEnPliego = useCallback(() => {
    const convertirAMilimetros = (valor) => parseFloat(valor) * 10;
    const anchoPliegoNum = convertirAMilimetros(anchoPliego);
    const altoPliegoNum = convertirAMilimetros(altoPliego);
    const anchoTarjetaNum = convertirAMilimetros(anchoTarjeta);
    const altoTarjetaNum = convertirAMilimetros(altoTarjeta);
    const sangreTarjetaNum = convertirAMilimetros(sangreTarjeta);
    const medidaAdicionalNum = convertirAMilimetros(medidaAdicional);

    const anchoPliegoRestado = anchoPliegoNum - 2 * medidaAdicionalNum;
    const altoPliegoRestado = altoPliegoNum - 2 * medidaAdicionalNum;

    const tarjetasPorAncho = Math.floor(
      anchoPliegoRestado / (anchoTarjetaNum + 2 * sangreTarjetaNum)
    );
    const tarjetasPorAlto = Math.floor(
      altoPliegoRestado / (altoTarjetaNum + 2 * sangreTarjetaNum)
    );
    const totalTarjetasHorizontal = tarjetasPorAncho * tarjetasPorAlto;

    const tarjetasPorAnchoVertical = Math.floor(
      anchoPliegoRestado / (altoTarjetaNum + 2 * sangreTarjetaNum)
    );
    const tarjetasPorAltoVertical = Math.floor(
      altoPliegoRestado / (anchoTarjetaNum + 2 * sangreTarjetaNum)
    );
    const totalTarjetasVertical = tarjetasPorAnchoVertical * tarjetasPorAltoVertical;

    onResultadosActualizados(totalTarjetasHorizontal, totalTarjetasVertical);
  }, [
    onResultadosActualizados,
    anchoPliego,
    altoPliego,
    anchoTarjeta,
    altoTarjeta,
    sangreTarjeta,
    medidaAdicional,
  ]);

  useEffect(() => {
    calcularTarjetasEnPliego();
  }, [calcularTarjetasEnPliego]);

  return (
    <div>
      <h1>Calculadora de Tarjetas en Pliego</h1>
      <div>
        <label>Dimensiones del Pliego (mm):</label>
        <input
          type="number"
          placeholder="Ancho"
          value={anchoPliego}
          onChange={(e) => handleChange(e, setAnchoPliego)}
        />
        x
        <input
          type="number"
          placeholder="Alto"
          value={altoPliego}
          onChange={(e) => handleChange(e, setAltoPliego)}
        />
      </div>
      <div>
        <label>Dimensiones de la Tarjeta (mm):</label>
        <input
          type="number"
          placeholder="Ancho"
          value={anchoTarjeta}
          onChange={(e) => handleChange(e, setAnchoTarjeta)}
        />
        x
        <input
          type="number"
          placeholder="Alto"
          value={altoTarjeta}
          onChange={(e) => handleChange(e, setAltoTarjeta)}
        />
      </div>
      <div>
        <label>Sangre en la Tarjeta (mm):</label>
        <input
          type="number"
          placeholder="Sangre"
          value={sangreTarjeta}
          onChange={(e) => handleChange(e, setSangreTarjeta)}
        />
      </div>
      <div>
        <label>Medida Adicional al Pliego (mm):</label>
        <input
          type="number"
          placeholder="Medida Adicional"
          value={medidaAdicional}
          onChange={(e) => handleChange(e, setMedidaAdicional)}
        />
      </div>
      <p>Resultado Horizontal: {resultadoHorizontal} tarjetas</p>
      <p>Resultado Vertical: {resultadoVertical} tarjetas</p>
    </div>
  );
}

CalculadoraPliegos.propTypes = {
  onResultadosActualizados: PropTypes.func.isRequired,
  resultadoHorizontal: PropTypes.number.isRequired,
  resultadoVertical: PropTypes.number.isRequired,
};

export default CalculadoraPliegos;
