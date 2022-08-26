import {useEffect, useState} from "react"
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
import config from '../config/config'
import {Card,CardBody,Button,CardTitle, CardSubtitle,  CardText, Nav,NavItem,NavLink,TabContent,TabPane} from 'reactstrap'
import moment from "moment";
import frLocale from "moment/locale/fr";

    function ModifSupp(){

        const [data, setData]= useState([])
        const [activeTab, setActiveTabe]= useState("1")
        moment.locale('fr', [frLocale])
        let navigate = useNavigate();
    
        const deleteAnnonce=(e)=>{
            
            axios.post(config.SERVER+`/annonces/deleteannonce`,{id:e.target.name})
            .then(res => {
                
                getAllUserAnnonce()
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
              console.log(annonces)
              setData (annonces);
          
            }).catch(error => {
                alert("serveur indisponible")
            })  
        }
    
        useEffect(() => {
            getAllUserAnnonce()
          },[]);
    
       
       
    const handleAddAnnonce = ()=>{
        navigate('/createmodifannonce')
    }
    
       const  afficheButtonAddAnnonce =()=>{
            return  (<div className='buttonAddAnnonce' style={{maxWidth: "400px",marginLeft:"auto",marginRight:"auto"}}> <h3 style={{color:"#ee3f89"}}> Vous n'avez pas encore d'annonce</h3> <Button
            color="primary"
            onClick={handleAddAnnonce}
            
        >
         <Link to="/createmodifannonce">  Publiez une annonce</Link>
        </Button></div>)
        }

    const countAnnonceByStatus =(statut)=>{

           let counter = 0
        data.forEach(element => {
            if(element.statut ==statut){ 
                counter++
            }
        });

        return counter
    }

    

        const tabpaneAfficheEnattente = ()=>{
            
            return( data.map((item, index) => {if(item.statut =="En attente"){ 
             return <Card className='list_item_container_modif_supp' key={index}>
            <div   className='div_contenant_image_annonce'>
                 <img src = {config.rezise+(item.images.length>5?item.images.split('==')[0]:config.defaultlovonsimage)}  className='image_annonce'/>
             </div>
             <div className='div_contenant_texte_annonce'>
             <CardBody>
             <h6 style={{color:"orange",border:"solid 1px",padding:"2px",borderRadius:"5px",maxWidth:"72px"}}>
                    En attente
                </h6>
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
                     <Button className = "suppression_detail" name={item._id} onClick = {deleteAnnonce
                     }>Supprimer</Button> </div>
                
                 </CardBody>
             </div>
        
         
         </Card>}}))

        }

        const tabpaneAfficheEnligne = ()=>{
            
            return( data.map((item, index) => {if(item.statut =="En ligne"){ 
                return <Card className='list_item_container_modif_supp' key={index}>
               <div   className='div_contenant_image_annonce'>
                    <img src = {config.rezise+(item.images.length>5?item.images.split('==')[0]:config.defaultlovonsimage)}  className='image_annonce'/>
                </div>
                <div className='div_contenant_texte_annonce'>
                <CardBody>
                <h6 style={{color:"green",border:"solid 1px",padding:"2px",borderRadius:"5px",maxWidth:"60px"}}>
                    En ligne
                </h6>
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
                        <Button className = "suppression_detail" name={item._id} onClick = {deleteAnnonce
                        }>Supprimer</Button> </div>
                   
                    </CardBody>
                </div>
           
            
            </Card>}}))
   
            
        }
        
        const tabpaneAfficheSupprime = ()=>{
            
            return( data.map((item, index) => {if(item.statut =="Supprime"){ 
                return <Card className='list_item_container_modif_supp' key={index}>
               <div   className='div_contenant_image_annonce'>
                    <img src = {config.rezise+(item.images.length>5?item.images.split('==')[0]:config.defaultlovonsimage)}  className='image_annonce'/>
                </div>
                <div className='div_contenant_texte_annonce'>
                <CardBody>
                <h6 style={{color:"red",border:"solid 1px",padding:"2px",borderRadius:"5px",maxWidth:"60px"}}>
                    Supprimée(s)
                </h6>
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
                        <Button className = "suppression_detail" name={item._id} onClick = {deleteAnnonce
                        }>Supprimer</Button> </div>
                   
                    </CardBody>
                </div>
           
            
            </Card>}}))
   
            
        }

    const handlepay = ()=>{
     
        let dataForm ={}

        dataForm[ "service"] = "OVy7AGxUgYpxg6GLbMfDMks5AjE0N9nq"
        dataForm[ "phonenumber"] = "237699944195"
        dataForm[ "amount"] = "2000"
        dataForm[ "notify_url"] = config.SERVER+"/payment"

       console.log("test")
        axios.post(`https://api.monetbil.com/payment/v1/placePayment`,  dataForm )
          .then(res => {
          
          console.log(res)
      
         
        
          }).catch(err =>{
            console.log(err)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
          }) 


    }
    
    
           
            return (
                <div className='div_item_annonce'>
                    <Button
            color="primary"
            onClick={handleDeconnexion}
            
        >
        Se déconnecter
        </Button>
        <Button class="" style={{margin:"10px"}} onClick={handlepay}>Pay by Mobile Money</Button>

        
                    <Nav tabs>
                    <NavItem>
                    <NavLink
                        className={activeTab=="1"?"active":""}
                        onClick={function noRefCheck(){ setActiveTabe("1")}}
                    >
                        En ligne ({countAnnonceByStatus("En ligne")})
                    </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink
                        className={activeTab=="2"?"active":""}
                        onClick={function noRefCheck(){setActiveTabe("2")}}
                    >
                        En attente ({countAnnonceByStatus("En attente")})
                    </NavLink>
                    </NavItem>

                    <NavItem>
                    <NavLink
                        className={activeTab=="3"?"active":""}
                        onClick={function noRefCheck(){setActiveTabe("3")}}
                    >
                        Supprimées ({countAnnonceByStatus("Supprime")})
                    </NavLink>
                    </NavItem>

                </Nav>
                
                   
                            {
                            data.length>0? <TabContent activeTab={activeTab}><TabPane tabId="1"> {tabpaneAfficheEnligne()}</TabPane>
                            <TabPane tabId="2">{tabpaneAfficheEnattente()}</TabPane>
                           <TabPane tabId="3">{tabpaneAfficheSupprime()}</TabPane> </TabContent>: afficheButtonAddAnnonce()
                            }
                    
                      
                </div>
            )
     
    }
    
    

export default ModifSupp

