// reactstrap components
// import {
//   Badge,
//   DropdownMenu,
//   DropdownItem,
//   UncontrolledDropdown,
//   DropdownToggle,
//   Media,
//   Progress,
//   Table,
//   UncontrolledTooltip,
// } from "reactstrap";
import Header from "components/Headers/Header.js";
import { useState, useEffect } from "react";
import ProjectVaxx from "../models/ProjectVaxx.js";
import { useHistory } from "react-router";
import AdminHeader from "components/Headers/AdminHeader.js";
import VaccinationTable from "components/VaccinationTable.js";

const Batch = () => {
  const [batch, setBatch] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [centre, setCentre] = useState("");
  const [message, setMessage] = useState("");

  async function fetchBatch() {
    const authData = await fetch("/verify");
    const auth = await authData.json();

    const batchData = await fetch("/batches/PF01");
    const batch = await batchData.json();
    setBatch(batch);

    const authorized = auth.userObj.centreName === batch.centreName;

    if (authorized) fetchVaccination()
    else alert('not authorized');
  }

  async function fetchVaccination() {
    const vaccinationsData = await fetch("/vaccinations/ofBatch/" + "PF01");
    const vaccination = await vaccinationsData.json();
    setVaccinations(vaccination);
  }

  function onVaccinationSelected(vaccination) {
    

  }
  
  useEffect(async () => {
    await fetchBatch();
  }, []);

  const history = useHistory();

  return (
    <>
      <AdminHeader healthcareCentre={centre} />
      <VaccinationTable vaccinations={vaccinations} 
        onRowSelected={vac => onVaccinationSelected(vac)}/>
    </>
  );
};

// const OnRowSelected = (selectedVaccine) => {
//   // return <Redirect to={'/AddBatches?vaccineID' + selectedVaccine.vaccineID}/>;
//   const path = '/AddBatches';
//   history.push(path);
// };
// const projectVaxx = new ProjectVaxx();
// const [vaccines, setVaccines] = useState([]);
// useEffect(() => {
//   async function fetchVaccineData() {
//     const vaccines = await projectVaxx.getVaccines();
//     setVaccines(vaccines);
//   }
//   fetchVaccineData();
// });
export default Batch;
