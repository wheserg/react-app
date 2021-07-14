import React, {useState, useEffect, ReactFragment} from "react";
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faExchangeAlt,faMoneyBill,faAddressBook } from '@fortawesome/free-solid-svg-icons'
import {BrowserRouter as Router, Switch, Route, NavLink,useHistory, Redirect } from "react-router-dom"
import './login.css';
import { connect } from 'react-redux';
import {postLogin} from '../../actions/SessionsActions'
import Dashboard from '../dashboard'
import { useForm } from "react-hook-form";

function Login(props){
    const { register, handleSubmit, errors, setValue, formState } = useForm({ defaultValues : {email:'', password:''}});
    const { touched , dirty , dirtyFields , touchedField } = formState;
    const validateEmail = (email) => {

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    const patternEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    

    const [myState, setState] = useState({
        loading: false,
        email: '',
        password: '',
        redirect:null
  
    });
    const [email,setEmail] = useState(false)
    const [password,setPassword] = useState(false)

    const actualizaEstado = estado => {
        setState(Object.assign({}, myState, estado));
    };

    /**
     * @description maneja el login, haciendo la consulta con redux al api rest 
     * 
     */
    const handleLogin = async (data) => {
       
      if(data.email !== '' && data.password !== ''){
          const headers = {
              'app':'APP_BCK',
              'Accept':'application/json',
              'password':data.password,
              'Content-Type': 'application/json'
          }
          actualizaEstado({
            loading:true
            })
          await props.postLogin({email:data.email,headers}).then((res) => {
            actualizaEstado({
                redirect:'dashboard'
            })
          })
      }
    }
    const handleInputChange = (e) => {
        let target = e.target
        let name = target.name;
        let value = target.value;
        actualizaEstado({
            [name]:value
        })
    }
    useEffect(() => {
        let isMounted = true;
        console.log(touchedField)
        if (isMounted) {
            register(
                { name: "email"}, 
                { required: { value: true, message: 'Correo requerido'}, 
                pattern: { value: patternEmail, message: 'Correo inválido'} });
            register(
                { name: "password"}, 
                { required: { value: true, message: 'Password requerido'} });
        }
    
        return () => { isMounted = false };
      }, [register]);
    return(
        
        <React.Fragment>
            {myState.redirect ? 
            <Redirect to={`/${myState.redirect}`} />
            :null}
                   <Row className="h-100">
                       <Col className="mx-auto login-iniciar" xs={12} sm={12} md={11} lg={6} xl={5}>
                        <Card className="shadowCard" >
                                <Card.Title>
                                </Card.Title>
                                <Card.Body>
                                    <Row>
                                        <Col xs={12} className="p-md-5">
                                                <Row>
                                                    <Col className="text-center">
                                                            <span className="font-weight-bold h4 ">Bienvenido</span>
                                                        <span className="font-weight-bold h4 "></span>
                                                    </Col>
                                                </Row>
                                                <Form 
                                                    className="mt-5 px-5"
                                                    onSubmit={handleSubmit(handleLogin)}
                                                    
                                                    >
                                                    <Form.Group className={` validacionEmail`} >
                                                        <Form.Label>Correo Electronico</Form.Label>
                                                        <InputGroup className="mb-3">
                                                            <FormControl  
                                                            type="email"
                                                            onChange={(e) => {
                                                               setEmail(true)
                                                               setValue("email", e.target.value, true)}}
                                                            label="Email" 
                                                            name="email"
                                                            ref={register}
                                                            isValid={!errors.email && email }
                                                            isInvalid={errors.email   && email}
                                                            /> 
                                                        </InputGroup>
                                                      
                                                        <Form.Control.Feedback type="invalid">{errors.email ? errors.email.message : ""}</Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group className={` validacionPassword`}  >
                                                        <Form.Label>Contraseña</Form.Label>
                                                        <InputGroup className="mb-3">
                                                            <FormControl  
                                                            type="password"
                                                            onChange={(e) => {
                                                                setValue("password", e.target.value, true)
                                                                setPassword(true)
                                                            }
                                                            }
                                                            label="Password" 
                                                            name="password"
                                                            ref={register}
                                                            isValid={!errors.password  && password}
                                                            isInvalid={errors.password  && password}
                                                            /> 
                                                        </InputGroup>
                                                        <Form.Control.Feedback >{!errors.password ? "test" :errors.password.message }</Form.Control.Feedback>

                                                        <Form.Control.Feedback type="invalid">{errors.password ? errors.password.message : ""}</Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Row xs={12}>
                                                        <Col xs={12} md={12} className="">
                                                            <div className="text-center text-info mt-5">
                                                                {myState.loading ?
                                                                <Button type="submit" disabled className="text-uppercase" variant="link" href={void(0)} >
                                                                Cargando.. 
                                                                <Spinner animation="border" role="status" style={{width:'1.2rem',height:'1.2rem'}}>
                                                                    <span className="sr-only">Loading...</span>
                                                                </Spinner>
                                                                </Button>
                                                                :
                                                                <Button type="submit" className="text-uppercase" variant="link" href={void(0)} >
                                                                Iniciar Sesion<FontAwesomeIcon className="ml-2" icon={faArrowRight} />
                                                                </Button>
                                                                }
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                       </Col>
                   </Row>
               
                  

                   
                
            </React.Fragment>

    )
}

const mapStateToProps = (state) => {
    return { 
        data: state.login,

    };
}

export default connect(mapStateToProps, {postLogin})(Login);
