import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip,Legend } from 'recharts';
/** Ce composant est la pour faire du remplissage. A la base je voulais avoir des graphes d'historisation du cours mais l'api n'est pas gratuite :-( */
/** Opportunité de voir un composant fonctionnel sans état
 * C'est une fonction qui renvoie uniquement du 'HTML'
*/
const data = [{name: '01-01-19', USD: 1.12, GBP: 0.83},{name: '01-03-19', USD: 1.14, GBP: 0.95}, {name: '01-05-19', USD: 1.19, GBP: 0.86}, {name: '01-07-19', USD: 1.6, GBP: 0.5} ];
export default function chart(){
        return ( 
            <div> 
                <center>
                    <h5> Change before it is too late!!!</h5>
                    <LineChart width={600} height={250} data={data}>
                        <Line type="monotone" dataKey="USD" stroke="pink" strokeWidth={5}  />
                        <Line type="monotone" dataKey="GBP" stroke="purple" strokeWidth={5} />
                        <CartesianGrid stroke="#ccc" />
                        <Tooltip />
                        <Legend />
                        <XAxis dataKey="name" />
                        <YAxis />
                    </LineChart>
                </center>
            </div>
        )
    }


