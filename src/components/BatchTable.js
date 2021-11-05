import WaveLoading from "react-loadingg/lib/WaveLoading";
import { Card, CardHeader, Table, Progress } from "reactstrap";

const BatchTable = ({ batches, role, onRowSelect }) => {
  require("../assets/css/hoverableTable.css");
  
  const viewByPatient = role === 'patient';

  if(batches?.length) { //this check if the batches contains any batch
    batches.forEach(batch => {
      batch.administeredCompletion = batch.quantityAdministered / batch.quantityAvailable * 100;
    });
  }

  console.table(batches);

  const colSpan = viewByPatient ? '3' : '5';

  const loadingAnimation = 
    <tr>
      <td colSpan={colSpan}> 
        <WaveLoading color='#d2d8f7' style={{"position":"relative", "margin":"auto"}}/> 
      </td>
    </tr>;

  const emptyBatchMessage = 
    <tr>
      <td colSpan={colSpan}> 
        There are no batches available currently 
      </td>
    </tr>

  return (
      <Card className="shadow overflow-hidden">
        <CardHeader className="border-0 d-flex align-items-baseline justify-content-between">
          <h3 className="mb-0">Batch List</h3>
          <h5 className="mb-0 text-muted">Click on a row to view batch</h5>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Batch No</th>
            <th scope="col">Vaccine</th>
            {
              viewByPatient ? <th scope="col">Expiry Date</th> : <>
              <th scope="col">No. of Pending Appointments</th>
              <th scope="col">Administered Completion</th> </>
            }
          </tr>
        </thead>
        <tbody>
          {batches === null ? loadingAnimation :
            batches.length === 0 ? emptyBatchMessage :
            batches.map(batch =>
              <tr
              className="hoverable-row"
              key={batch.batchNo}
              role="button" //this change the cursor when mouse over
              onClick={() => onRowSelect(batch)} //callback function
              >
                <td>{batch.batchNo}</td>
                <td>{batch.vaccineName}</td>
                { viewByPatient ? 
                <td>{batch.expiryDate}</td> : 
                <>
                  <td> {batch.quantityPending}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Progress max="100" value={batch.administeredCompletion} barClassName="bg-success" />
                      <span className="ml-2">{batch.administeredCompletion}%</span>
                    </div>
                  </td>
                </> }
              </tr>
            )}
        </tbody> 
        </Table>
      </Card>
  );
};

export default BatchTable;