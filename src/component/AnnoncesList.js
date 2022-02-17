import { CardGroup, Card, CardImg, CardBody, CardTitle, CardSubtitle,  CardText, Button} from 'reactstrap'
import { Link } from "react-router-dom";
import AnnonceItem from './AnnonceItem';

function AnnoncesList(){
  
var array =[]
for (let index = 0; index < 10; index++) {
  array.push(index);  
}

    return(
        <CardGroup>
        {array.map((index)=>{
           return <Link to={`/Detail/${index}`} key={index} ><AnnonceItem/></Link>
        })} 
        </CardGroup>
    )


 

}

export default AnnoncesList;