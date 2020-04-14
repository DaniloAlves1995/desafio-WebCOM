import React from 'react';
import './Modal.css';
import Aux from '../../../hoc/Auxiliar';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    

    <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div className="Modal"
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0',
                top: props.type==2 ? '70px' : '240px',
                left: props.type==0 ? 'calc(50% - 100px)' : props.type==2 ? 'calc(50% - 350px)' : 'calc(50% - 230px)'
            }}>
            {props.children}
        </div>
    </Aux>
);

export default modal;
