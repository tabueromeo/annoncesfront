import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../config/config'
import {Card,CardBody,Button,CardTitle, CardSubtitle,  CardText} from 'reactstrap'

export class ModifSupp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data : []
        }
    }

    deleteAnnonce=(e)=>{
        axios.post(config.SERVER+`/annonces/deleteannonce`,{id:e.target.name})
        .then(res => {
            
            this.getAllUserAnnonce()
        }).catch(erreur =>{
          //alert("serveur indisponible")
          console.log(erreur);
      })


    }

    getAllUserAnnonce=()=>{

        axios.get(config.SERVER+'/annonces/readannonce')
        .then(res => {
          const annonces = res.data;
          this.setState({ data : annonces });
      
        }).catch(error => {
            alert("serveur indisponible")
        })  
    }
   
    componentDidMount() {
        this.getAllUserAnnonce()
    }
    

    render() {
       // console.log(this.state.data)
        return (
            <div className='div_item_annonce'>
               
                {
                   this.state.data.map((item, index) => {
                       return <Card>
                               <div   className='div_contenant_image_annonce'>
                                    <img src = {config.rezise+item.images}  className='image_annonce'/>
                                </div>
                                <div className='div_contenant_texte_annonce'>
                                <CardBody>
                                <CardTitle tag="h5">
                                                {item.title}
                                                
                                            </CardTitle>
                                            <CardSubtitle
                                                className="mb-2 text-muted"
                                                tag="h6"
                                            >
                                                {item.date.split('T')[0]}
                                            </CardSubtitle>
                                            <CardText>
                                                {item.description.length>80?item.description.slice(0,80)+"...":item.description}
                                            </CardText>

                                        
                                        <Link to = {"/updateannonce/"+item._id}><Button className = "modif">modifier</Button></Link>
                                        <Button className = "suppression_detail" name={item._id} onClick = {this.deleteAnnonce
                                        }>supprimer</Button>
                                   
                                    </CardBody>
                                </div>
                           
                            
                            </Card>
                   })
                }
                
               
            </div>
        )
    }
}

export default ModifSupp
