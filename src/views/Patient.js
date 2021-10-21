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


class Index extends React.Component {
  state = {
    step : 1,
    vaccines : [],
    vaccine : undefined,
    centreName : undefined,
    username : undefined,
    fullName : undefined,
    batchNo : undefined,
    upcomingDate : undefined,
  }

  // Get the available vaccine sql statement
  /*
    SELECT batch.vaccineID FROM `batch` 
    INNER JOIN vaccine 
    ON batch.vaccineID=vaccine.vaccineID
    GROUP BY batch.vaccineID;
  */

  vaccines = fetch('/available-vaccines').then(response => {
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

  OnVaccineRowSelected = (selectedVaccine) => {
    this.setState({"vaccine":selectedVaccine.vaccineName})
    this.setState({"step":2})
    //Continue to show healthcare centre
    //sql
    /*
    SELECT batch.centreName FROM `batch` 
    INNER JOIN healthcarecentre
    ON batch.centreName=healthcarecentre.centreName
    WHERE vaccineID = 'PF'
    GROUP BY batch.centreName;
    */
  };

  OnCentreRowSelected = (selectedCentre)=>{
    //ask to login
  }

  UponLogin = ()=>{
    //show batch 
    /** 
      SELECT 
      batch.batchNo,
      batch.quantityAvailable,
      count(vaccination.vaccinationID) as BatchQuantity
      FROM `batch`
      LEFT JOIN vaccination 
      ON batch.batchNo = vaccination.batchNo 
      WHERE vaccination.status IN ('pending','confirmed','administered')
      AND centreName = 'Beacon Hospital' 
      AND vaccineID = 'PF'
      AND expiryDate > CURDATE()
      GROUP BY vaccination.batchNo
      HAVING BatchQuantity < batch.quantityAvailable;
    */
  }

  OnBatchRowSelected = (selectedBatch)=>{
    //continue to ask for upcoming date
  }

  OnSelectedUpcomingDate = (selectedDate)=>{
    //Finished Appointment
    //display the vaccination receipt
  }

  selectedInfoCard = ()=>{
    return <Card className="card-stats mb-4 mb-lg-0">
    <CardBody>
      <CardTitle className="text-uppercase text-muted mb-0">
        Selected Info
      </CardTitle>
      <span className="h4 font-weight-bold mb-0">
        <ul style={{"list-style-type":"none","padding":"0"}}>
          <li>Vaccine : {this.state.vaccine}</li>
        </ul>
      </span>
    </CardBody>
  </Card>
  }

  stepDescriptionRow = ()=>{
    return <Container fluid>
    <Row className="justify-content-md-center">
      <div class="col-lg-3"></div>
      <div class="col-lg-3" style={{ width: "30rem" }}>
        <Card className="card-stats mb-4 mb-lg-0">
          <CardBody>
            <Row>
              <div className="col">
                <CardTitle className="text-uppercase text-muted mb-0">
                  Step {this.state.step}
                </CardTitle>
                {(()=>{
                    switch(this.state.step){
                      case 1 :
                        return <span className="h2 font-weight-bold mb-0">Select A Vaccine</span>
                      case 2 :
                        return <span className="h2 font-weight-bold mb-0">Select A Healthcare Centre</span>
                      case 3:
                        return <span className="h2 font-weight-bold mb-0">Select A Vaccine</span>
                      case 4:
                        return <span className="h2 font-weight-bold mb-0">Select A Vaccine</span>
                      default:
                        return null;
                    }
                  })()}
                
              </div>
              <Col className="col-auto">
                <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                  {(()=>{
                    switch(this.state.step){
                      case 1 :
                        return <i className="fas fa-syringe" />
                      case 2 :
                        return <i className="fas fa-hospital" />
                      case 3:
                        return <i className="fas fa-syringe" />
                      case 4:
                        return <i className="fas fa-syringe" />
                      default:
                        return null;
                    }
                  })()}
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
      <div class="col-lg-2" style={{ width: "30rem" }}>
        {this.selectedInfoCard()}
      </div>
      <div class="col-lg-3"></div>
    </Row>
  </Container>
  }
  
  render(){
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }

    
  
    return (
      <>
        <Header />
        <Container className="mt--9" fluid>
          <Row>
            <Col>
                  <h1 className="text-center">Sign Up For Vaccination in 4 Simple Step</h1>
            </Col>
          </Row >
        </Container>
        {/* Page content */}
        {(()=>{
          switch (this.state.step){
            case 1 :
              return <div>
              {this.stepDescriptionRow()}
              <VaccineTable 
                vaccines={this.state.vaccines}
                onRowSelect={this.OnVaccineRowSelected} 
                title="Vaccine Available"
                message="Click on a row to select vaccine"
              />
            </div>
            case 2:
              return <div>
              <Container fluid>
                {this.stepDescriptionRow()}
                <VaccineTable 
                vaccines={this.state.vaccines}
                onRowSelect={this.OnVaccineRowSelected} 
                title="Vaccine Available"
                message="Click on a row to select vaccine"
                />
              </Container>
            </div>
          }
        })()}
      </>
    );
  }
  
};

export default Index;
