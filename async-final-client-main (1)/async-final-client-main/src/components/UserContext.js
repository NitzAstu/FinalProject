import React, {useState} from 'react'

const UserContext = React.createContext( [{}, () => {}] );


const UserProvider = props => {
    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState({ firstName: '',lastName: '', auth: false });

    // Login updates the user data with a name parameter
    const login = (fName,lName) => {
        setUser((user) => ({
            ...user,
            firstName: fName,
            lastName: lName,
            auth: true,
        }));
    };

    return (
        <UserContext.Provider value={[user, login,setUser]}>
            {props.children}
        </UserContext.Provider>
    );
}

export {UserContext, UserProvider};