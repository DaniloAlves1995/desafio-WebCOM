import React from "react";
import { Header, Icon, Input, Segment, Button, Comment } from "semantic-ui-react";
import { Card } from 'react-bootstrap';
import { formatRelative } from "date-fns";

import "../../../assets/user.png";
import "../../HomePage.css";

const MessageBox = ({ messages, connectedTo, message, setMessage, sendMsg, name, className }) => {
  return (
    <Card className={className + ' text-white bg-dark'} >
      <Card.Header>{!!connectedTo ?
        <div className="d-flex align-items-center">
          <img src="src/assets/user.png" className="avatar" />
          <div className="mx-3">
            <label className="text-sm">{connectedTo}</label>
            <small className="text-muted">Conectado agora</small>
          </div>
        </div>
        : "O chat não está conectado ainda"}
      </Card.Header>
      {!!connectedTo && messages[connectedTo] ? (
        <Segment>
          <Comment.Group>
            {messages[connectedTo].map(({ name: sender, message: text, time }) => (
              <Comment key={`msg-${name}-${time}`}>
                <Comment.Avatar src="src/assets/user.png" />
                <Comment.Content>
                  <Comment.Author>{sender === name ? 'You' : sender}</Comment.Author>
                  <Comment.Metadata>
                    <span>
                      {formatRelative(new Date(time), new Date())}
                    </span>
                  </Comment.Metadata>
                  <Comment.Text>{text}</Comment.Text>
                </Comment.Content>
              </Comment>
            ))}
          </Comment.Group>
        </Segment>
      ) : (
          <Segment placeholder>
            <Header icon>
              <Icon name="discussions" />
                  Sem menssagens ainda.
                </Header>
          </Segment>
        )}
      <Input
        type="text"
        value={message}
        size="large"
        onChange={e => setMessage(e.target.value)}
        placeholder="Digite sua menssagem..."
        action
      >
        <input />
        <Button color="teal" disabled={!message} onClick={sendMsg}>
          <Icon name="send" />
            Enviar Menssagem
        </Button>
      </Input>
    </Card>
  );
};

export default MessageBox;
