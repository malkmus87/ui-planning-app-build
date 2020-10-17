import React, { useState } from 'react';
import JsonRequestHandler from '../_classes/JsonRequestHandler';
import cookieHandler from '../_classes/CookieHandler';
import './LoginComponent.css';
const jsonRequestHandler = new JsonRequestHandler({ mainPath: 'https://api-jonapp.herokuapp.com' });

const LoginComponent = ({ onVerifiedLogin }) => {
    const [userCreatorVisibility,setUserCreatorVisibility] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onChange = (event) => {
        switch (event.target.name) {
            case ("username"):
                setUsername(event.target.value);
                break;
            case ("password"):
                setPassword(event.target.value);
                break;
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const response = await jsonRequestHandler.post('auth/login', { username: username, password: password });
        const data = await response.json();
        if (response.status === 200) {
            cookieHandler.setCookie("token", data.token);
            onVerifiedLogin(data.userID);
        }
    }

    const toggleUserCreatorVisibility = async (event) => {
        const newValue=userCreatorVisibility ? false:true;
        setUserCreatorVisibility(newValue);
    }

    return (
        <div className="LoginComponent">
            {!userCreatorVisibility ?
            <div>
            <form className="LoginForm" onSubmit={onSubmit}>
                <label>Användarnamn</label>
                <input 
                    type="text" 
                    onChange={onChange} 
                    value={username} 
                    name="username" 
                />
                <label>Lösenord</label>
                <input 
                    type="password" 
                    onChange={onChange} 
                    value={password} 
                    name="password" 
                />
                <input type="Submit" value="Logga in" />

            </form>
            <div style={{marginTop:20}}>
                        <button className="Create-User-Button" onClick={toggleUserCreatorVisibility}>Skapa inloggning</button>
            </div>
               
            </div>:<UserCreator/>
            }

        </div>
    )
}

const UserCreator = () => {
    const [password,setPassword]=useState('');
    const [username,setUsername]=useState('');
    const [repeatedPassword,setRepeatedPassword]=useState('');
    const [email,setEmail]=useState('');

    const onChange = (event) => {
        switch (event.target.name) {
            case ("username"):
                setUsername(event.target.value);
                break;
            case ("password"):
                setPassword(event.target.value);
                break;
            case ("repeatedPassword"):
                setRepeatedPassword(event.target.value);
                break;
            case ("email"):
                setEmail(event.target.value);
                break;   
        }
    }

    return(
        <div>
            <label>Användarnamn</label>
                <input 
                    type="text" 
                    onChange={onChange} 
                    value={username} 
                    name="username" 
                />
                <label>Email</label>
                <input 
                    type="text" 
                    onChange={onChange} 
                    value={email} 
                    name="email" 
                />
                <label>Lösenord</label>
                <input 
                    type="password" 
                    onChange={onChange} 
                    value={password} 
                    name="password" 
                />
                <label>Upprepa lösenord</label>
                <input 
                    type="password" 
                    onChange={onChange} 
                    value={repeatedPassword} 
                    name="repeatedPassword" 
                />
                <input type="Submit" value="Skapa" />
        </div>
    )
}

export default LoginComponent;