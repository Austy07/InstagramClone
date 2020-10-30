import React from 'react';
import {Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import Hero from "../assets/hero.jpg";


const Post = (props) => {
    return (
        <div>

            <Container>
                <Row>
                    <Col md={7} >
                        <ListGroup  style={{ padding: '3px',margin: '50px' }}>
                            <Card >
                                <ListGroup.Item>
                                    <Card.Header>Featured</Card.Header>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Card.Img variant="top" src={Hero} fluid/>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Card.Body>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk
                                            of the card's content.
                                        </Card.Text>
                                    </Card.Body>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
                                </ListGroup.Item>
                            </Card>
                        </ListGroup>




                        <ListGroup  style={{ padding: '3px',margin: '50px' }}>
                            <Card >
                                <ListGroup.Item>
                                    <Card.Header>Featured</Card.Header>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Card.Img variant="top" src={Hero} fluid/>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Card.Body>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk
                                            of the card's content.
                                        </Card.Text>
                                    </Card.Body>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
                                </ListGroup.Item>
                            </Card>
                        </ListGroup>


                        <ListGroup  style={{ padding: '3px',margin: '50px' }}>
                            <Card >
                                <ListGroup.Item>
                                    <Card.Header>Featured</Card.Header>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Card.Img variant="top" src={Hero} fluid/>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Card.Body>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk
                                            of the card's content.
                                        </Card.Text>
                                    </Card.Body>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
                                </ListGroup.Item>
                            </Card>
                        </ListGroup>



                        <ListGroup  style={{ padding: '3px',margin: '20px' }}>
                            <Card >
                                <ListGroup.Item>
                                    <Card.Header>Featured</Card.Header>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Card.Img variant="top" src={Hero} fluid/>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Card.Body>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk
                                            of the card's content.
                                        </Card.Text>
                                    </Card.Body>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
                                </ListGroup.Item>
                            </Card>
                        </ListGroup>
                    </Col>

                </Row>

            </Container>

        </div>
    );
};

export default Post;

