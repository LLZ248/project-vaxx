import {
Container
} from "reactstrap";

import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import BatchTable from "components/BatchTable.js";
import AddBatchModal from "components/AddBatchModal.js";
import AdminHeader from "components/Headers/AdminHeader.js";

const AdminDashboard = () => {

  const history = useHistory();
  
  const [batches, setBatches] = useState(null);
  const [centre, setCentre] = useState('');
  const [message, setMessage] = useState('');
  
  async function fetchBatch(centreName) {
    // alert(centre)
    const data = await fetch('/batches/ofCentre/' + centreName);
    const batches = await data.json();
    const hasError = batches.message; //contains an error message
  
    setBatches(hasError ? null : batches);
  }

  function onBatchAdded(newBatch) {
    fetchBatch(centre.centreName);
    setMessage(`Added "${newBatch.batchNo}"`)
    setTimeout(() => {
      setMessage('');
    }, 3000);
  }

  function onBatchSelected(selectedBatch) {
    history.push("/admin/batch/" + selectedBatch.batchNo);
  }
  
  useEffect(() => {

    async function fetchCentre() {
      const authData = await fetch('/verify');
      const auth = await authData.json();
  
      const data = await fetch('/healthcare-centre/findCentre/?centreName=' + auth.userObj.centreName);
      const centre = await data.json();
      fetchBatch(centre.centreName);
      setCentre(centre);
    }
    
    fetchCentre();
  }, []);

  return (
      <>
      <AdminHeader title={centre.centreName} subtitle={centre.address}/>
      <Container className="mt--8">
      <BatchTable batches={batches} role={'patient'} onRowSelect={selectedBatch => onBatchSelected(selectedBatch)}/>
      <br/>
      <AddBatchModal centreName={centre.centreName} onAdded={newBatch => onBatchAdded(newBatch)}/> {/*pass centreName because batch must have it*/}
      {message ? <span className="alert alert-success py-2" id='success-message'>{message}</span> : null}
      </Container>
      </>
    )
}

export default AdminDashboard;
