import React from "react";
import {
    Alert,
    FormGroup,
    Button,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
  } from "reactstrap";
  
  class ConfirmVaccinationControl extends React.Component{
      state = {
          choice : undefined,
          remarks : undefined,
          errMsg : undefined,
      }
      onFormSubmit = (event)=>{
        event.preventDefault();
        if(this.state.choice === undefined){
            // No choice
            this.setState({errMsg : "Please Accept/Reject the vaccination first"})
            return;
        }else if(this.state.choice === "Confirmed"){
            //Confirmed
            const formData = `vaccinationID=${this.props.vaccinationID}&status=confirmed`
            fetch('/vaccinations/update-vaccination', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData
                })
                .then(this.props.onSubmit());
        }else{
            //Rejected
            var formData = `vaccinationID=${this.props.vaccinationID}&status=rejected`
            if(this.state.remarks !== undefined){
                formData = formData + `&remarks=${this.state.remarks}`
            }
            //console.log(formData)
            fetch('/vaccinations/update-vaccination', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData
                })
                .then(this.props.onSubmit());
        }
      }
      onAccepted = ()=>{
        this.setState({"choice": "Confirmed"});
      }
      onRejected = ()=>{
        this.setState({"choice": "Rejected"});
      }

      handleChange = (event) =>{
        const value = event.target.value;
        this.setState({
        remarks : value
        });
        
      }

        render(){
            return (
                <Form role="form" id="batch-form" onSubmit={this.onFormSubmit}>
                    <FormGroup className=" p-2">
                        {this.state.errMsg !== undefined &&
                            <>
                            <Alert color="warning">
                              <span className="alert-inner--icon">
                                <i className="ni ni-bell-55"/>
                              </span>{" "}
                              <span className="alert-inner--text">
                                {this.state.errMsg}
                              </span>
                            </Alert>
                          </>
                        }
                        <Row>
                            <Col className="d-flex justify-content-center">  
                            <Button id="accept-btn" className="btn-icon btn-3" value="Confirmed" outline={this.state.choice !== "Confirmed"} color="success" type="button" onClick={this.onAccepted}>
                            <span className="btn-inner--icon">
                                <i className="ni ni-bag-17" />
                            </span>
                            <span className="btn-inner--text">Accept</span>
                            </Button>
                            </Col>
                            <Col className="d-flex justify-content-center">
                            <Button id="reject-btn" className="btn-icon btn-3" value="Rejected" outline={this.state.choice !== "Rejected"} color="danger" type="button" onClick={this.onRejected}>
                            <span className="btn-inner--icon">
                                <i className="ni ni-bag-17" />
                            </span>
                            <span className="btn-inner--text">Reject</span>
                            </Button>
                            </Col>
                        </Row>
                    </FormGroup>
                        <FormGroup className="mb-3" >
                        <InputGroup className="input-group-alternative" >
                            <InputGroupAddon addonType="prepend" >
                            <InputGroupText>
                                <span className="fa fa-comment" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder=" Remarks (If rejected)" type="text" name="remarks" disabled={this.state.choice !== "Rejected"} onChange={this.handleChange} />
                        </InputGroup>
                        </FormGroup>
                        <Button type="submit" color="primary" className="w-100"> Confirm Vaccination Appointment </Button>      
                </Form>
                );
      }
        
  };
  
export default ConfirmVaccinationControl;