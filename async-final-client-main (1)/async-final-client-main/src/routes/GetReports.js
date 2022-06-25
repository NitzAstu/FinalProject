import React, {useState} from 'react';
import MyNavbar from "../components/MyNavbar";
import {Badge, Button, Form, ListGroup} from "react-bootstrap";


const GetReports = () => {

    const [error, setError] = useState("");
    const [itemList, setItemList] = useState([]);
    const [year,setYear] = useState(2022);
    const [ month, setMonth] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        const year1 = year.toString();
        const month1 = month.toString();
        fetch(process.env.REACT_APP_API_ENDPOINT + "users/getItems/"+year1+"/"+month1, {
            method: "GET",
            credentials: "include",
            headers: {"Content-Type": "application/json"},
        })
            .then( async response => {
                if(!response.ok) {
                    setError("error occurred 500");
                } else {
                    const data = await response.json();
                    setItemList(data.answer);
                }
            })
            .catch(error => {
                setError(error.toString());
            })
    };

    return sessionStorage.getItem("fname") != null ?(
        <div>
            <MyNavbar />
            <Form className='report-form' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="year">
                    <Form.Label>Year</Form.Label>
                    <Form.Control type="number" placeholder="Year" value={year} onChange={e => setYear(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="month">
                    <Form.Label>Month</Form.Label>
                    <Form.Control type="number" placeholder="Month" value={month} onChange={e => setMonth(e.target.value)}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Get Report
                </Button>
            </Form>
            {error && <h4>{error}</h4>}
            <ListGroup className='my-list-group' as='ol' numbered>
            {itemList.map( item => {
                return (<ListGroup.Item key={item._id}
                                        as="li"
                                        className="d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Category: { item.category.toString()}</div>
                        Description: { item.description.toString()}
                    </div>
                    <Badge bg="primary" pill>
                        Amount: { item.sum.toString()} &#36;
                    </Badge>
                </ListGroup.Item>)
            })}
            </ListGroup>
        </div>
    ) : (
        <h1>Please login</h1>
    );
};

export default GetReports;