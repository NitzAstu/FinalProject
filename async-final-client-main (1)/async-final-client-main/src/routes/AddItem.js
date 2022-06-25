import MyNavbar from "../components/MyNavbar";
import {Form, Button} from "react-bootstrap";
import React, {useState} from "react";


const AddItem = () => {

    const [error, setError] = useState("");
    const [category,setCategory] = useState("");
    const [sum,setSum] = useState(0);
    const [description,setDescription] = useState("");
    const [sucMessage, setSucMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(process.env.REACT_APP_API_ENDPOINT + "users/addItem", {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({category: category,sum: sum,description:description}),
        })
            .then( async response => {
                if(!response.ok) {
                    if(response.status === 400) {
                        setError("Please fill all the fields correctly!");
                    } else {
                        setError("error occurred");
                    }
                } else {
                    const data = await response.json();
                    setSucMessage(data.message);
                }
            })
            .catch(error => {
                setError("error occurred");
            })
    };

    return sessionStorage.getItem("fname") != null ? (
      <div>
          <MyNavbar/>
          <h2>Add New Cost Item</h2>
          <br/>
          <Form className='form' onSubmit={handleSubmit}>
              {error && <h4 className='text-danger'>{error}</h4>}
              {sucMessage && <h4 className='text-success' > {sucMessage}</h4>}
              <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="sum">
                  <Form.Label>Sum</Form.Label>
                  <Form.Control type="number" placeholder="Sum" value={sum} onChange={e=> setSum(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" placeholder="Description" value={description} onChange={e=> setDescription(e.target.value)}/>
              </Form.Group>

              <Button variant="primary" type="submit">
                  Add Item
              </Button>
          </Form>
      </div>
    ): (
        <h1>Please login</h1>
    );
};

export default AddItem;