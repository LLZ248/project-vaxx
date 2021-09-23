import { Col, Card, CardHeader, Table, Container, Row , DropdownItem, Media, Badge, UncontrolledTooltip, DropdownToggle, Progress, UncontrolledDropdown, DropdownMenu} from "reactstrap";

const BatchTable = ({ batches, onRowSelect, title, message, hideColumn }) => {
  require("../assets/css/hoverableTable.css");

  return (
    <Container className="mt--8" fluid>
      <Row className="mt-5">
        <Col className="mb-5 mb-xl-0 mx-auto" xl="10">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <div className="col">
                  <h3 className="mb-0">{title}</h3>
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
              {/* <td>{batch.vaccine.vaccineName}</td> */}
              <td>{batch.quantityAvailable}</td>

              <td>
              <div className="d-flex align-items-center">
                <span className="mr-2">{batch.quantityAdministered}</span>
                <div>
                  <Progress max="100" value={batch.quantityAvailable - batch.quantityAdministered} barClassName="bg-success" />
                </div>
              </div>
            </td>
            </tr>
            )}
       
          <tr className="hoverable-row">
            <th scope="row">
              <Media className="align-items-center">
                <a
                  className="avatar rounded-circle mr-3"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <img
                    alt="..."
                    src={require("../assets/img/theme/bootstrap.jpg").default}
                  />
                </a>
                <Media>
                  <span className="mb-0 text-sm">Argon Design System</span>
                </Media>
              </Media>
            </th>
            <td>$2,500 USD</td>
            <td>Pending</td>
            <td>
              <div className="d-flex align-items-center">
                <span className="mr-2">60%</span>
                <div>
                  <Progress max="100" value="60" barClassName="bg-danger" />
                </div>
              </div>
            </td>
            <td className="text-right">
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
          </tr>
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
            </td>
            <td>
              <div className="d-flex align-items-center">
                <span className="mr-2">100%</span>
                <div>
                  <Progress max="100" value="100" barClassName="bg-success" />
                </div>
              </div>
            </td>
            <td className="text-right">
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
          </tr>
        </tbody>
        </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BatchTable;
