import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../config/config'

export class ModifSupp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data : []
        }
    }
   
    componentDidMount() {

        axios.get(config.SERVER+'/annonces/readannonce')
        .then(res => {
          const annonces = res.data;
          this.setState({ data : annonces });
          console.log(this.state.data)
        }).catch(error => {
            alert("serveur indisponible")
        })      
    }
    

    render() {
        console.log(this.state.data)
        return (
            <div>
                <div>
                {
                   this.state.data.map((item, index) => {
                       return<div key = {index} className = "container">
                               <div >
                                    <img src = {config.rezise+item.images} />
                                </div>
                                <div className = "contInner" >
                                    <div>
                                        <h2>{item.wording}</h2>
                                        <p>{item.description}</p>
                                    </div>
                                    <div>
                                        <Link to = {"/createmodifannonce/"+item.id}><button className = "modif">modifier</button></Link>
                                        <button className = "supp" onClick = {
                                            () =>{
                                                this.state.data.splice(item, 1)
                                                console.log(this.state.data.length)
                                            }
                                        }>supprimer</button>
                                    </div>
                                </div>
                            </div>
                   })
                }
                
                </div>
            </div>
        )
    }
}

export default ModifSupp
