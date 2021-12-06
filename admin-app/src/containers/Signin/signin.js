import React, { useState, useEffect } from 'react';
import {Form, Button} from 'react-bootstrap';
import Input from '../../components/UI/Inputs/signupinput';
import { login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';


/**
* @author
* @function Signin
**/

const Signin = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const userLogin =(e) =>{
        
        e.preventDefault();
    
        const user = {
            email, password
        }

        dispatch(login(user));
    }

    if(auth.authenticate){
        return <Redirect to={`/`} />
    }

    return (
        <div className="container ">
            <div style={{ width: '450px', margin: 'auto', padding: '40px 55px 45px 55px' }}>
                <Form onSubmit={ userLogin }>


                    <h3 className="text-center mt-5">Log in</h3>

                        <Input
                            label="Email "
                            placeholder="you@gmail.com "
                            value={email}
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            />

                        <Input
                            label="Password "
                            placeholder="Password "
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            />

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="btn btn-dark btn-lg btn-block">
                        Submit
                    </Button>
                    
                    <p className="forgot-password text-right ">
                        Forgot <a href="#">password?</a>
                    </p>
                </Form>
            </div>
        </div>
    )

}

export default Signin