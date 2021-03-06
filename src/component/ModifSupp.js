import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../config/config'
import {Card,CardBody,Button,CardTitle, CardSubtitle,  CardText} from 'reactstrap'
import moment from "moment";
import frLocale from "moment/locale/fr";

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
        const userid = JSON.parse(localStorage.getItem('userid'));

        axios.get(config.SERVER+'/annonces/showbyiduser?iduser='+userid)
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



    afficheButtonAddAnnonce(){
        return  (<div className='buttonAddAnnonce' style={{maxWidth: "400px",marginLeft:"auto",marginRight:"auto"}}> <h3 style={{color:"#ee3f89"}}> Vous n'avez pas encore d'annonce</h3> <Button
        color="primary"
        onClick={this.handleAddAnnonce}
        
    >
     <Link to="/createmodifannonce">  Publiez une annonce</Link>
    </Button></div>)
    }
    

    render() {
        moment.locale('fr', [frLocale])
        return (
            <div className='div_item_annonce'>
               
                {
                 this.state.data.length>0? this.state.data.map((item, index) => {
                       return <Card className='list_item_container_modif_supp'>
                               <div   className='div_contenant_image_annonce'>
                                    <img src = {config.rezise+(item.images.length>5?item.images.split('==')[0]:config.defaultlovonsimage)}  className='image_annonce'/>
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
                                                {moment(item.date).fromNow()}
                                            </CardSubtitle>
                                            <CardText>
                                                {item.description?item.description.slice(0,80)+"...":item.description}
                                            </CardText>

                                            <div className='buttonModifSupprim'>
                                        <Link to = {"/updateannonce/"+item._id}><Button className = "modif">Modifier</Button></Link>
                                        <Button className = "suppression_detail" name={item._id} onClick = {this.deleteAnnonce
                                        }>Supprimer</Button> </div>
                                   
                                    </CardBody>
                                </div>
                           
                            
                            </Card>
                   }): this.afficheButtonAddAnnonce()
                }
                
               
            </div>
        )
    }
}



export default ModifSupp

