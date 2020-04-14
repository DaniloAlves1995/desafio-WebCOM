import React from "react";
import { Icon, Button } from "semantic-ui-react";
import { ListGroup, Container, Row, Col, Card } from 'react-bootstrap';

import "../../HomePage.css";

const UsersList = ({ users, toggleConnection, connectedTo, Nome, invite, showBoxVideo }) => {

  return (
    <Card border="dark" className={Nome} >
      <Card.Header className="text-white bg-dark">Usuários</Card.Header>
      <Card.Body style={{ padding: '0px' }}>
        {(users.length && (
          users.map(({ userName }) => (
            <ListGroup key={userName} >
              <ListGroup.Item>
                <Container>
                  <Row>
                    <Col>
                      <div>
                        <img width="50px" src="src/assets/user.png" style={{ float: "left" }} />
                        <h5 style={{ float: "left", padding: "10px" }}>{userName}</h5>
                      </div>
                    </Col>
                    <Col md="auto">
                      <Button primary
                        onClick={() => {
                          toggleConnection(userName);
                        }}
                        disabled={!!connectedTo && connectedTo !== userName}
                      >
                        <Icon.Group>
                          <Icon name='comment' />
                          {connectedTo === userName ? <Icon size='huge' corner color='red' name='dont' /> : <Icon size='huge' corner color='green' name='add' />}
                        </Icon.Group>
                        {connectedTo === userName ? " Desconectar" : " Conectar"}
                      </Button>
                      <Button icon color='green'
                        onClick={() => {
                          showBoxVideo();
                          invite(userName);
                        }}><Icon name='video' />
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </ListGroup.Item>
            </ListGroup>
          ))
        )) || " Sem usuários online."}
      </Card.Body>
    </Card>
  );
};

export default UsersList;
