import * as React from 'react';
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col, Container, Image} from 'react-bootstrap'
import Hero from '../assets/hero.jpg'
import FormContainer from "../components/FormContainer";

const LoginScreen = (props) => {
    return (
        <Container>
            <Row className='d-flex align-items-center'>
                <Col className='py-3'>
                    <FormContainer>

                        <h1>Register</h1>

                        <Form className='m-6'>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter Username'
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Enter Password'
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
                    <Image src={Hero} />


                </Col>



            </Row>
        </Container>
    );
};

export default LoginScreen;

