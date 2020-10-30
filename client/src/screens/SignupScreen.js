import * as React from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {Form, Button, Row, Col, Container, Image} from 'react-bootstrap'
import Hero from '../assets/hero.jpg'
import FormContainer from "../components/FormContainer";
import {signupUser} from'../store/actions/authActions'
import {useEffect, useState} from "react";


const SignupScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setpasswordConfirm] = useState('')
    const [message, setMessage] = useState(null)

const dispatch = useDispatch()

    const userSignup = useSelector((state) => state.userSignup)
    const {loading, error, userInfo} = userSignup

    const redirect = location.search ? location.search.split('=')[1] : '/'


    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== passwordConfirm ) {
            setMessage('Password does not match')
        } else{
            dispatch(signupUser(name, email, username, password, passwordConfirm))
        }
    }



    return (
        <Container>
            <Row className='d-flex align-items-center'>
                <Col className='py-3'>
                    <FormContainer>

                        <h1>Signup</h1>
                        {message && <Message variant='danger'>{message}</Message>}
                        {error && <Message variant='danger'>{error}</Message>}
                        {loading && <Loader />}

                        <Form onSubmit={submitHandler} className='m-6'>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter Username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Enter Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Confirm Password'
                                    value={passwordConfirm}
                                    onChange={(e) => setpasswordConfirm(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                Register
                            </Button>
                        </Form>
                    </FormContainer>

                </Col>
                <Col md={6}>
                    <Image src={Hero} fluid/>


                </Col>



            </Row>
        </Container>
);
};

export default SignupScreen;

