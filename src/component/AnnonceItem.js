import { CardGroup, Card, CardImg, CardBody, CardTitle, CardSubtitle,  CardText, Button} from 'reactstrap'
import '../css/AnnonceItem.css'
import config from '../config/config'
function AnnonceItem(props){

  //  console.log(props)
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
            <CardTitle tag="h5">
                {props.title}
            </CardTitle>
            <CardSubtitle
                className="mb-2 text-muted"
                tag="h6"
            >
             Publié le   {props.date.split('T')[0]}
            </CardSubtitle>
            <CardText>
                {props.description>80?props.description.slice(0,80)+"...":props.description}
            </CardText>
            </CardBody>
            </div>

        </Card>
        </div>
    )

}

export default AnnonceItem;