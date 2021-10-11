// node.js library that concatenates classes (strings)
// javascipt plugin for creating charts
import Chart from "chart.js";

// reactstrap components
import {
  Card,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import React from "react";

class Index extends React.Component {
  state = {}

  render(){
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }

  fetch('/verify')
  .then(response => {
    if (response.ok) {
      return response.json();
    }
  })
  .then(myBlob => {
    if (myBlob !== undefined){
      console.log(myBlob.username)
      this.setState({username : myBlob.username})
    }
  })
  
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0">
              <Card className="shadow">
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Vaccine Name</th>
                      <th scope="col">Manufacturer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Pfizer</th>
                      <td>Pfizer Inc</td>
                    </tr>
                    <tr>
                      <th scope="row">Sinovac</th>
                      <td>Sinovac Biotech Ltd</td>
                    </tr>
                    <tr>
                      <th scope="row">AstraZeneca</th>
                      <td>Oxford University</td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
            
          </Row>
        </Container>
      </>
    );
  }
  
};

export default Index;
