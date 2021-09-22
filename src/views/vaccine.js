// reactstrap components
  import Header from "components/Headers/Header.js";
  import VaccineTable from "components/vaccineTable.js";
  import { useState, useEffect } from "react";
  
  const onRowSelected = (selectedVaccine) => {
    alert(selectedVaccine.manufacturer)
  }
  
  const fetchVaccines = async() => {
    const res =  await fetch('http://localhost:5000/vaccines');
    const data = await res.json();
    return data;
  }
  
  const VaccineView = () => {
  
    const [vaccines, setVaccines] = useState([])
  
    useEffect(async() => {
        const vaccines = await fetchVaccines();
        setVaccines(vaccines);
  
    }, [])
  
    return (
      <>
        <Header />
        <VaccineTable vaccines={vaccines} onRowSelect={onRowSelected}/>
      </>
    );
  };
  
  export default VaccineView;