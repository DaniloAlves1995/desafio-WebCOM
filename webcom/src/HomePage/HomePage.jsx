import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import Principal from './Components/General/Principal';
import { userActions } from '../_actions';
import Aux from '../hoc/Aux';
import "./HomePage.css";



class HomePage extends React.Component {

    componentDidMount() {
        this.props.getUsers();
        localStorage.removeItem('user');
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        if (document.getElementById("0")) {
            document.getElementById("0").outerHTML = "";
        }
        if (document.getElementById("1")) {
            document.getElementById("1").outerHTML = "";
        }
        return (
            <Aux>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">
                        <div style={{ display: "flex", margin: "auto" }}>
                            <i className="material-icons md-36" style={{ fontSize: "36px", marginLeft: "auto" }}>camera_alt</i>
                            <h4 className="card-title" style={{ margin: "auto" }}>WebCOM</h4>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <NavDropdown title="Opções" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/login">Sair</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="Conteiner">
                    <Principal
                        user={user}
                        users={users}
                    />
                </div>
            </Aux>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;

    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };