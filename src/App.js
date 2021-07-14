import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';
import Login from './components/login'
import Dashboard from './components/dashboard';
import './App.css'

function App(props) {

  return (

      <BrowserRouter>
        <Switch>
          
            {typeof props.data.token == 'string'  ?
            <React.Fragment>
              <Route path="/dashboard" exact>
                <div  className="contenedorApp">
                  <Dashboard />
                </div>
              </Route>
              <Redirect to="/dashboard" />

            </React.Fragment>

            :
            <React.Fragment>
            <Route path="/" exact>
              <Container fluid className="contenedorApp">
                <Login />
              </Container>
            </Route>
            <Route path="/login" exact>
              <Container fluid className="contenedorApp">
                <Login />
              </Container>
            </Route>
            <Redirect to="/" />

            </React.Fragment>
            }
            
            
            
        </Switch>
      </BrowserRouter>


  );
}
const mapStateToProps = (state) => {
  return { 
      data: state.login,
  };
}


export default  connect(mapStateToProps)(App);
