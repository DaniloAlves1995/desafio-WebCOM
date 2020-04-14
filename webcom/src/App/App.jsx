import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SweetAlert from "react-bootstrap-sweetalert";
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import Aux from '../hoc/Auxiliar';
import AlertBox from './alertBox';

class App extends React.Component {
    constructor(props) {
        super(props);


        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
        
        
    }


    render() {
        const { alert } = this.props;
        console.log("type="+alert.type+" m="+alert.menssage);
        
        return (
            <Aux>
                        {alert.message &&
                            <AlertBox type={alert.type} menssage={alert.menssage} />
                        }
                        <Router history={history}>
                            <Switch>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/home" component={HomePage} />
                                <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
            </Aux>
                    
        );
    }
    
}


function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };