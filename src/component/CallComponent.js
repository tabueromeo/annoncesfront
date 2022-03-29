import { Card, CardTitle, CardText, Button, Col } from 'reactstrap';

function CallComponent(props){
  console.log(props)
    return(
        <Col sm="6">
        <Card body>
      <CardTitle tag="h5">
        {props.annonce.title}
      </CardTitle>
      <CardText>
      {props.annonce.description}
      </CardText>
      <Button>
        Go somewhere
      </Button>
    </Card>
    </Col>
    )
}

export default CallComponent