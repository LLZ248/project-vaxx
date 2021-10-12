import React from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from "reactstrap";
import { Alert } from "reactstrap";

class LoginForm extends React.Component{
    state = {
        role: this.props.role,
    }

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
        const formData = `username=${this.state.username}&password=${this.state.password}`;
        //console.log(formData)
        if(this.state.role === "administrator"){
          fetch('/administrators/verifyAdministrator', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData
            })
            .then(response => {
                if(!response.ok){
                    //invalid login
                    this.setState({errMsg:"Wrong username/password"})
                }else{
                    //valid login
                    this.setState({redirect:'/admin/dashboard'})
                }
            })
    
        }else{
            //console.log("patient");
          fetch('/patients/verifypatient', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData
          })
          .then(response => {
            if(!response.ok){
                //invalid login
                this.setState({errMsg:"Wrong username/password"})
            }else{
                //valid login
                this.setState({redirect:'/'})
            }
          })
        }
      }

    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        return(
            <Card className="bg-secondary shadow border-0 mt-5">
                <CardBody className="px-lg-5 py-lg-5">
                <Form role="form" onSubmit={this.handleForm}>
                    <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className="ni ni-circle-08" />
                        </InputGroupText>
                        </InputGroupAddon>
                        <Input
                        placeholder={this.state.role + " username"}
                        name = "username"
                        type="text"
                        onChange = {this.handleChange}
                        required
                        />
                    </InputGroup>
                    </FormGroup>
                    <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                        </InputGroupAddon>
                        <Input
                        placeholder="Password"
                        name="password"
                        type="password"
                        onChange = {this.handleChange}
                        required
                        />
                    </InputGroup>
                    </FormGroup>
                    {
                        this.state.errMsg !== undefined &&
                        <div>
                            <Alert color="danger">{this.state.errMsg}</Alert>
                        </div>
                    }
                    <div className="text-center">
                    <Button className="my-4" color="primary" type="submit">
                        Sign in
                    </Button>
                    </div>
                </Form>
                </CardBody>
            </Card>
        )
    }
}

export default LoginForm