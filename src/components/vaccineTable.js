import { Col, Card, CardHeader, Table, Container, Row } from "reactstrap";

class Vaccine {
  constructor(vaccineID, vaccineName, manufacturer) {
    this.vaccineID = vaccineID;
    this.vaccineName = vaccineName;
    this.manufacturer = manufacturer;
  }
}

const VaccineTable = ({ vaccines, onRowSelect }) => {
  require("../assets/css/vaccineTable.css");
  return (
    <Container className="mt--8" fluid>
      <Row className="mt-5">
        <Col className="mb-5 mb-xl-0 mx-auto" xl="10">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <div className="col">
                  <h3 className="mb-0">Vaccines Available</h3>
                </div>
                <div className="col">
                  <h6 className="text-right m-0">
                    Click on a row to add batch
                  </h6>
                </div>
              </Row>
            </CardHeader>
            <Table
              className="align-items-center table-flush"
              responsive
              id="vaccine-table"
            >
              <thead className="thead-light">
                <tr>
                  <th scope="col">Vaccine ID</th>
                  <th scope="col">Vaccine Name</th>
                  <th scope="col">Manufacturer</th>
                </tr>
              </thead>
              <tbody>
                {vaccines.map((vaccine) => (
                  <tr
                    className="hoverable-row"
                    key={vaccine.vaccineID}
                    role="button" //this change the cursor when mouse over
                    onClick={() => onRowSelect(vaccine)} //callback function
                  >
                    <td>{vaccine.vaccineID}</td>
                    <td>{vaccine.vaccineName}</td>
                    <td>{vaccine.manufacturer}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default VaccineTable;