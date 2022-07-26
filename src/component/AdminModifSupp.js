
import {useEffect, useState} from "react"
import axios from 'axios'
import config from '../config/config'
import { Link,useNavigate } from 'react-router-dom';
import {Card,CardBody,Button,CardTitle, CardSubtitle,  CardText} from 'reactstrap'
import moment from "moment";
import frLocale from "moment/locale/fr";

 function AdminModifSupp(){

    const [data, setData]= useState([])
    moment.locale('fr', [frLocale])
    let navigate = useNavigate();

    const deleteAnnonce=(e)=>{
        axios.post(config.SERVER+`/annonces/deleteannonce`,{id:e.target.name})
        .then(res => {
            
            this.getAllUserAnnonce()
        }).catch(erreur =>{
          //alert("serveur indisponible")
          console.log(erreur);
      })


    }

    const handleDeconnexion = (e)=>{
        localStorage.removeItem('keylogtoken');
        navigate("/login");
        
    }

   const getAllUserAnnonce=()=>{
        const userid = JSON.parse(localStorage.getItem('userid'));

        axios.get(config.SERVER+'/annonces/showbyiduser?iduser='+userid)
        .then(res => {
          const annonces = res.data;
          setData (annonces);
      
        }).catch(error => {
            alert("serveur indisponible")
        })  
    }

    useEffect(() => {
        getAllUserAnnonce()
      },[]);

   
   


   const  afficheButtonAddAnnonce =()=>{
        return  (<div className='buttonAddAnnonce' style={{maxWidth: "400px",marginLeft:"auto",marginRight:"auto"}}> <h3 style={{color:"#ee3f89"}}> Aucune annonce disponible sur votre site</h3> 
     </div>)
    }
    


       
        return (
            <div className='div_item_annonce'>
                <Button
        color="primary"
        onClick={handleDeconnexion}
        
    >
    Se déconnecter
    </Button>
               
                {
                 data.length>0? data.map((item, index) => {
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
                   }): afficheButtonAddAnnonce()
                }
                
               
            </div>
        )
 
}



export default AdminModifSupp

