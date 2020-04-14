import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstName && user.lastName && user.username && user.password) {
            this.props.register(user);
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="wrapper wrapper-full-page">
                <div className="page-header login-page header-filter" filter-color="black" style={{backgroundImage: "url('../src/assets/fundo.png')", backgroundSize: "cover", backgroundPosition: "top center"}} >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 ml-auto mr-auto">
                                <div className="card card-signup">
                                    <a className="btn btn-just-icon btn-round" style={{marginTop: "10px", marginLeft: "10px"}} href="/login">
                                        <span className="material-icons" style={{fontSize: "30px"}}>
                                            arrow_back
                                        </span>
                                    </a>
                                    <h2 className="card-title text-center">Criar conta</h2>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-5 ml-auto">
                                                <div className="info info-horizontal">
                                                <div className="icon icon-rose">
                                                    <i className="material-icons">videocam</i>
                                                </div>
                                                <div className="description">
                                                    <h4 className="info-title">Vídeo Conferência</h4>
                                                    <p className="description">
                                                    Nós oferecemos serviço de vídeo conferência para você conversar em tempo real.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="info info-horizontal">
                                                <div className="icon icon-primary">
                                                    <i className="material-icons">forum</i>
                                                </div>
                                                <div className="description">
                                                    <h4 className="info-title">Chat</h4>
                                                    <p className="description">
                                                    Nós oferecemos serviço de chat para você conversar por mensagens.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="info info-horizontal">
                                                <div className="icon icon-info">
                                                    <i className="material-icons">group</i>
                                                </div>
                                                <div className="description">
                                                    <h4 className="info-title">Converse com seus amigos</h4>
                                                    <p className="description">
                                                    No WebCOM você pode está sempre conectado com as pessoas. Conexão é nossa prioridade!
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-5 mr-auto">
                                            <div className="social text-center">
                                                <h4 className="mt-3"> Seus dados </h4>
                                            </div>
                                            <form className="form" onSubmit={this.handleSubmit}>
                                                <div className="form-group has-default">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                            <i className="material-icons">face</i>
                                                            </span>
                                                        </div>
                                                        <input type="text" name="firstName" value={user.firstName} onChange={this.handleChange} required={true} className="form-control" placeholder="Primeiro Nome..."/>
                                                    </div>
                                                </div>
                                                <div className="form-group has-default">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                            <i className="material-icons">face</i>
                                                            </span>
                                                        </div>
                                                        <input type="text" className="form-control" placeholder="Segundo Nome..." name="lastName" required={true} value={user.lastName} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group has-default">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                            <i className="material-icons">account_circle</i>
                                                            </span>
                                                        </div>
                                                        <input type="text" className="form-control" placeholder="Usuário..." name="username" required={true} value={user.username} onChange={this.handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="form-group has-default">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                            <i className="material-icons">lock_outline</i>
                                                            </span>
                                                        </div>
                                                        <input type="password" placeholder="Senha..." className="form-control" name="password" required={true} value={user.password} onChange={this.handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input className="form-check-input" type="checkbox" value="" required={true} />
                                                        <span className="form-check-sign">
                                                            <span className="check"></span>
                                                        </span>
                                                        Eu aceito com os 
                                                        <a href="#something"> termos e condições</a>.
                                                    </label>
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit" className="btn btn-primary btn-round mt-4">COMEÇAR AGORA</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };