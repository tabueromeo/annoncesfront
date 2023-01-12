
import {useEffect, useState} from "react"
import { useSelector } from "react-redux";
import axios from 'axios'
import config from '../config/config'
import { Link,useNavigate } from 'react-router-dom';
import { selectTypeUser } from "../feature/userSlice";
import {Card,CardBody,Button,CardTitle, CardSubtitle,  CardText,FormGroup,Input, Nav,NavItem,NavLink,TabContent,TabPane} from 'reactstrap'
import moment from "moment";
import frLocale from "moment/locale/fr";

    function AdminModifSupp(){

        const usertypeFromStore = useSelector(selectTypeUser);
        console.log("usetype:", usertypeFromStore)

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
    
            axios.get(config.SERVER+'/annonces/readannonce')
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
    
       
       
   
    const  afficheButtonAddAnnonce =()=>{
        return  (<div className='buttonAddAnnonce' style={{maxWidth: "400px",marginLeft:"auto",marginRight:"auto"}}> <h3 style={{color:"#ee3f89"}}> Aucune annonce disponible sur votre site</h3> 
     </div>)
    }

    const handlestatutChange = (e,data)=>{
        
        let temps = data     
        temps["statut"] = e.target.value
       
        
        axios.post(config.SERVER+`/annonces/update`,  temps )
        .then(res => {
           
         //  toast("Annonce modifiée")
     
        }).catch(erreur =>{
            alert("serveur indisponible")
            console.log(erreur);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        }) 

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
             return  <Card className='list_item_container_modif_supp' key={index}>
           <div   className='div_contenant_image_annonce'>
                 <img src = {config.rezise+(item.images.length>5?item.images.split('==')[0]:config.defaultlovonsimage)}  className='image_annonce'/>
             </div>
             <div className='div_contenant_texte_annonce'>
             <CardBody>
             <FormGroup> 
                                <Input
                                    className="mb-3"
                                    type="select"
                                   
                                    name ="statut"
                                    
                                    value={item.statut}
                                    onChange={ (e)=>handlestatutChange(e,item)}
                                    style={{color:"orange",border:"solid 1px",padding:"2px",borderRadius:"5px",maxWidth:"95px"}}
                                >
                                    
                                    <option value={config.statut.ligne}>
                                    {config.statut.ligne}
                                    </option>
                                    <option value={config.statut.attente}>
                                    {config.statut.attente}
                                    </option>
                                    <option value={config.statut.supprime}>
                                    {config.statut.supprime}
                                    </option>
                                
                                    
                                </Input>

                                </FormGroup>


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
                         <Link to={`/Detail/${item._id}`}><Button className = "detail">Detail</Button></Link>  
                     <Link to = {"/updateannonce/"+item._id}><Button className = "modif">Modifier</Button></Link>
                     <Button className = "suppression_detail" name={item._id} onClick = {deleteAnnonce
                     }>Supprimer</Button> </div>
                
                 </CardBody>
             </div>
        
         
         </Card> }}))

        }

        const tabpaneAfficheEnligne = ()=>{
            
            return( data.map((item, index) => {if(item.statut =="En ligne"){ 
                return <Card className='list_item_container_modif_supp' key={index}>
               <div   className='div_contenant_image_annonce'>
                    <img src = {config.rezise+(item.images.length>5?item.images.split('==')[0]:config.defaultlovonsimage)}  className='image_annonce'/>
                </div>
                <div className='div_contenant_texte_annonce'>
                <CardBody>
               
                <FormGroup> 
                                <Input
                                    className="mb-3"
                                    type="select"
                                   
                                    name ="statut"
                                    
                                    value={item.statut}
                                    onChange={ (e)=>handlestatutChange(e,item)}
                                    style={{color:"green",border:"solid 1px",padding:"2px",borderRadius:"5px",maxWidth:"80px"}}
                                >
                                    
                                    <option value={config.statut.ligne}>
                                    {config.statut.ligne}
                                    </option>
                                    <option value={config.statut.attente}>
                                    {config.statut.attente}
                                    </option>
                                    <option value={config.statut.supprime}>
                                    {config.statut.supprime}
                                    </option>
                                
                                    
                                </Input>

                                </FormGroup>
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
            
            return( data.map((item, index) => {if(item.statut =="Supprimée"){ 
                return <Card className='list_item_container_modif_supp' key={index}>
               <div   className='div_contenant_image_annonce'>
                    <img src = {config.rezise+(item.images.length>5?item.images.split('==')[0]:config.defaultlovonsimage)}  className='image_annonce'/>
                </div>
                <div className='div_contenant_texte_annonce'>
                <CardBody>
            
                <FormGroup> 
                                <Input
                                    className="mb-3"
                                    type="select"
                                   
                                    name ="statut"
                                    
                                    value={item.statut}
                                    onChange={ (e)=>handlestatutChange(e,item)}
                                    style={{color:"red",border:"solid 1px",padding:"2px",borderRadius:"5px",maxWidth:"95px"}}
                                >
                                    
                                    <option value={config.statut.ligne}>
                                    {config.statut.ligne}
                                    </option>
                                    <option value={config.statut.attente}>
                                    {config.statut.attente}
                                    </option>
                                    <option value={config.statut.supprime}>
                                    {config.statut.supprime}
                                    </option>
                                
                                    
                                </Input>

                                </FormGroup>
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
    
    
           
            return (
                <div className='div_item_annonce'>
                    <Button
            color="primary"
            onClick={handleDeconnexion}
            
        >
        Se déconnecter
        </Button>
        
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
                        Supprimées ({countAnnonceByStatus("Supprimée")})
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
    


export default AdminModifSupp

