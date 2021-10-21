import {
Container,
} from "reactstrap";
import { useState, useEffect } from "react";
import BatchTable from "components/BatchTable.js";
import AddBatchModal from "components/AddBatchModal.js";
import AdminHeader from "components/Headers/AdminHeader.js";
import { Redirect } from "react-router";

const AdminDashboard = () => {

  const [batches, setBatches] = useState([]);
  const [centre, setCentre] = useState('');
  const [message, setMessage] = useState('');

  async function fetchCentre() {
    const authData = await fetch('/verify');
    const auth = await authData.json();

    const data = await fetch('/healthcare-centre/findCentre/?centreName=' + auth.userObj.centreName);
    const centre = await data.json();
    fetchBatch(centre.centreName);
    setCentre(centre);
  }

  async function fetchBatch(centreName) {
    // alert(centre)
    const data = await fetch('/batches/ofCentre/' + centreName);
    const batches = await data.json();
    const hasError = batches.message; //contains an error message
  
    setBatches(hasError ? null : batches);

    // for (const batch of batches) {
    //   const vaccineData = await fetch('/vaccines/' + batch.vaccineID);
    //   const vaccine = await vaccineData.json();
    //   batch.vaccineName = vaccine.vaccineName; //because javascript is dynamic typed
      
    //   const vaccinationsData = await fetch('/vaccinations');
    //   const vaccinations = await vaccinationsData.json();
    //   batch.vaccinations = vaccinations;
    // }
  }

  useEffect(() => {
    // async function fetchCentre() {
    //   const data = await fetch('/healthcare-centre/findCentre/?');
    //   const centre = await data.json();
    //   fetchBatch(centre.centreName);
    //   setCentre(centre);
    // }

    fetchCentre();
  });

  function onBatchAdded(newBatch) {
    fetchBatch(centre.centreName);
    setMessage(`Added "${newBatch.batchNo}"`)
    setTimeout(() => {
      setMessage('');
    }, 3000);
  }

  function onBatchSelected(selectedBatch) {
   return <Redirect to={"/batches/" + selectedBatch.batchNo}></Redirect>
  }

    return (
      <>
      <AdminHeader healthcareCentre={centre}/>
      <Container className="mt--8">
      <BatchTable batches={batches} role={'patient'} onRowSelect={selectedBatch => onBatchSelected(selectedBatch)}/>
      <AddBatchModal centreName={centre.centreName} onAdded={newBatch => onBatchAdded(newBatch)}/> {/*pass centreName because batch must have it*/}
      {message ? <span className="alert alert-success py-2" id='success-message'>{message}</span> : null}
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