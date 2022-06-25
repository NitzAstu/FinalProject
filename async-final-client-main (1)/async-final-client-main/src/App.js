import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Card, Tab, Tabs} from "react-bootstrap";
import {useCallback, useContext, useEffect, useState} from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import MyNavbar from "./components/MyNavbar";
import {UserContext} from "./components/UserContext";

function App() {

    const [user,login,setUser] = useContext(UserContext);

    const isAuth = useCallback(()=> {
        fetch(process.env.REACT_APP_API_ENDPOINT+"users/isAuth", {
            method: "GET",
            credentials: "include",
            headers: {"Content-Type": "application/json"},
        }).then(async response => {
            if(response.ok) {
                const data = await response.json();
                if(data.success){
                    console.log("success is true");
                    setUser((user) => ({
                        ...user,
                        auth: true,
                    }));
                }
        }});

    }, [login]);

    useEffect(()=> {
        //isAuth();
        setTimeout(isAuth,100);
    },[isAuth]);

  return user.auth ?
      ( <div>
              <MyNavbar/>
              <h1>Hello {sessionStorage.getItem("fname")} {sessionStorage.getItem("lname")} </h1>
              <br/>
              <h6>Welcome to Product Management App, where you can manage your expenses. <br/>
              You can add a new cost item with category, sum, and description. <br/>
              You can also get a detailed report of all expenses.</h6>
          </div>
      ) : (
    <div>
        <Card className='card'>
            <Tabs id='tabs' defaultActiveKey='login'>
                <Tab eventKey='login' title='Login' >
                    <Login />
                </Tab>
                <Tab eventKey='signup' title='Register'>
                    <Register />
                </Tab>
            </Tabs>
        </Card>
    </div>
  );
}

export default App;
