// reactstrap components
import {
  Badge,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Progress,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { useState, useEffect } from "react";
import ProjectVaxx from "../models/ProjectVaxx.js";
import { useHistory } from "react-router";
import AdminHeader from "components/Headers/AdminHeader.js";

const Batch = () => {

  const [batches, setBatches] = useState([]);
  const [centre, setCentre] = useState("");
  const [message, setMessage] = useState("");

  async function fetchCentre() {
    const authData = await fetch("/verify");
    const auth = await authData.json();

    const data = await fetch(
      "/healthcare-centre/findCentre/?centreName=" + auth.userObj.centreName
    );
    const centre = await data.json();
    // fetchBatch(centre.centreName);
    setCentre(centre);
  }

  const history = useHistory();

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

  return (
    <>
      <AdminHeader healthcareCentre={centre}/>
      <Table className="align-items-center table-flush" responsive />
    </>
  );
};

export default Batch;
