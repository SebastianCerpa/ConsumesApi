import { useState, useEffect } from "react";

export default function MiApi() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    consultarApi();
  }, []);



  const consultarApi = async () => {
    try {
      const url = "https://api.gael.cloud/general/public/clima/";
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setInfo(data);

    } catch (error) {
      console.log("Error al traer datos");
    }
  }; 
  return (
    <>
      <h1>El tiempo en Chile</h1>
      <div className="contenedor"></div>
    </>
  );
}
