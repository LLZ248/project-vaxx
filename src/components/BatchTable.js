import { Col, Card, CardHeader, Table, Container, Row , DropdownItem, Media, Badge, UncontrolledTooltip, DropdownToggle, Progress, UncontrolledDropdown, DropdownMenu} from "reactstrap";

const BatchTable = ({ batches, onRowSelect, title, message, hideColumn }) => {
  require("../assets/css/hoverableTable.css");

  return (
        <Col className="mb-3" xl="13">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <div className="col">
                  <h3 className="mb-0">Batch List</h3>
                </div>
                <div className="col">
                  <h6 className="text-right m-0">
                    {message}
                  </h6>
                </div>
              </Row>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Batch No</th>
            <th scope="col">Vaccine</th>
            <th scope="col">Expiry Date</th>
            <th scope="col">No. of Pending Appointments</th>
            <th scope="col">Administered Completion</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {batches.map(batch =>
            <tr
            className="hoverable-row"
            key={batch.batchNo}
            role="button" //this change the cursor when mouse over
            onClick={() => onRowSelect(batch)} //callback function
            >
              <td>{batch.batchNo}</td>
              <td>{batch.vaccineName ?? ''}</td>
              <td>{batch.expiryDate}</td>
              <td>{batch.noOfPendingVaccination}</td>

              <td>
              <div className="d-flex align-items-center">
                <div>
                  <Progress max="100" value={batch.administeredCompletion} barClassName="bg-success" />
                </div>
                <span className="ml-2">{batch.administeredCompletion}%</span>
              </div>
            </td>
            </tr>
            )}
       
          <tr>
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
          </tr>
        </tbody>
        </Table>
          </Card>
        </Col>
  );
};

export default BatchTable;
