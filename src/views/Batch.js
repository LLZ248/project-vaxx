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
  const history = useHistory();

  const batchNo = window.location.pathname.split("/").pop(); //get last segment of url

  const [batch, setBatch] = useState("");
  const [vaccine, setVaccine] = useState([]);
  const [vaccinations, setVaccinations] = useState(null);
  const [selectedVaccination, setSelectedVaccination] = useState("");
  const [showApplied, setShowApplied] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  
  async function fetchBatch() {
    const authData = await fetch("/verify");
    const auth = await authData.json();

    const batchData = await fetch("/batches/" + batchNo);
    const batch = await batchData.json();
    
    const centreData = await fetch('/healthcare-centre/findCentre/?centreName=' + auth.userObj.centreName);
    const centre = await centreData.json();
    
    const vaccineData = await fetch("/vaccines/" + batch.vaccineID);
    const vaccine = await vaccineData.json();
    
    const authorized = auth.userObj.centreName === batch.centreName;
    
    if (authorized) {
      setBatch(batch);
      setVaccine(vaccine);
      fetchVaccinations();
    } 
    else history.push('/admin/dashboard') //else take the user back to dashboard
  }

  async function fetchVaccinations() {
    const vaccinationsData = await fetch("/vaccinations/ofBatch/" + batchNo);
    const vaccinations = await vaccinationsData.json();
    setVaccinations(vaccinations);
  }

  function onVaccinationSelected(vaccination) {
    setSelectedVaccination(vaccination);
    setModalOpen(true);
  }

  function indicateChangesApplied() {
    setShowApplied(true);
    setTimeout(() => setShowApplied(false), 2000);
  }

  function onModalSubmitted() {
    setModalOpen(false); 
    indicateChangesApplied(); 
    fetchBatch(); 
    fetchVaccinations()
  }
  
  useEffect(async () => {
    await fetchBatch();
  }, []);

  return (
    <>
      <AdminHeader title={`Batch Number ${batch.batchNo ?? ''}`} subtitle={`Expires on ${batch.expiryDate ?? ''}`}/>
      <Container className="mt--9">
        <ListGroup horizontal={'md'} className="mb-4">
          <ListGroupItem color='primary'> Quantity </ListGroupItem>
          <ListGroupItem> Available 
            <Badge pill color='primary' className='ml-2'>
              {batch.quantityRemaining}
            </Badge>
          </ListGroupItem>
          <ListGroupItem> Pending 
            <Badge pill color='primary' className='ml-2'>
              {batch.quantityPending}
            </Badge>
          </ListGroupItem>
          <ListGroupItem> Administered 
            <Badge pill color='primary' className='ml-2'>
              {batch.quantityAdministered}
            </Badge>
          </ListGroupItem>
        </ListGroup>`
            
        <VaccinationTable vaccinations={vaccinations} 
        onRowSelect={vac => onVaccinationSelected(vac)}
        showChangesApplied={showApplied}
        />
      </Container>

      <ManageVaccinationModal batch={batch} vaccine={vaccine} 
        vaccination={selectedVaccination} 
        isOpen={isModalOpen} 
        onSubmit={() => onModalSubmitted()}
        onClose={() => setModalOpen(false)}/>
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
