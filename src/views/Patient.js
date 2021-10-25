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
  FormGroup,
  InputGroupText,
  InputGroupAddon,
  InputGroup,
  Form
} from "reactstrap";
import { WaveLoading } from 'react-loadingg';
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
import ReactDatetime from "react-datetime";
import { Link } from "react-router-dom";

class Index extends React.Component {

  state = {
    step : 1,
    success : undefined,
    isLoading : false,
    vaccines : [],
    centres : [],
    batches : [],
    vaccineID : undefined,
    vaccine : undefined,
    centreName : undefined,
    username : undefined,
    fullName : undefined,
    batchNo : undefined,
    expiryDate : undefined,
    defaultModal: false,
    upcomingDate : undefined,
    vaccinationID : undefined,
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
    (()=>{
      switch(this.state.step){
        case 2 :
          this.setState({"vaccine":undefined,"centreName":undefined,"step":1});
          return;
        case 3:
          this.setState({"fullName":undefined,"username":undefined,"centreName":undefined,"step":2});
          return;
        case 4:
          this.setState({"batchNo":undefined,"step":3});
          return;
        default:
          return null;
      }
    })()
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
    this.setState({"batchNo":selectedBatch.batchNo,
    "step":4});
    console.log(selectedBatch.expiryDate)
    console.log(typeof(selectedBatch.expiryDate))
    var dateString = selectedBatch.expiryDate;
    var dateParts = dateString.split("/");
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    console.log(dateObject)
    console.log(typeof(dateObject))
    this.setState({"expiryDate":dateObject});
    
    //continue to ask for upcoming date
  }

  OnSelectedUpcomingDate = (event)=>{
    event.preventDefault();
    this.setState({"upcomingDate":document.getElementById('upcoming-date-input').value});
    this.setState({"isLoading":true})
    const formData = `batchNo=${this.state.batchNo}&appointmentDate=${document.getElementById('upcoming-date-input').value}&username=${this.state.username}`
    //console.log(formData)
    fetch('/vaccinations', {
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData
    })
    .then(res => {
        if(res.ok){
          return res.json();
        }else{
          return undefined;
        }
      }
    ).then(resJson =>{
      this.setState({"isLoading":false})
      if(resJson !== undefined){
        this.setState({"success" : true});
        this.setState({"vaccinationID":resJson.vaccinationID})
      }else{
        this.setState({"success": false})
      }
      }
    );
      
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
        {
          this.state.step!==1 &&
          <div className="col-4 pl-0">
            <Button className="btn-icon btn-3" color="danger" style={{"height":"100%"}} type="button" onClick={this.revertSelection}>
              <span className="icon">
                <i className="ni ni-fat-remove"/>
              </span>
              <div className="text-center">Revert Selection</div>
            </Button>
          </div>
        }
      
      </Row>
      
      <div className="col-lg-3">
      </div>
    </Row>
  </Container>
  }

  onUpcomingDateChanged = (event) => {
    document.getElementById('date-validator').value = 'accepted';
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
                  {this.state.success === undefined && <h1 className="text-center">Sign Up For Vaccination in 4 Simple Step</h1>}
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
              if(this.state.success === undefined)
                return (<div>
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
                          <li className="text-center"><b>Select Your Upcoming Date :</b></li>
                        </ul>
                        <Container>
                          <Form onSubmit={this.OnSelectedUpcomingDate}>
                            <FormGroup className="mx-auto" style={{"width":"50%"}}>
                              <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-calendar-grid-58" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <ReactDatetime 
                                  inputProps={{ 
                                    id: 'upcoming-date-input',
                                    placeholder: "Upcoming Date", 
                                    style: { padding :'0', background:'white', cursor:'pointer'}, 
                                    name: "upcomingDate",
                                    readOnly: '{true}'}}
                                  dateFormat='YYYY-MM-DD'
                                  timeFormat={false} 
                                  closeOnSelect={true} 
                                  isValidDate={date => date.isAfter(Date.now()) && date.isBefore(this.state.expiryDate)}
                                  onChange={this.onUpcomingDateChanged}/>
                                  {<input
                                  id='date-validator'
                                  tabIndex={-1}
                                  autoComplete="off"
                                  style={{ opacity: 0, height: 0, width: 0, position: "absolute", left: '30%', bottom:0, padding:0 }}
                                  required={true}
                                />}
                              </InputGroup>
                            </FormGroup>
                            {this.state.isLoading?
                            <div className="text-center">
                              <FormGroup className="my-4">
                                <WaveLoading color="#117CEF" size="large" style={{"position":"relative","margin":"auto"}}/>
                              </FormGroup>
                            </div>:
                            <div className="text-center">
                              <Button className="btn-icon btn-3" color="danger" type="button" onClick={this.revertSelection}>
                                <span className="icon">
                                  <i className="ni ni-fat-remove"/>
                                </span>
                                <div className="text-center">Revert Selection</div>
                              </Button>
                              <Button className="btn-icon btn-3" color="primary" type="submit">
                                <span className="icon">
                                  <i className="ni ni-check-bold"/>
                                </span>
                                <div className="text-center">Submit</div>
                              </Button>
                            </div>
                            }
                          </Form>
                        </Container>
                        
                      </CardBody>
                    </Card>
                    </Col>
                    </Row>
                    
                  </Container>
              </div>);
              if (this.state.success){
                return (
                  <div>
                  <Container className="mt--1">
                    <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0 mx-auto" xl='10'>
                    <Card className="card-stats mb-4 mb-lg-0">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle className="text-uppercase h1 text-center mb-4 card-title">
                              Your Vaccination Receipt
                            </CardTitle>
                          </div>
                        </Row>
                        <ul style={{"listStyleType":"none","padding":"0"}}>
                          <li><b>Vaccination ID</b> : {this.state.vaccinationID}</li>
                          <li><b>Full Name</b> : {this.state.fullName}</li>
                          <li><b>Vaccine</b> : {this.state.vaccine}</li>
                          <li><b>Healthcare Centre</b> : {this.state.centreName}</li>
                          <li><b>BatchNo</b> : {this.state.batchNo}</li>
                          <li><b>Upcoming Date :</b>{this.state.upcomingDate}</li>
                        </ul>
                      </CardBody>
                    </Card>
                    </Col>
                    </Row>
                    <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0 mx-auto" xl='10'>
                      <Link to="/">
                        <Button block size="lg" color="success" >
                            <p>Confirm</p>
                        </Button> 
                      </Link>
                    </Col>
                    </Row>
                    
                  </Container>
                  </div>
                );
              }
              else{
                <div>
                  <Container className="mt--1">
                    <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0 mx-auto" xl='10'>
                    <Card className="card-stats mb-4 mb-lg-0">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle className="text-uppercase h1 text-center mb-4 card-title">
                              Something unexcepted happened
                            </CardTitle>
                          </div>
                        </Row>
                        Please Report To projectvaxx@gmail.com
                      </CardBody>
                    </Card>
                    </Col>
                    </Row>
                    <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0 mx-auto" xl='10'>
                      <Link to="/">
                        <Button block size="lg" color="danger" >
                            <p>Click here to go back homepage</p>
                        </Button> 
                      </Link>
                    </Col>
                    </Row>
                    
                  </Container>
                  </div>
              }
              break;          
            default:
              return null
          }
        })()}
      </>
    );
  }
  
};

export default Index;
