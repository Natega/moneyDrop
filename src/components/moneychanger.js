import React, {Component} from 'react' 
import { InputGroup, Input, InputGroupAddon, Row, Col } from 'reactstrap';
const API_TOKEN = "05a85de2577c0eafaadf04e8ef4a10f8";
// Pour créer un composant React il doit hériter de Component 
export default class MoneyChanger extends Component{
    constructor(props) { //Constructeur 
        super(props); // j'appelle le constructeur de Component
        this.moneyChange = this.moneyChange.bind(this); // lier le `this` et permet de faire fonctionner la callback
        this.amountChange = this.amountChange.bind(this); // il existe d'autre methode pour lier le this comme arrow function... 
        this.state = {reference:'EUR', deviceSelected : 'USD', amountEuro : 1, convertData:{}, amountOutput:0}; // valeur par default du state !!! Cette fonction est asynchrone.
    }
    computeCurrency(convertcurrency,amountMoney){ // Faire la conversion nous avons besoin de connaitre la monnaie et la quantité en euro 
        let amountOutput = this.state.convertData.rates[convertcurrency] * amountMoney; // Valeur de la monnaie * la quantité d'argent en Eur
        amountOutput = Math.round(amountOutput*100)/100; // Avoir 2 chiffres après la virgule 
        this.setState({amountEuro: amountMoney, deviceSelected:convertcurrency, amountOutput:amountOutput}); //mettre à jour les states pour actualiser le modèle et dispatcher à la vue
    }
    amountChange(e){
        e.preventDefault(); // stop la propagation de l'event (question de performance)
        let amountInitMoney = e.target.value; // recupere la somme en Eur dans l'event (e)
        let convertcurrency = this.convertcurrency.value; // recupere le type de monnaie
        this.computeCurrency(convertcurrency,amountInitMoney); // faire le calcule 
    }
    moneyChange(e){ // même explication qu'au dessus 
        e.preventDefault();
        let amountInitMoney = this.initmoney.value;
        let convertcurrency = e.target.value;
        this.computeCurrency(convertcurrency,amountInitMoney);
    }
    moneyLoader(){ // callback du fetch 
        let amountInitMoney = this.initmoney.value; // utilise les refs de react permet de lier un composant html à une variable js 
        let convertcurrency =  this.convertcurrency.value;
        this.computeCurrency(convertcurrency,amountInitMoney);
    }
    componentDidMount(){
        var self = this; // permet d'utiliser le this dans les callback du fetch
        var myHeaders = new Headers(); // avoir des headers si besoin  
        var myInit = { method: 'GET', // methode d'envoie de la requète GET POST UPDATE...
                    headers: myHeaders // passer les headers
                    };
        /* On pourrait avoir une fonction pour générer les URLs*/
        fetch('http://data.fixer.io/api/latest?access_key='+API_TOKEN+'&base=EUR&symbols='+this.props.listOfCurrencies.join(), myInit)
            .then(function(response) {
                return response.json(); // convertir la response en JSON
            }).then(function(myDataApp) {
                self.setState({convertData:myDataApp}, self.moneyLoader); // stocker dans le state : le resultat de la requète et ensuite appellé une callback pour mettre a jour la callback  OUI c'est asynchrone 
                /** L'utilisation 'academique' est la suivante : c'est une difference d'état
                 *   this.setState(
                        (prevState, props) => ({ count: prevState.count + props.inc })
                        )
                 */
        });
    }
    render(){
        return (
            <Row className='justify-content-md-center'>
                 <Col md={3} >
                    <InputGroup>
                        {/** Utiliser innerRef plutot ref pour avoir les propriétes du composant c'est pas standard*/}
                        <Input innerRef={(input) => {this.initmoney = input}} type='number' min='0'  onChange={this.amountChange} defaultValue={this.state.amountEuro}/>
                        <InputGroupAddon addonType="append">EUR</InputGroupAddon>
                    </InputGroup>
                </Col>
                <Col md={3}>
                    <InputGroup >
                        {/**Générer la liste de monnaie grace à la fonction map */}
                        <Input  type="select" innerRef={(input) => {this.convertcurrency = input}} onChange={this.moneyChange}>
                            {this.props.listOfCurrencies.map((el) => (
                                <option key={el} value={el}>{el}</option>
                            ))}
                        </Input>
                    </InputGroup>
                </Col>
                <Col md={3}>
                    <InputGroup>
                    <Input type='number' min='0' value={this.state.amountOutput} disabled/>
                        <InputGroupAddon addonType="append">{this.state.deviceSelected}</InputGroupAddon>
                    </InputGroup>
                </Col>
            </Row>
        )
    }
}