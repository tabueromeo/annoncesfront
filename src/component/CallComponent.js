import { Card, CardTitle, CardText, Button, Col } from 'reactstrap';

function CallComponent(){
    return(
        <Col sm="6">
        <Card body>
      <CardTitle tag="h5">
        Special Title Treatment
      </CardTitle>
      <CardText>
        With supporting text below as a natural lead-in to additional content.
      </CardText>
      <Button>
        Go somewhere
      </Button>
    </Card>
    </Col>
    )
}

export default CallComponent