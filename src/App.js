import React from 'react';
import './App.css';
import {Navbar, NavbarBrand, Jumbotron,Row, Col, Card,CardImg, CardBody} from 'reactstrap'; // Bootstrap composants 4
import MoneyChanger from './components/moneychanger'; // Composant permettant de faire la convertion
import Chart from './components/chart'; // Composant permettant de gérer le graphique 
import logo from './piggybank-2913293_1920.jpg'; // logo
/* App est une fonction sans état (stateless) car il n'est pas nécéssaire dans cet exemple de mémoriser un status */
function App() {
  return (
    <div className="App">
       <Navbar  expand="md">
          <NavbarBrand>TheConvertor</NavbarBrand>
        </Navbar>
      <Jumbotron>
        <h1 className="display-3">TheConvertor</h1>
        <p className="lead"><b>The best way to convert</b></p>
        <br/>
        <hr className="my-2" />
        <br/>
        {/*Penser ces composants génériques : ici la liste des monnaies est passé en props.*/}
        <MoneyChanger listOfCurrencies={['USD','GBP','CAD','EUR']}/> 
      </Jumbotron>
      <Row>
        <Col md={6}>
          <Card>
            <CardBody>
              {/*J'ai ajouté un graphique pour le fun. :-p*/}
              <Chart/>
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <CardImg src={logo} alt="Logo" />         
          </Card>
        </Col>
      </Row>

    </div>
  );
}

export default App;
