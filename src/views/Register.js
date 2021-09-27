import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import CreatableSelect from 'react-select/creatable';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

function HealthcareCentreAddressInput(props){
  return (
    <FormGroup>
      <Input disabled={props.isDisabled} placeholder={props.value} type="text" />
    </FormGroup>
  );
}

const createOption = (label) => ({
  label,
  value: label,
});

var healthcareCentres = []

class Register extends Component {
  state = {
    options: healthcareCentres,
    selectedCentreName: undefined,
    selectedCentreAddress: undefined,
  };

  healthcareCentres = fetch('\\healthcare-centre').then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(myBlob => {
    healthcareCentres = myBlob;
    var newOptions = myBlob.map((healthcareCentre) => createOption(healthcareCentre.centreName));
    this.setState({options : newOptions}) ;
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });

  roleChange = (event) => {
    this.setState({
      role: event.target.value
    });
  }

  handleHealthcareChange = (newValue) => {
    var theCentreName = newValue.label;
    const theCentreAddress = healthcareCentres.find((healthcareCentres)=>{return healthcareCentres.centreName === theCentreName;}).address;

    this.setState({
      selectedCentreName: theCentreName,
      selectedCentreAddress: theCentreAddress,
    });
  };

  handleHealthcareCreate = (inputValue) => {
      const { options } = this.state;
      const newOption = createOption(inputValue);
      this.setState({
        options: [...options, newOption],
        selectedCentreName: newOption,
        selectedCentreAddress: undefined,
      });
  };

  handleChange = (event) =>{
    const target = event.target;
    const value =  target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  
  handleForm = (event) =>{
    event.preventDefault();
    let formData;
    let formDataTxt = ""
    if(this.state.role === "administrator"){
      //Create a new administrator
      formData = {
        centreName : this.state.selectedCentreName,
        centreAddress : this.state.selectedCentreAddress === undefined?"NULL":this.state.selectedCentreAddress,
        username : this.state.username,
        password : this.state.password,
        fullName : this.state.fullName,
        email : this.state.email,
        redirect: null
      };
      fetch('/admins', {
        method: 'POST',
        body: JSON.stringify(formData)
        })
        .then(res => console.log(res));
    }else{
      //Create a new patient
      formDataTxt = `username=${this.state.username}&password=${this.state.username}&fullName=${this.state.fullName}&email=${this.state.email}&ICPassport=${this.state.ICPassport}`
      console.log(formDataTxt)
      fetch('/patients', {
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formDataTxt
      })
      .then(res => res.redirected?this.setState({redirect:'/'}):this.setState({errMsg:"Duplicate Username"}));
    }
  }

  render(){
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center mb-4">
                <h1>Sign Up</h1>
                {this.state.errMsg?
                <small className="text-danger">{this.state.errMsg}</small>:
                <></>}
              </div>
              <Form id="register-form" role="form" onSubmit={this.handleForm} >
                <FormGroup>
                  <Row className="my-4">
                  <div className="custom-control custom-radio mx-auto">
                    <input
                      className="custom-control-input"
                      id="adminstratorRadio"
                      name="role"
                      type="radio"
                      value="administrator"
                      onChange={this.roleChange}
                    />
                    <label className="custom-control-label" htmlFor="adminstratorRadio">
                      Adminstrator
                    </label>
                  </div>
                  <div className="custom-control custom-radio mx-auto">
                    <input
                      className="custom-control-input"
                      defaultChecked
                      id="patientRadio"
                      name="role"
                      type="radio"
                      value="patient"
                      onChange={this.roleChange}
                    />
                    <label className="custom-control-label" htmlFor="patientRadio">
                      Patient
                    </label>
                  </div>
                  </Row>
                </FormGroup>
                {this.state.role === "administrator" &&
                  <div className="admin-only">
                    
                    <FormGroup>
                      <label>Healthcare Centre</label>
                      <CreatableSelect
                        isClearable
                        onChange={this.handleHealthcareChange}
                        onCreateOption={this.handleHealthcareCreate}
                        options={this.state.options}
                        value={this.state.selectedCentreName}
                        placeholder={this.state.selectedCentreName}
                      />
                    </FormGroup>
                    {
                      this.state.selectedCentreAddress === undefined?
                      <HealthcareCentreAddressInput isDisabled={false}  value={"Healthcare Centre Name"}/>:
                      <HealthcareCentreAddressInput isDisabled={true} id="form-control-centreaddress" value={this.state.selectedCentreAddress}/>
                    }
                    
                  </div>
                }
                <label>Your Personal Information</label>

                <FormGroup>
                  <InputGroup className={this.state.errMsg==="Duplicate Username"?"input-group-alternative mb-3 has-danger":"input-group-alternative mb-3"} >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      id="form-control-username"
                      name = "username"
                      placeholder="Username"
                      type="text"
                      onChange = {this.handleChange}
                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      id="form-control-password"
                      name = "password"
                      placeholder="Pasword"
                      type="password"
                      onChange = {this.handleChange}
                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-circle-08" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      id="form-control-fullname"
                      name = "fullName"
                      placeholder="Full Name"
                      type="text"
                      onChange = {this.handleChange}
                    />
                  </InputGroup>
                </FormGroup>
                  
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      id="form-control-email"
                      name = "email"
                      placeholder="Email"
                      type="email"
                      onChange = {this.handleChange}
                    />
                  </InputGroup>
                </FormGroup>
                
                {
                  this.state.role === "administrator"?
                  <div>
                    <FormGroup className="admin-only">
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-badge" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          id="form-control-staffid"
                          name = "staffID"
                          placeholder="Staff ID"
                          type="text"
                          onChange = {this.handleChange}
                        />
                      </InputGroup>
                  </FormGroup>
                  </div> :
                    <div>
                      <FormGroup className="admin-only">
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-badge" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            id="form-control-icpassport"
                            name = "ICPassport"
                            placeholder="IC/Passport No"
                            type="text"
                            onChange = {this.handleChange}
                          />
                        </InputGroup>
                      </FormGroup>
                  </div>
                }
                
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="submit">
                    Sign Up
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
  
};

export default Register;