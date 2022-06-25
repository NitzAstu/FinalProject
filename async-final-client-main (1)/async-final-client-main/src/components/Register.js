import React, {useState} from "react";
import {Button, Col, Container, Row, Alert} from "react-bootstrap";

const Register = () => {
    const [error,setError] = useState("");
    const [success, setSuccess] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [DOB,setDOB] =useState("");

    const genericErrorMessage = "Something went wrong, please try again later."

    const formSubmitHandler = (e) => {
        e.preventDefault();
      fetch(process.env.REACT_APP_API_ENDPOINT+ "users/signup", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({firstName,lastName,username: email,password,DOB})
      })
          .then(async response => {
              if(!response.ok){
                  if(response.status === 400) {
                      setError("Please fill all the fields correctly!")
                  } else if(response.status === 401) {
                      setError("Invalid email and password combination.")
                  } else if(response.status === 500) {
                      const data = await response.json()
                      if (data.message) setError(data.message || genericErrorMessage)
                  } else {
                      setError(genericErrorMessage);
                  }
              }else {
                  const data = await response.json();
                  setSuccess(data.success);
              }
          });
    };

    return (
        <Container >
            <Row>
                <Col>
                    <form onSubmit={formSubmitHandler}>
                        <p className="h4 text-center mb-4">Register</p>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        {success && <Alert variant='success'>{success}</Alert>}
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                            First name
                        </label>
                        <input
                            type="text"
                            id="defaultFormRegisterNameEx"
                            className="form-control"
                            name='firstName'
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                        <br />
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                            Last name
                        </label>
                        <input
                            type="text"
                            id="defaultFormRegisterNameEx1"
                            className="form-control"
                            name='lastName'
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                        <br />
                        <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                            Email
                        </label>
                        <input
                            type="email"
                            id="defaultFormRegisterEmailEx2"
                            className="form-control"
                            name='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <br />
                        <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            id="defaultFormRegisterEmailEx3"
                            className="form-control"
                            name='birthday'
                            onChange={e => setDOB(e.target.value)}
                        />
                        <br />
                        <label
                            htmlFor="defaultFormRegisterPasswordEx"
                            className="grey-text"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="defaultFormRegisterPasswordEx"
                            className="form-control"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <div className="text-center mt-4">
                            <Button color="unique" type="submit">
                                Register
                            </Button>
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    );

}

export default Register;