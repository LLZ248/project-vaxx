import {
Container,
Button,
Modal,
  // Badge,
  // DropdownMenu,
  // DropdownItem,
  // UncontrolledDropdown,
  // DropdownToggle,
  // Media,
  // Button,
  // Progress,
  // Table,
  // UncontrolledTooltip,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { useState, useEffect } from "react";
import ProjectVaxx from "../models/ProjectVaxx.js";
import { useHistory } from "react-router";
import BatchTable from "components/BatchTable.js";
import AddBatchModal from "components/AddBatchModal.js";
import AdminHeader from "components/Headers/AdminHeader.js";

const AdminDashboard = () => {

    // const pv = new ProjectVaxx();

  const [batches, setBatches] = useState([]);
  const [centre, setCentre] = useState([]);

  async function fetchBatch() {
    const data = await fetch('/batches');
    const batches = await data.json();

    batches.forEach(batch => 
      batch.administeredCompletion = batch.quantityAdministered / batch.quantityAvailable * 100);

    // for (const batch of batches) {
    //   const vaccineData = await fetch('/vaccines/' + batch.vaccineID);
    //   const vaccine = await vaccineData.json();
    //   batch.vaccineName = vaccine.vaccineName; //because javascript is dynamic typed
      
    //   const vaccinationsData = await fetch('/vaccinations');
    //   const vaccinations = await vaccinationsData.json();
    //   batch.vaccinations = vaccinations;
    // }

    setBatches(batches);
  }

  async function fetchCentre() {
    const data = await fetch('/healthcare-centre/findCentre/?centreName=Beacon%20Hospital');
    const centre = await data.json();
    setCentre(centre);
  }

  useEffect(() => {
    fetchCentre();
    fetchBatch();
  }, []);

    return (
      <>
      <AdminHeader healthcareCentre={centre}/>
      <Container className="mt--8">
      <BatchTable batches={batches} onRowSelect={(x) => alert(x.batchNo)}/>
      <AddBatchModal centreName={centre.centreName} onAdded={newBatch => fetchBatch()}/> {/*pass centreName because batch must have it*/}
      </Container>
      {/* <div className="modal fade" id="addBatchModal" tabIndex="-1" role="dialog" aria-labelledby="addBatchLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addBatchLabel">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              ...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div> */}
      </>
    )
}

export default AdminDashboard;