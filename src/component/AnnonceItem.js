import { CardGroup, Card, CardImg, CardBody, CardTitle, CardSubtitle,  CardText, Button} from 'reactstrap'
import '../css/AnnonceItem.css'
function AnnonceItem(){
    let rezise = "https://res.cloudinary.com/dzjjthglw/image/fetch/h_270/"
    return(
        <div className='div_item_annonce'>
            <Card>
            <CardImg
            src={rezise+"https://res.cloudinary.com/dzjjthglw/image/upload/v1639741713/sample.jpg"}
            top
            className='image_annonce'
     
            />
            <CardBody>
            <CardTitle tag="h5">
                Card title
            </CardTitle>
            <CardSubtitle
                className="mb-2 text-muted"
                tag="h6"
            >
                Card subtitle
            </CardSubtitle>
            <CardText>
                This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
            </CardText>
            <Button>
                Button
            </Button>
            </CardBody>
        </Card>
        </div>
    )

}

export default AnnonceItem;