/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";

export default function App() {
  const [needle, setNeedle] = useState("");
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [isSortedByTemp, setIsSortedByTemp] = useState(false);

  useEffect(() => {
    const fetchData = async function () {
      const response = await fetch("https://api.gael.cloud/general/public/clima/");
      const result = await response.json();
      setData(result);
      setOriginalData(result); // Guardar una copia del orden original
    };
    fetchData();
  }, []);

  const filteredData = data.filter((d) => d.Estacion.toLowerCase().includes(needle.toLowerCase()));

  function handleSortClick() {
    if (isSortedByTemp) {
      // Revertir al orden original
      setData(originalData);
    } else {
      // Ordenar por temperatura
      const sortedData = [...data].sort((a, b) => a.Temp - b.Temp);
      setData(sortedData);
    }
    setIsSortedByTemp(!isSortedByTemp); // Alternar estado
  }

  return (
    <>
      <button onClick={handleSortClick}>
        {isSortedByTemp ? "Revertir Orden" : "Ordenar por Temperatura"}
      </button>
      
      <div className="input">
        <input placeholder="Buscar por Región" ype="text" onChange={(e) => setNeedle(e.target.value)} />
      </div>

    <table className="tabla">
        <thead className="tit">
          <tr>Estacion</tr>
          <tr>HoraUpdate</tr>
          <tr>Temp</tr>
          <tr>Humedad</tr>
          <tr>Estado</tr>
        </thead>
        {filteredData.map((row) => (
          <>
        <tbody>
          <tr className="datos">
            <td>{row.Estacion}</td>
            <td>{row.HoraUpdate}</td>
            <td>{row.Temp} °C</td>
            <td>{row.Humedad}</td>
            <td>{row.Estado}</td>
          </tr>
        </tbody>
          </>
        ))}
      </table></>
  );
}
