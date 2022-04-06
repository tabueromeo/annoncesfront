import { Card, CardTitle, CardText, Button, Col } from 'reactstrap';
import React from 'react';

import Modal from 'react-modal';

function CallComponent(props){
  const {title, date,description,telephone} = props.annonce;
  
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  //  subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }


  Modal.setAppElement('#root');
  
  
    return(
        <Col sm="6">
        <Card body>
      <CardTitle tag="h5">
        {title}
      </CardTitle>
      <CardTitle tag="h6">
      {"Publié le "+date}
      </CardTitle>

      <CardText>
      {description}
      </CardText>
      <Button onClick={openModal}>
      Afficher le numéro
      </Button>
    </Card>

    <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >

      <h2>{telephone}</h2> 
      
      </Modal>

    </Col>
    )
}

const customStyles = {
  content: {
    top: '20%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default CallComponent