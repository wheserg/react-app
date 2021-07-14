import React, {useState, useEffect, ReactFragment} from "react";
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import moment from 'moment'
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';

import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faExchangeAlt,faMoneyBill,faAddressBook } from '@fortawesome/free-solid-svg-icons'
import {BrowserRouter as Router, Switch, Route, NavLink,useHistory, Redirect } from "react-router-dom"
import { connect } from 'react-redux';
import {fetchData} from '../../actions/SessionsActions'
import NavBar from "../Estructura/NavBar";
import { useDispatch, useSelector } from 'react-redux';

function Dashboard(props){
    const [campo,setCampo] = useState('')
    const [campoBusqueda,setCampoBusqueda] = useState('')

    const [filtro,setFiltro] = useState('')
    const [filtroBusqueda,setFiltroBusqueda] = useState('')

    const [busqueda,setBusqueda] = useState('')

    const [myState, setState] = useState({
        loading: false,
        error: false,
        listaDatos: [],
        listaDatosAuxiliar: [],
        redirect: null,
        filtroControl: {
            campoSeleccionado:false,
            filtroSeleccionado:false,
            busquedaLlenada:false,
            Filtrado:false
        },
        filtros: [  campo =>'',
                    filtro =>'',
                    busqueda =>'',]

    });
    const actualizaEstado = estado => {
        setState(Object.assign({}, myState, estado));
    };

    const resetFilter = (fase) => {
        // eslint-disable-next-line default-case
        switch(fase) {
            case '1':
                setCampo('')
                setCampoBusqueda('')
                setBusqueda('')
                setFiltro('')
                setFiltroBusqueda('')
                actualizaEstado({
            
                    filtroControl: {
                        campoSeleccionado:false,
                        filtroSeleccionado:false,
                        busquedaLlenada:false,
                        Filtrado:false
                    },
                })
              break;
            case '2':
                setBusqueda('')
                setFiltro('')
                setFiltroBusqueda('')
                actualizaEstado({
                    filtroControl: {
                        campoSeleccionado:true,
                        filtroSeleccionado:false,
                        busquedaLlenada:false,
                        Filtrado:false
                    },
                })
              break;
            case 'clear':
                setCampo('')
                setCampoBusqueda('')
                setBusqueda('')
                setFiltro('')
                setFiltroBusqueda('')
                actualizaEstado({
                    listaDatosAuxiliar:myState.listaDatos,
                    campo:'',
                    filtro:'',
                    campoBusqueda:'',
                    filtroBusqueda:'',
                    busqueda:'',
                    filtroControl: {
                        campoSeleccionado:false,
                        filtroSeleccionado:false,
                        busquedaLlenada:false,
                        Filtrado:false
                    },
                })
            break;
              
          }

    }
   
    const handleBusqueda = () => {
        let newListaDatos = []
        actualizaEstado({
            listaDatosAuxiliar:myState.listaDatos,
        
        })
        if(filtroBusqueda != '1'){// no es un LIKE%
            //es menor igual o mayor igual
           
            if(filtroBusqueda == '2'){ //mayor o igual
                
                myState.listaDatos.map((value,index) => {
                    if(campo == 'BookingPrice'){
                        if(parseInt(busqueda) <= parseInt(value.bookingPrice)){
                            newListaDatos.push(value);
                        }
                    }else if(campo == 'BookingId'){
                        if(parseInt(busqueda) <= parseInt(value.bookingId)){
                            newListaDatos.push(value);
                        }
                    }

                
                })
                actualizaEstado({
                    listaDatosAuxiliar:newListaDatos,
                
                })
            }else if(filtroBusqueda == '3'){ //menor o igual
                myState.listaDatos.map((value,index) => {
                    if(campo == 'BookingPrice'){
                        if(parseInt(busqueda) >= parseInt(value.bookingPrice)){
                            newListaDatos.push(value);
                        }
                    }else if(campo == 'BookingId'){
                        if(parseInt(busqueda) >= parseInt(value.bookingId)){
                            newListaDatos.push(value);
                        }
                    }
                   
                })
                actualizaEstado({
                    listaDatosAuxiliar:newListaDatos,
                
                })
            }
        }else{ // es un like

            myState.listaDatos.map((value,index) => {
                if(campo == 'BookingPrice'){
                    if(parseInt(busqueda) == parseInt(value.bookingPrice)){
                        newListaDatos.push(value);
                    }
                }else if(campo == 'Bookingid'){
  
                    if(parseInt(busqueda) == parseInt(value.bookingId)){
                        newListaDatos.push(value);
                    }
                }
               
            })
      
        
            actualizaEstado({
                listaDatosAuxiliar:newListaDatos,
            
            })
           
        }
    }

    const fetchBookingData = async () => {
        const headers = {
            'adminemail':props.data.email,
            'app':'APP_BCK',
            'token':props.data.token,
            'Accept': 'application/json',

        }
        await props.fetchData({email:'contacto@tuten.cl',current:'true',headers}).then((res) => {
  
           
        }).catch((res) => {
            
            actualizaEstado({
                loading:false,
                error:true
            })
        })
    }
    useEffect(() => {
        fetchBookingData()
    },[])

    useEffect(() => {
        actualizaEstado({
            loading:false,
            listaDatos:props.userData,
            listaDatosAuxiliar:props.userData
        })
    },[props.userData])

    const handleFiltro = (fase,value,valueBusqueda) => {
        if(fase === '1'){
            if(campo !== ''){
                resetFilter(fase)

            }
            setCampo(value)
            setCampoBusqueda(valueBusqueda)
            setBusqueda('')
            
            actualizaEstado({
                filtroControl : {
                    campoSeleccionado:true,
                    filtroSeleccionado:false,
                    busquedaLlenada:false,
                    Filtrado:false
                }
            })
        }else if(fase === '2'){
            
            if(myState.filtro !== ''){
                resetFilter(fase)

            }
            setFiltro(value)
            setFiltroBusqueda(valueBusqueda)
            setBusqueda('')
            actualizaEstado({
                filtroControl :{
                    campoSeleccionado:true,
                    filtroSeleccionado:true,
                    busquedaLlenada:false,
                    Filtrado:false
                }
            })
        }else if(fase === '3'){
        
            if (!Number(value.target.value)) {
                return;
            }
         
            if(value.target.value !== ''){
                setBusqueda(value.target.value)
                actualizaEstado({
                    filtroControl :{
                        campoSeleccionado:true,
                        filtroSeleccionado:true,
                        busquedaLlenada:true,
                        Filtrado:false
                    }
                })   
            }else{
                setBusqueda(value.target.value)
                actualizaEstado({
                    filtroControl :{
                        campoSeleccionado:true,
                        filtroSeleccionado:true,
                        busquedaLlenada:false,
                        Filtrado:false
                    }
                })   
            }
       
        }
    }

    const signOutParent = () => {
        actualizaEstado({
            redirect:''
        })
    }
    
    return(
        <React.Fragment>
            {myState.redirect ? 
            <Redirect to={`/${myState.redirect}`} />
            :null}
                    <NavBar signOutTrigger={signOutParent}  />
                    <Container fluid >
                    <Row className="h-100">
                       
                       <Col className="mx-auto login-iniciar" xs={12} >
                        <Row className="pb-2">
                                <Col xs={12} className="pb-3 pb-sm-0" sm={4} md={3} lg={3} xl={3}>
                                    <Dropdown >
                                        <Dropdown.Toggle variant="primary"  style={{width:'100%'}} id="campoFiltrar">
                                            {campo === '' ?<span> Seleccionar Campo</span> : campo}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu >
                                            <Dropdown.Item onSelect={(event) => {handleFiltro('1','Bookingid',1)}} name="bookingid">Bookingid</Dropdown.Item>
                                            <Dropdown.Item onSelect={(event) => {handleFiltro('1','BookingPrice',2)}}  name="bookingprice">BookingPrice</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                                <Col  className="pb-3 pb-sm-0 " xs={12}  sm={4} md={3} lg={2} xl={2}>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="primary" style={{width:'100%'}} id={'filtroControl'} disabled={myState.filtroControl.campoSeleccionado === false ? true:false} name="filtroAplicar">
                                        {filtro === '' ?<span> Seleccionar Filtro</span> : filtro}
 
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onSelect={(event) => {handleFiltro('2','Igual',1)}}>Igual</Dropdown.Item>
                                            <Dropdown.Item onSelect={(event) => {handleFiltro('2','Mayor o igual',2)}}>Mayor o igual </Dropdown.Item>
                                            <Dropdown.Item onSelect={(event) => {handleFiltro('2','Menor o igual',3)}} >Menor o igual </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                                <Col xs={6}  sm={4} md={3} lg={2} xl={2}>
                                    <InputGroup className="">
                                        <FormControl  
                                        type="text"
                                        onChange={(event) => handleFiltro('3',event)}
                                        value={busqueda}
                                        label="Introduzca la informacion" 
                                        disabled={myState.filtroControl.filtroSeleccionado === false ? true:false}
                                        name="busqueda"/>
                                         
                                    </InputGroup>
                                </Col>
                                <Col className="pt-sm-5 pt-md-0" xs={3} sm={6} md={2}>
                                    <Button onClick={()=>{handleBusqueda()}} disabled={myState.filtroControl.busquedaLlenada === false ? true:false} className="text-uppercase text-white" variant="link" href={void(0)} >
                                            Filtrar
                                    </Button>
                                </Col>
                                <Col className="pt-sm-5 pt-md-0"  xs={3}  sm={6} md={1}>
                                    <Button onClick={()=>{resetFilter('clear')}} className="text-uppercase text-white" variant="link" href={void(0)} >
                                            Limpiar
                                    </Button>
                                </Col>


                         
                            


                        </Row>
                        <Card className="" >
                                    <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                <th>#</th>
                                                <th>BookingId</th>
                                                <th>Cliente</th>
                                                <th>Fecha de Creación</th>
                                                <th>Dirección</th>
                                                <th>Precio</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {myState.listaDatos && myState.listaDatos.length > 0 ? 
                                                    myState.listaDatos.length === myState.listaDatosAuxiliar.length ?
                                                        myState.listaDatos.map((val,index) => {
                                                            let timestamp = val.bookingTime
                                                            let date = new Date(timestamp);
                                                        
                                                            return(
                                                                <tr key={`booking__${index}`}>
                                                                <td>{index + 1}</td>
                                                                <td>{val.bookingId}</td>
                                                                <td>{`${val.lastName}, ${val.firstName}`}</td>
                                                                <td>{moment(date).format("DD-MM-YYYY HH:MM:SS")}</td>
                                                                <td>{val.streetAddress}</td>
                                                                <td>{val.bookingPrice}</td>
                                                                </tr>

                                                            )
                                                        
                                                        })
                                                    :
                                                        myState.listaDatosAuxiliar.map((val,index) => {
                                                            let timestamp = val.bookingTime
                                                            let date = new Date(timestamp);
                                                        
                                                            return(
                                                                <tr key={`booking__${index}`}>
                                                                <td>{index + 1}</td>
                                                                <td>{val.bookingId}</td>
                                                                <td>{`${val.lastName}, ${val.firstName}`}</td>
                                                                <td>{moment(date).format("DD-MM-YYYY HH:MM:SS")}</td>
                                                                <td>{val.streetAddress}</td>
                                                                <td>{val.bookingPrice}</td>
                                                                </tr>

                                                            )
                                                        
                                                        })
                                              
                                                :null}
                                                
                                            
                                            </tbody>
                                    </Table>
                                 
                            </Card>
                       </Col>
                   </Row>

                    </Container>

               
                  

                   
                
            </React.Fragment>

    )
}

const mapStateToProps = (state) => {

    return { 
        data: state.login,
        userData: state.userData.data
    };
}

export default connect(mapStateToProps, {fetchData})(Dashboard);
