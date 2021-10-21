// node.js library that concatenates classes (strings)
// javascipt plugin for creating charts
import Chart from "chart.js";

// reactstrap components
import {
  Card,
  Container,
  Row,
  Col,
  CardTitle,
  Button,
  CardBody,
  Modal,
} from "reactstrap";
import LoginForm from 'components/LoginForm';
import VaccineTable from 'components/VaccineTable'
import CentreTable from 'components/CentreTable'
import BatchTable from "components/BatchTable";
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
    centres : [],
    batches : [],
    vaccineID : undefined,
    vaccine : undefined,
    centreName : undefined,
    username : undefined,
    fullName : undefined,
    batchNo : undefined,
    upcomingDate : undefined,
    defaultModal: false
  }

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

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

  revertSelection = ()=>{

  }

  OnVaccineRowSelected = (selectedVaccine) => {
    this.setState({
    "vaccineID":selectedVaccine.vaccineID,
    "vaccine":selectedVaccine.vaccineName,
    "step":2})
    //Continue to show healthcare centre
    fetch('/available-healthcare-centres?vaccineID='+selectedVaccine.vaccineID).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(centres => {
      this.setState({"centres" : centres}) ;
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  };

  successLogin = (patientUsername, patientFullName) =>{
    //console.log("Success Login: username: " + patientUsername +"full name: " + patientFullName);
    this.setState({"step":3,"username":patientUsername,"fullName":patientFullName});
    this.toggleModal("formModal");
    //Continue to show healthcare centre
    fetch('/available-batches?vaccineID='+this.state.vaccineID+'&centreName='+this.state.centreName).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(batches => {
      this.setState({"batches" : batches}) ;
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  }

  loginModal = () =>{
    return <Modal
    className="modal-dialog-centered"
    size="sm"
    isOpen={this.state.formModal}
    toggle={() => this.toggleModal("formModal")}
  >
    <div className="modal-header">
      <h1 className="modal-title" id="formModalLabel">
        Log In To Continue
      </h1>
      <button
        aria-label="Close"
        className="close"
        data-dismiss="modal"
        type="button"
        onClick={() => this.toggleModal("formModal")}
      >
        <span aria-hidden={true}>×</span>
      </button>
    </div>
    <div className="modal-body p-0">
      <LoginForm role="patient" onSuccessLogin={(patientUsername, patientFullName) => this.successLogin(patientUsername, patientFullName)}/>
    </div>
  </Modal>
  }

  OnCentreRowSelected = (selectedCentre)=>{
    this.setState({
      "centreName":selectedCentre.centreName})
    this.toggleModal("formModal")
    //ask to login
  }

  OnBatchRowSelected = (selectedBatch)=>{
    this.setState({"batchNo":selectedBatch.batchNo,"step":4});
    
    //continue to ask for upcoming date
  }

  OnSelectedUpcomingDate = (selectedDate)=>{
    //Finished Appointment
    //display the vaccination receipt
  }

  selectedInfoCard = ()=>{
    return <Card className="card-stats mb-4 mb-lg-0" style={{"height":"100%"}}>
    <CardBody>
      <CardTitle className="text-uppercase text-muted mb-0">
        Selected Info
      </CardTitle>
      <span className="h5 mb-0">
        <ul style={{"listStyleType":"none","padding":"0"}}>
          <li><b>Full Name</b> : {this.state.fullName}</li>
          <li><b>Vaccine</b> : {this.state.vaccine}</li>
          <li><b>Healthcare Centre</b> : {this.state.centreName}</li>
          <li><b>BatchNo</b> : {this.state.batchNo}</li>
        </ul>
      </span>
    </CardBody>
  </Card>
  }

  stepDescriptionRow = ()=>{
    return <Container fluid>
    <Row className="justify-content-md-center">
      <div className="col-lg-3"></div>
      <div className="col-lg-2" style={{ width: "30rem" }}>
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
      <Row className="col-lg-4">
      <div className="col-8 pr-0" style={{ "width": "30rem"}}>
        {this.selectedInfoCard()}
      </div>
      <div className="col-4 pl-0">
        <Button className="btn-icon btn-3" color="danger" style={{"height":"100%"}} type="button" onClick={this.revertSelection()}>
          <span className="icon">
            <i className="ni ni-fat-remove"/>
          </span>
          <div className="text-center">Revert Selection</div>
        </Button>
      </div>
      </Row>
      
      <div className="col-lg-3">
      </div>
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
        {this.loginModal()}
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
                title=" Available Vaccine"
                message="Click on a row to select vaccine"
              />
            </div>
            case 2:
              return <div>
                {this.stepDescriptionRow()}
                <CentreTable 
                centres={this.state.centres}
                onRowSelect={this.OnCentreRowSelected} 
                title="Available Healthcare Centre"
                message="Click on a row to select healthcare centre"
                /></div>
            case 3:
              return <div>
                {this.stepDescriptionRow()}
                <Container className="mt--1">
                  <Row className="mt-5">
                  <Col className="mb-5 mb-xl-0 mx-auto" xl='10'>
                    <BatchTable
                    batches={this.state.batches}
                    role={"patient"}
                    onRowSelect={this.OnBatchRowSelected}
                    />
                  </Col>
                  </Row>
                </Container>
            </div>
            case 4:
              return <div>
                <Container className="mt--1">
                  <Row className="mt-5">
                  <Col className="mb-5 mb-xl-0 mx-auto" xl='10'>
                  <Card className="card-stats mb-4 mb-lg-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle className="text-uppercase text-muted mb-0">
                            Your Selected Info
                          </CardTitle>
                        </div>
                        
                      </Row>
                      <ul style={{"listStyleType":"none","padding":"0"}}>
                        <li><b>Full Name</b> : {this.state.fullName}</li>
                        <li><b>Vaccine</b> : {this.state.vaccine}</li>
                        <li><b>Healthcare Centre</b> : {this.state.centreName}</li>
                        <li><b>BatchNo</b> : {this.state.batchNo}</li>
                      </ul>
                    </CardBody>
                  </Card>
                  </Col>
                  </Row>
                </Container>
            </div>
            default:
              return null
          }
        })()}
      </>
    );
  }
  
};

export default Index;
