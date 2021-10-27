import WaveLoading from "react-loadingg/lib/WaveLoading";
import { Card, CardHeader, Table, Progress } from "reactstrap";

const BatchTable = ({ batches, role, onRowSelect }) => {
  require("../assets/css/hoverableTable.css");
  
  const viewByPatient = role === 'patient';

  if(batches?.batchNo) { //this check if the batch is actually a batch object 
    batches.forEach(batch => {
      batch.administeredCompletion = batch.quantityAdministered / batch.quantityAvailable * 100;
    }); 
  }

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
            <th scope="col">Expiry Date</th>
            {
              viewByPatient ? <></> : <>
              <th scope="col">No. of Pending Appointments</th>
              <th scope="col">Administered Completion</th> </>
            }
          </tr>
        </thead>
        <tbody>
          {batches === null ? <tr><td colSpan='3'> <WaveLoading color='#d2d8f7' style={{"position":"relative", "margin":"auto"}}/> </td></tr> :
            batches.length === 0 ? <tr><td colSpan={viewByPatient ? '3' : '5'}> There are no batches available currently </td></tr> :
            batches.map(batch =>
              <tr
              className="hoverable-row"
              key={batch.batchNo}
              role="button" //this change the cursor when mouse over
              onClick={() => onRowSelect(batch)} //callback function
              >
                <td>{batch.batchNo}</td>
                <td>{batch.vaccineName}</td>
                <td>{batch.expiryDate}</td>
                
                { viewByPatient ? <></> : <>
                  <td> {batch.noOfPendingVaccination}</td>
                    <td>
                    <div className="d-flex align-items-center">
                      <div>
                        <Progress max="100" value={batch.administeredCompletion} barClassName="bg-success" />
                      </div>
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

 {/* <tr>
            <th scope="row">
              <Media className="align-items-center">
                <a
                  className="avatar rounded-circle mr-3"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <img
                    alt="..."
                    src={require("../assets/img/theme/vue.jpg").default}
                  />
                </a>
                <Media>
                  <span className="mb-0 text-sm">Vue Paper UI Kit PRO</span>
                </Media>
              </Media>
            </th>
            <td>$2,200 USD</td>
            <td>
              <Badge color="" className="badge-dot mr-4">
                <i className="bg-success" />
                completed
              </Badge>
            </td>
            <td>
              <div className="avatar-group">
                <a
                  className="avatar avatar-sm"
                  href="#pablo"
                  id="tooltip664029969"
                  onClick={(e) => e.preventDefault()}
                >
                  <img
                    alt="..."
                    className="rounded-circle"
                    src={
                      require("../assets/img/theme/team-1-800x800.jpg").default
                    }
                  />
                </a>
                <UncontrolledTooltip delay={0} target="tooltip664029969">
                  Ryan Tompson
                </UncontrolledTooltip>
              </div>
              <UncontrolledDropdown>
                <DropdownToggle
                  className="btn-icon-only text-light"
                  href="#pablo"
                  role="button"
                  size="sm"
                  color=""
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fas fa-ellipsis-v" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Action
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Another action
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Something else here
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </td>
            <td>
              <div className="d-flex align-items-center">
                <span className="mr-2">100%</span>
                <div>
                  <Progress max="100" value="100" barClassName="bg-success" />
                </div>
              </div>
            </td>
          </tr>*/}
