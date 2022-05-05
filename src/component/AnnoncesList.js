import {useEffect, useState} from "react"
import { CardGroup, Card, CardImg, CardBody, CardTitle, CardSubtitle,  CardText, Button} from 'reactstrap'
import { Link } from "react-router-dom";
import AnnonceItem from './AnnonceItem';
import config from "../config/config";
import { Form, Input} from 'reactstrap';
import { Loader, Image, Segment,Pagination } from 'semantic-ui-react'
import axios from "axios";



function AnnoncesList(){


const [array,setArray] = useState([])
const [totalpage,setTotalpage] = useState(0)
const [activePage,setActivePage] = useState(1)
const perPage = 10;


useEffect(() => {
  axios.get(config.SERVER+`/annonces/readannonce`)
        .then(res => {
          const tmps = res.data
         
          const tpage = tmps.length/perPage
          setTotalpage(Math.ceil(tpage))
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

const paginationChange = (elt,data)=>{

setActivePage(data.activePage)
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
        {array.length>0?((array.slice((activePage-1)*perPage,activePage*perPage)).map((annonce,index)=>{
           return <Link to={`/Detail/${annonce._id}`} key={index} ><AnnonceItem description={annonce.description} title={annonce.title} images={annonce.images.length>5?annonce.images.split('==')[0]:config.defaultlovonsimage} date = {annonce.date}/></Link>
        })):( <Segment>
          <Loader disabled />
      
          <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />

          <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />

          <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Segment>)} 
       
        </CardGroup>
        
        <div  className="containerPrincipalListStyle"><Pagination defaultActivePage={1} totalPages={totalpage} onPageChange={paginationChange} /></div>
        
        </div>
    )


 

}

export default AnnoncesList;