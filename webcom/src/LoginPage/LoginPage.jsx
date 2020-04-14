import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import './Login2.css';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;

        return (
            <div className="wrapper wrapper-full-page">
                <div className="page-header login-page header-filter" filter-color="black" style={{ backgroundImage: "url('../src/assets/fundo.png')", backgroundSize: "cover", backgroundPosition: "top center" }} >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-8 ml-auto mr-auto">
                                <form className="form" onSubmit={this.handleSubmit}>
                                    <div className="card card-login card-hidden">
                                        <div className="card-header card-header-info text-center">
                                            <span className="bmd-form-group">
                                                <div style={{ display: "flex", margin: "auto" }}>
                                                    <i className="material-icons md-36" style={{ fontSize: "36px", marginLeft: "auto" }}>camera_alt</i>
                                                    <h4 className="card-title" style={{ marginRight: "auto" }}>WebCOM</h4>
                                                </div>
                                            </span>
                                            <h4 className="card-title">Login</h4>
                                        </div>
                                        <div className="card-body ">
                                            <p className="card-description text-center">Entre e seja bem vindo ;-)</p>
                                            <span className="bmd-form-group">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="material-icons">account_circle</i>
                                                        </span>
                                                    </div>
                                                    <input className="form-control" name="username" placeholder="Usuário..."
                                                        required={true} aria-required={true} value={username} onChange={this.handleChange} />
                                                </div>
                                            </span>
                                            <span className="bmd-form-group">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="material-icons">lock_outline</i>
                                                        </span>
                                                    </div>
                                                    <input type="password" name="password" className="form-control"
                                                        placeholder="Senha..." required={true} aria-required={true} 
                                                        value={password} onChange={this.handleChange} />
                                                </div>
                                            </span>
                                        </div>
                                        <div className="card-footer justify-content-center">
                                            <button className="btn btn-info btn-link btn-lg" type="submit">ENTRAR</button>
                                            <Link to="/register" className="btn btn-primary btn-link btn-round btn-lg">CADASTRAR</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <footer className="footer">
                        <div className="container">
                            <nav className="float-left">
                                <ul>
                                    <li>
                                        <a href="https://www.linkedin.com/in/danilo-alves-92128699/">
                                            DANILO ALVES
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://embrapii.org.br/">
                                            EMBRAPII
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                            <div className="copyright float-right">
                                &copy;
                                Desenvolvido por <a href="https://www.linkedin.com/in/danilo-alves-92128699/">
                                Danilo Alves
                                </a> como desafio proposto pela <a href="https://embrapii.org.br/" target="_blank">Embrapii</a>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };