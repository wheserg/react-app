
import Navbar from 'react-bootstrap/Navbar';
import React, {useState, useEffect, ReactFragment} from "react";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';
import {signOut} from '../../actions/SessionsActions'
/**Falta agregar el cerrar sesion redux */
function NavBar(props){
    const [myState, setState] = useState({
        loading: false,
        redirect: null
  
    });
    const actualizaEstado = estado => {
        setState(Object.assign({}, myState, estado));
    };
    const  handleSignOut = async () => {
        
         props.signOut({})
    }
    

 return (
     
   <Navbar bg="light">
        <Container>
        <Navbar.Brand href="#home">Tuten</Navbar.Brand>
        <Navbar.Toggle />
        
        <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
            <Button variant="light"
            onClick={((event) => {
           
                handleSignOut()
              
            })}
            >Cerrar sesion</Button>
            </Navbar.Text>
        </Navbar.Collapse>
        </Container>
  </Navbar>
 )
}
const mapStateToProps = (state) => {
    return { 
        sessionTokenBck: state.login
    };
}
export default connect(mapStateToProps, {signOut})(NavBar);
