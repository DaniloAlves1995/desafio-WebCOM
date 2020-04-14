import React from 'react';
import { Loader, Icon } from "semantic-ui-react";
import './ReceiveCallBox.css';

import Aux from '../../../hoc/Aux';

//type: 0 - Aguardando resposta, 1 - Recebendo chamada, 2 - Vídeo estabelecido

const orderSummary = (props) => {
    let container;

    if (props.type == 0) {
        container = <Loader size="massive" active inline="centered"> Conectando... </Loader>
    }
    if (props.type == 1) {
        container = <div className="RecevendCallBox">
            <img width="70px" src="src/assets/user.png" className="image" />
            <h3 style={{ marginRight: '20px', marginTop: 'auto', marginBottom: 'auto' }}> Chamada de {props.nameCall} </h3>
            <button onClick={props.purchaseContinued} className="buttonBox" style={{ backgroundColor: 'green' }}><Icon name='call' /></button>
            <button onClick={props.purchaseCancelled} className="buttonBox" style={{ backgroundColor: 'red' }}><Icon name='ban' size='large' /></button>
        </div>
    }
    if (props.type == 2) {
        container = <div>
            <div className="camerabox">
                <video id="received_video" autoPlay></video>
                <video id="local_video" autoPlay muted></video>
            </div>
            <button onClick={props.cancel} className="buttonBox" style={{ backgroundColor: 'red', marginLeft: '315px' }}><Icon name='ban' size='large' /></button>
        </div>
    }
    return (
        <Aux>
            {container}
        </Aux>
    );
}

export default orderSummary;