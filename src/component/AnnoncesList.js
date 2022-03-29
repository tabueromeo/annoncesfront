import {useEffect, useState} from "react"
import { CardGroup, Card, CardImg, CardBody, CardTitle, CardSubtitle,  CardText, Button} from 'reactstrap'
import { Link } from "react-router-dom";
import AnnonceItem from './AnnonceItem';
import config from "../config/config";
import axios from "axios";
import { createPortal } from "react-dom";


function AnnoncesList(){


const [array,setArray] = useState([])

useEffect(() => {
  axios.get(config.SERVER+`/annonces/readannonce`)
        .then(res => {
          const tmps = res.data
          setArray(
            tmps
          )
        }).catch(erreur =>{
          //alert("serveur indisponible")
          console.log(erreur);
      })
},[]);

    return(
        <CardGroup>
        {array.length>0?(array.map((annonce,index)=>{
           return <Link to={`/Detail/${annonce._id}`} key={index} ><AnnonceItem description={annonce.description} title={annonce.title} images={annonce.images} date = {annonce.date}/></Link>
        })):""} 
        </CardGroup>
    )


 

}

export default AnnoncesList;