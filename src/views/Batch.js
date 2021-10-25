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
import { useHistory } from "react-router";
import AdminHeader from "components/Headers/AdminHeader.js";
import VaccinationTable from "components/VaccinationTable.js";
import ManageVaccinationModal from "components/ManageVaccinationModal.js";
import { Badge, Card, CardBody, CardHeader, Container, ListGroup, ListGroupItem } from "reactstrap";

const Batch = () => {

  const batchNo = window.location.pathname.split("/").pop(); //get last segment of url

  const [batch, setBatch] = useState([]);
  const [centre, setCentre] = useState("");
  const [vaccine, setVaccine] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);

  const [isModalOpen, setModalOpen] = useState(true);
  const [selectedVaccination, setSelectedVaccination] = useState("");
  
  const [message, setMessage] = useState("");

  async function fetchBatch() {
    const authData = await fetch("/verify");
    const auth = await authData.json();

    const batchData = await fetch("/batches/" + batchNo);
    const batch = await batchData.json();
    setBatch(batch);

    const centreData = await fetch('/healthcare-centre/findCentre/?centreName=' + auth.userObj.centreName);
    const centre = await centreData.json();
    setCentre(centre);

    const vaccineData = await fetch("/vaccines/" + batch.vaccineID);
    const vaccinex = await vaccineData.json();
    setVaccine(vaccinex);

    const authorized = auth.userObj.centreName === batch.centreName;

   fetchVaccination();
  }

  async function fetchVaccination() {
    const vaccinationsData = await fetch("/vaccinations/ofBatch/" + batchNo);
    const vaccinations = await vaccinationsData.json();
    setVaccinations(vaccinations);
  }

  function onVaccinationSelected(vaccination) {
    setSelectedVaccination(vaccination);
    setModalOpen(true);
  }
  
  useEffect(async () => {
    await fetchBatch();
  }, []);

  const history = useHistory();

  return (
    <>
      <AdminHeader title={`Batch Number ${batch.batchNo}`} subtitle={`Expires on ${batch.expiryDate}`}/>
      <Container className="mt--9">
        <ListGroup horizontal={'md'} className="mb-4">
          <ListGroupItem color='primary'> Quantity </ListGroupItem>
          <ListGroupItem> Available 
            <Badge pill color='primary' className='ml-2'>
              {batch.quantityAvailable}
            </Badge>
          </ListGroupItem>
          <ListGroupItem> Administered 
            <Badge pill color='primary' className='ml-2'>
              {batch.quantityAvailable}
            </Badge>
          </ListGroupItem>
          <ListGroupItem> Pending 
            <Badge pill color='primary' className='ml-2'>
              {batch.quantityAvailable}
            </Badge>
          </ListGroupItem>
        </ListGroup>`
            
        <VaccinationTable vaccinations={vaccinations} 
        onRowSelect={vac => onVaccinationSelected(vac)}/>
      </Container>

      <ManageVaccinationModal batch={batch} vaccine={vaccine} 
        vaccination={selectedVaccination} 
        isOpen={isModalOpen} onClose={() => setModalOpen(false)}/>
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
