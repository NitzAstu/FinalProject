import React, {useContext, useState} from "react";
import { Button, Container, Row, Col} from "react-bootstrap";
import {UserContext} from "./UserContext";



const Login = () => {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user,setUser,login] = useContext(UserContext);


    const submitHandler = (e) => {
        e.preventDefault();
        setError("");

        const genericErrorMessage = "Something went wrong! Please try again later."

        fetch(process.env.REACT_APP_API_ENDPOINT + "users/login", {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username: email, password}),
        })
            .then( async response => {
                if(!response.ok) {
                    if(response.status === 400) {
                        setError("Please fill all the fields correctly!");
                    } else if(response.status === 401) {
                        setError("Invalid Email and password combination.");
                    }else {
                        setError(genericErrorMessage);
                    }
                } else {
                    const data = await response.json();
                    if(data.success) {
                        login(data.firstName,data.lastName);
                        sessionStorage.setItem("fname",data.firstName);
                        sessionStorage.setItem("lname",data.lastName);
                    }
                }
            })
            .catch(error => {
                setError(genericErrorMessage);
            })
    }
    return (
        <Container>
            <Row>
                <Col>
                    <form onSubmit={submitHandler}>
                        <p className="h4 text-center mb-4">Sign in</p>
                        {error && <p className='text-danger'>{error}</p>}
                        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Email
                        </label>
                        <input
                            type="email"
                            id="defaultFormLoginEmailEx"
                            className="form-control"
                            value={email}
                            onChange={e=> setEmail(e.target.value)}
                        />
                        <br />
                        <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                            Password
                        </label>
                        <input
                            type="password"
                            id="defaultFormLoginPasswordEx"
                            className="form-control"
                            value={password}
                            onChange={e=> setPassword(e.target.value)}
                        />
                        <div className="text-center mt-4">
                            <Button color="indigo" type="submit">
                                Login
                            </Button>
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    )
};

export default Login;