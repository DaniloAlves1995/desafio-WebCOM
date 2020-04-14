import React, { useState, useEffect, useRef } from "react";
import { Loader } from "semantic-ui-react";
import SweetAlert from "react-bootstrap-sweetalert";
import { format } from "date-fns";

import UsersList from "./UsersList";
import MessageBox from "./MessageBox";
import Aux from '../../../hoc/Aux';
import "../../HomePage.css";
import Modal from '../Modal/Modal';
import WindowVideo from './WindowVideo';

// Use for remote connections
const configuration = {
  iceServers: [{ url: "stun:stun.1.google.com:19302" }]
};

// Use for local connections
// const configuration = null;

const Chat = ({ usuario, connection, updateConnection, channel, updateChannel }) => {
  const [socketOpen, setSocketOpen] = useState(false);
  const [socketMessages, setSocketMessages] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  const [users, setUsers] = useState([]);
  const [connectedTo, setConnectedTo] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [alert, setAlert] = useState(null);
  const connectedRef = useRef();
  const webSocket = useRef(null);
  const [message, setMessage] = useState("");
  const messagesRef = useRef({});
  const [messages, setMessages] = useState({});
  const [chamandoMenssage, setChamandoMenssage] = useState(0);
  const [nameCall, setNameCall] = useState("");
  const [chatWasCancel, setchatWasCancel] = useState(false);
  let [name, setName] = useState("");

  useEffect(() => {
    webSocket.current = new WebSocket("ws://localhost:9000");
    webSocket.current.onmessage = message => {
      const data = JSON.parse(message.data);
      setSocketMessages(prev => [...prev, data]);
    };

    webSocket.current.onopen = function (response) {
      handleLogin();
      connect(name);
      setFuncao(showBoxVideo);
      setChamandoMenssageF(setChamandoMenssageHandler);
      setConnectionCanceled(ConnectionNagative);
      setNameCallF(setNameCallBox);
      setCancelChat(ChatCancel);
    };

    webSocket.current.onclose = () => {
      webSocket.current.close();
    };

    return () => webSocket.current.close();
  }, []);

  useEffect(() => {
    let data = socketMessages.pop();
    if (data) {
      switch (data.type) {
        case "connect":
          setSocketOpen(true);
          break;
        case "login":
          onLogin(data);
          break;
        case "updateUsers":
          updateUsersList(data);
          break;
        case "removeUser":
          removeUser(data);
          break;
        case "offer":
          onOffer(data);
          break;
        case "answer":
          onAnswer(data);
          break;
        case "candidate":
          onCandidate(data);
          break;
        default:
          break;
      }
    }
  }, [socketMessages]);

  const closeAlert = () => {
    setAlert(null);
  };

  const send = data => {
    webSocket.current.send(JSON.stringify(data));
  };

  const handleLogin = () => {
    setName(usuario.firstName + ' ' + usuario.lastName);
    name = usuario.firstName + ' ' + usuario.lastName;

    send({
      type: "login",
      name
    });
  };

  const onLogin = ({ success, message, users: loggedIn }) => {
    if (success) {
      setAlert(
        <SweetAlert
          success
          title="Successo!"
          onConfirm={closeAlert}
          onCancel={closeAlert}
        >
          Logado com sucesso!
        </SweetAlert>
      );

      setUsers(loggedIn);
      let localConnection = new RTCPeerConnection(configuration);

      //when the browser finds an ice candidate we send it to another peer
      localConnection.onicecandidate = ({ candidate }) => {
        let connectedTo = connectedRef.current;

        if (candidate && !!connectedTo) {
          send({
            name: connectedTo,
            type: "candidate",
            candidate
          });
        }
      };

      localConnection.ondatachannel = event => {
        console.log("Data channel is created!");
        let receiveChannel = event.channel;
        receiveChannel.onopen = () => {
          console.log("Data channel is open and ready to be used.");
        };
        receiveChannel.onmessage = handleDataChannelMessageReceived;
        updateChannel(receiveChannel);
      };
      updateConnection(localConnection);
    } else {
      setAlert(
        <SweetAlert
          warning
          confirmBtnBsStyle="danger"
          title="Falha"
          onConfirm={closeAlert}
          onCancel={closeAlert}
        >
          {message}
        </SweetAlert>
      );
    }
  };

  const updateUsersList = ({ user }) => {
    setUsers(prev => [...prev, user]);
  };

  const removeUser = ({ user }) => {
    setUsers(prev => prev.filter(u => u.userName !== user.userName));
  }

  const handleDataChannelMessageReceived = ({ data }) => {
    const message = JSON.parse(data);
    const { name: user } = message;
    let messages = messagesRef.current;
    let userMessages = messages[user];

    if (userMessages) {
      userMessages = [...userMessages, message];
      let newMessages = Object.assign({}, messages, { [user]: userMessages });
      messagesRef.current = newMessages;
      setMessages(newMessages);
    } else {
      let newMessages = Object.assign({}, messages, { [user]: [message] });
      messagesRef.current = newMessages;
      setMessages(newMessages);
    }
  };

  //when somebody wants to message us
  const onOffer = ({ offer, name }) => {
    setConnectedTo(name);
    connectedRef.current = name;

    connection
      .setRemoteDescription(new RTCSessionDescription(offer))
      .then(() => connection.createAnswer())
      .then(answer => connection.setLocalDescription(answer))
      .then(() =>
        send({ type: "answer", answer: connection.localDescription, name })
      )
      .catch(e => {
        console.log({ e });
        setAlert(
          <SweetAlert
            warning
            confirmBtnBsStyle="danger"
            title="Falha"
            onConfirm={closeAlert}
            onCancel={closeAlert}
          >
            Um erro ocorreu.
          </SweetAlert>
        );
      });
  };

  //conexão negada
  const ConnectionNagative = () => {
    setShowVideo(false);
    setAlert(
      <SweetAlert
        warning
        confirmBtnBsStyle="danger"
        title="Chamada cancelada"
        onConfirm={closeAlert}
        onCancel={closeAlert}
      >
        Sua chamada foi cancelada!
      </SweetAlert>
    );
    setChamandoMenssage(0);
  }

  //chat cancelado
  const ChatCancel = () => {
    setAlert(
      <SweetAlert
        warning
        confirmBtnBsStyle="danger"
        title="Chat cancelado"
        onConfirm={closeAlert}
        onCancel={closeAlert}
      >
        Sua coversa foi cancelada!
      </SweetAlert>
    );
    setConnecting(true);
    setConnectedTo("");
    connectedRef.current = "";
    setConnecting(false);
    setchatWasCancel(false);
  }

  //when another user answers to our offer
  const onAnswer = ({ answer }) => {
    connection.setRemoteDescription(new RTCSessionDescription(answer));
  };

  //when we got ice candidate from another user
  const onCandidate = ({ candidate }) => {
    connection.addIceCandidate(new RTCIceCandidate(candidate));
  };

  const setNameCallBox = (valor) => {
    setNameCall(valor);
    console.log("chamada de " + valor);
  }

  const showBoxVideo = () => {
    setShowVideo(true);
  }

  const setChamandoMenssageHandler = (valor) => {
    setChamandoMenssage(valor);
  }

  const showVideoCancelHandler = () => {
    setShowVideo(false);
    handleSendConexao("negou");
    setChamandoMenssage(0);
  }

  const showVideoContinueHandler = () => {
    setChamandoMenssageHandler(2);
    handleSendConexao("aceitou");
  }

  //when a user clicks the send message button
  const sendMsg = () => {
    const time = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    let text = { time, message, name };
    let messages = messagesRef.current;
    let connectedTo = connectedRef.current;
    let userMessages = messages[connectedTo];
    if (messages[connectedTo]) {
      userMessages = [...userMessages, text];
      let newMessages = Object.assign({}, messages, {
        [connectedTo]: userMessages
      });
      messagesRef.current = newMessages;
      setMessages(newMessages);
    } else {
      userMessages = Object.assign({}, messages, { [connectedTo]: [text] });
      messagesRef.current = userMessages;
      setMessages(userMessages);
    }
    console.log(channel);
    channel.send(JSON.stringify(text));
    setMessage("");
  };

  const handleConnection = name => {
    var dataChannelOptions = {
      reliable: true
    };

    let dataChannel = connection.createDataChannel("messenger");

    dataChannel.onerror = error => {
      setAlert(
        <SweetAlert
          warning
          confirmBtnBsStyle="danger"
          title="Falha"
          onConfirm={closeAlert}
          onCancel={closeAlert}
        >
          Um erro ocorreu.
        </SweetAlert>
      );
    };

    dataChannel.onmessage = handleDataChannelMessageReceived;
    updateChannel(dataChannel);

    connection
      .createOffer()
      .then(offer => connection.setLocalDescription(offer))
      .then(() =>
        send({ type: "offer", offer: connection.localDescription, name })
      )
      .catch(e =>
        setAlert(
          <SweetAlert
            warning
            confirmBtnBsStyle="danger"
            title="Falha"
            onConfirm={closeAlert}
            onCancel={closeAlert}
          >
            Um erro ocorreu.
          </SweetAlert>
        )
      );
  };

  const toggleConnection = userName => {
    if (connectedRef.current === userName) {
      setConnecting(true);
      setConnectedTo("");
      connectedRef.current = "";
      setConnecting(false);
      setchatWasCancel(false);
      console.log("Desconectado do chat");
      handleSendCancelChat();
    } else {
      console.log("passoi");
      setConnecting(true);
      setConnectedTo(userName);
      connectedRef.current = userName;
      handleConnection(userName);
      setConnecting(false);
      setchatWasCancel(false)
    }
  };

  const cancelHandler = () => {
    hangUpCall();
  }

  return (
    <Aux>
      <Modal type={chamandoMenssage} show={showVideo} modalClosed={showVideoCancelHandler}>
        <WindowVideo
          price={3}
          purchaseCancelled={showVideoCancelHandler}
          purchaseContinued={showVideoContinueHandler}
          type={chamandoMenssage}
          nameCall={nameCall}
          cancel={cancelHandler}
        />
      </Modal>
      {alert}

      {(socketOpen &&
        (
          <Aux>

            <UsersList
              users={users}
              toggleConnection={toggleConnection}
              connectedTo={connectedTo}
              connection={connecting}
              invite={invite}
              showBoxVideo={showBoxVideo}
              Nome="ListaUsers"
              chatWasCancel={chatWasCancel}
            />
            <MessageBox
              messages={messages}
              connectedTo={connectedTo}
              message={message}
              setMessage={setMessage}
              sendMsg={sendMsg}
              name={name}
              className="BoxMenssage"
              chatWasCancel={chatWasCancel}
            />

          </Aux>
        )) || (
          <div style={{ marginTop: '200px', marginLeft: '700px' }}>
            <Loader size="massive" active inline="centered">
              Carregando...
          </Loader>
          </div>
        )}

    </Aux>
  );
}

export default Chat;
