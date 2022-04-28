import {useEffect, useState} from "react"
import { CardGroup, Card, CardImg, CardBody, CardTitle, CardSubtitle,  CardText, Button} from 'reactstrap'
import { Link } from "react-router-dom";
import AnnonceItem from './AnnonceItem';
import config from "../config/config";
import { Form, Input} from 'reactstrap';
import axios from "axios";



function AnnoncesList(){


const [array,setArray] = useState([])
const [criteria,setCriteria] = useState([])


useEffect(() => {
  axios.get(config.SERVER+`/annonces/readannonce`)
        .then(res => {
          const tmps = res.data
          console.log(tmps)
          setArray(
            tmps
          )
        }).catch(erreur =>{
          //alert("serveur indisponible")
          console.log(erreur);
      })
},[]);

const handleChange = (e)=>{
  if(e.target.name&&e.target.value){
    axios.get(config.SERVER+`/annonces/showbycriteria?${e.target.name}=${e.target.value}`)
    .then(res => {
      const tmps = res.data
      setArray(
        tmps
      )
    }).catch(erreur =>{
      //alert("serveur indisponible")
      console.log(erreur);
  })
  }
  
  
 
}

    return(
      <div>
        <Form className='formulaire_entete'>

  <Input
    className="mb-3"
    placeholder="default"
  />
 

  <Input
    className="mb-3"
    type="select"
  onChange={handleChange}
  name="category"
  >
    <option>
      Catégories 1
    </option>
    <option>
      Catégories 2
    </option>
  </Input>


  <Input
    className="mb-3"
    type="select"
    name="ville"
    onChange={handleChange}
  >
    <option>
      Yaoundé
    </option>
    <option>
      Douala
    </option>
  </Input>

</Form>
      
        <CardGroup className="list_item_container_principale">
        {array.length>0?(array.map((annonce,index)=>{
           return <Link to={`/Detail/${annonce._id}`} key={index} ><AnnonceItem description={annonce.description} title={annonce.title} images={annonce.images.length>5?annonce.images.split('==')[0]:config.defaultlovonsimage} date = {annonce.date}/></Link>
        })):""} 
        </CardGroup>
        
    
        
        </div>
    )


 

}

export default AnnoncesList;