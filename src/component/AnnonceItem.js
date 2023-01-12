import { CardGroup, Card, CardImg, CardBody, CardTitle, CardSubtitle,  CardText, Button} from 'reactstrap'
import '../css/AnnonceItem.css'
import config from '../config/config'
import moment from "moment";
import frLocale from "moment/locale/fr";
import { BiTimeFive} from "react-icons/bi";

function AnnonceItem(props){



    moment.locale('fr', [frLocale])
    return(
        <div className='div_item_annonce'>
            <Card>
            <div className='div_contenant_image_annonce'>
                <img
                src={config.rezise+props.images}
                
                className='image_annonce'
            
                />
            </div>

            <div className='div_contenant_texte_annonce'>
            <CardBody>
            <CardTitle tag="h5" style={{color:"#ee3f89"}}>
                {props.title+(props.ville?", "+props.ville:"")}
            </CardTitle>
            

            <CardSubtitle
                className="mb-2 text-muted"
                tag="h6"
            >
               <BiTimeFive/>  Publiée {moment(props.date).fromNow()}
            </CardSubtitle>
            <CardText>
                {props.description.length>80?props.description.slice(0,100)+"...":props.description}
            </CardText>

          
            </CardBody>
            </div>

        </Card>
        </div>
    )

}

export default AnnonceItem;