import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function CalculadoraPliegosNecesarios({ resultadoHorizontal, resultadoVertical, onPliegosNecesariosChange }) {
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

  useEffect(() => {
    const resultadoH = Number(resultadoHorizontal);
    const resultadoV = Number(resultadoVertical);
  
    if (modoCalculo === 'horizontal' && !isNaN(resultadoH) && resultadoH !== 0) {
      const nuevosPliegosNecesarios = Math.ceil(cantidadTarjetas / resultadoH);
      setPliegosNecesarios(nuevosPliegosNecesarios);
      onPliegosNecesariosChange(nuevosPliegosNecesarios);
    } else if (modoCalculo === 'vertical' && !isNaN(resultadoV) && resultadoV !== 0) {
      const nuevosPliegosNecesarios = Math.ceil(cantidadTarjetas / resultadoV);
      setPliegosNecesarios(nuevosPliegosNecesarios);
      onPliegosNecesariosChange(nuevosPliegosNecesarios);
    }
  }, [cantidadTarjetas, modoCalculo, resultadoHorizontal, resultadoVertical, onPliegosNecesariosChange]);
  
  return (
<div className="container mx-auto p-4 bg-white">
  <h2 className="text-xl font-bold text-center text-black mb-6">
  Pliegos necesarios:
  </h2>
  <div className="mb-4">
    <label htmlFor="cantidadTarjetas" className="block text-lg text-gray-700 mb-2">
      Cantidad de tarjetas requeridas:
    </label>
    <input
      type="number"
      placeholder="Cantidad"
      value={cantidadTarjetas}
      onChange={(e) => setCantidadTarjetas(e.target.value)}
      className="w-full p-3 rounded-lg border border-blue-400 focus:outline-none focus:border-blue-600 text-gray-700 shadow-sm"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="modoCalculo" className="block text-lg text-gray-700 mb-2">
Horizontal o vertical    </label>
    <select
      value={modoCalculo}
      onChange={(e) => setModoCalculo(e.target.value)}
      className="w-full p-3 rounded-lg border border-blue-400 focus:outline-none focus:border-blue-600 text-gray-700 shadow-sm"
    >
      <option value="horizontal">Horizontal</option>
      <option value="vertical">Vertical</option>
    </select>
  </div>
  <div className="mb-4">
    <p className="text-lg text-gray-700">Pliegos Necesarios: <span className="text-blue-600 font-bold text-2xl">{pliegosNecesarios}</span></p>
  </div>
</div>

  );
  
}

CalculadoraPliegosNecesarios.propTypes = {
  resultadoHorizontal: PropTypes.number.isRequired,
  resultadoVertical: PropTypes.number.isRequired,
  onPliegosNecesariosChange: PropTypes.func,
};

export default CalculadoraPliegosNecesarios;
