// node.js library that concatenates classes (strings)
// javascipt plugin for creating charts
import Chart from "chart.js";

// reactstrap components
import {
  Card,
  Container,
  Row,
  Col,
  CardBody,
  CardTitle,
} from "reactstrap";
import VaccineTable from 'components/VaccineTable'
// core components
import {
  chartOptions,
  parseOptions
} from "variables/charts.js";
import Header from "components/Headers/Header.js";
import React from "react";

var vaccines = []

class Index extends React.Component {
  state = {vaccines : vaccines}

  vaccines = fetch('/vaccines').then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(vaccines => {
    this.setState({vaccines : vaccines}) ;
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });

  OnRowSelected = (selectedVaccine) => {
    alert(selectedVaccine.vaccineID)
  };
  
  render(){
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  
    return (
      <>
        <Header />
        {/* Page content */}
        
        <Container className="mt--9" fluid>
          <Row>
          
            <Col>
                  <h1 className="text-center">Sign Up For Vaccination in 4 Simple Step</h1>
            </Col>
          </Row >
          <Row className="justify-content-md-center">
          <div style={{ width: "30rem" }}>
            <Card className="card-stats mb-4 mb-lg-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle className="text-uppercase text-muted mb-0">
                      Step 1
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">Select A Vaccine</span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                      <i className="fas fa-syringe" />
                    </div>
                  </Col>
                </Row>
                
              </CardBody>
            </Card>
          </div>
          </Row>
            
        </Container>
        <br/> <br/> <br/> <br/> 
        
            <VaccineTable 
                vaccines={this.state.vaccines}
                onRowSelect={this.OnRowSelected} 
                title="Vaccine Available"
                message="Click on a row to select vaccine"
              />
        
      </>
    );
  }
  
};

export default Index;
