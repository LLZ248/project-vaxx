//[deprecated]
import Header from "components/Headers/Header.js";
import VaccineTable from "components/VaccineTable.js";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";


const VaccineView = () => {

  const history = useHistory();

  const OnRowSelected = (selectedVaccine) => {
    // return <Redirect to={'/AddBatches?vaccineID' + selectedVaccine.vaccineID}/>;
    const path = '/admin/addBatches';
    history.push(path);
  };
  // const projectVaxx = new ProjectVaxx();
  const [vaccines, setVaccines] = useState([]);
  
  useEffect(() => {
    async function fetchVaccine(){
      console.log('attempt');
      const data =  await fetch('/vaccines');
      const vaccines = await data.json();
      setVaccines(vaccines);
    }
    fetchVaccine()
    }, []);


  return (
    <>
      <Header />
      <VaccineTable 
        vaccines={vaccines} 
        onRowSelect={OnRowSelected} 
        title="Vaccine Available"
        message="Select a row to add batch"
      />
    </>
  );
};

export default VaccineView;
