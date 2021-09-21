// reactstrap components
import {
  Badge,
  Col,
  Button,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import VaccineTable from "components/VaccineTable.js";

class Vaccine {
  constructor(vaccineID, vaccineName, manufacturer) {
    this.vaccineID = vaccineID;
    this.vaccineName = vaccineName;
    this.manufacturer = manufacturer;
  }
}

const vaccines = [
  new Vaccine(1 , "Pfizer", "Pfizer Biotech Ltd"),
  new Vaccine(2 , "Sinovac", "Sinovac Biotech Ltd"),
  new Vaccine(3 , "AstraZeneca", "AstraZeneca Biotech Ltd"),
]

const onRowSelected = (selectedVaccine) => {
  alert(selectedVaccine.vaccineID)
}

const VaccineView = () => {
  return (
    <>
      <Header />
      <VaccineTable vaccines={vaccines} onRowSelect={onRowSelected}/>

      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Project</th>
            <th scope="col">Budget</th>
            <th scope="col">Status</th>
            <th scope="col">Users</th>
            <th scope="col">Completion</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
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
    </>
  );
};

export default VaccineView;
