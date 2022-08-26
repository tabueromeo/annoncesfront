import React from "react"
import { Link, useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button} from 'reactstrap';
import axios from 'axios'
import { SERVER,inputTextTitlemaxLength } from "../../config/config";
import sha256 from "sha256";
import { useDispatch } from "react-redux";
import { setUserType } from "../../feature/userSlice";
import Modal from 'react-modal';


function Login(){
    const [user, setUser] = React.useState({});
    const [modalIsOpen, setIsOpen] = React.useState(false);

    let navigate = useNavigate();
    const dispatch = useDispatch()
    
    
    function closeModal() {
        setIsOpen(false);
      }

      function openModal() {
        setIsOpen(true);
      }

      function afterOpenModal() {
        // references are now sync'd and can be accessed.
      //  subtitle.style.color = '#f00';
      }
    function handleChange(e){
        
     
        if(e.target.name==="password"){
            
            let usertmps = user
         usertmps[e.target.name]=sha256(e.target.value);
        setUser(usertmps)
        
        }else{
            let usertmps = user
            usertmps[e.target.name]=e.target.value;
            setUser(usertmps)
        }
        
        
        
        
    }
    
    function handleSubmit(e){
    
        axios.post(SERVER+"/user/login",user).then((response) => {
          
            localStorage.setItem('userid', JSON.stringify(response.data.id));
            localStorage.setItem('keylogtoken', JSON.stringify(response.data.token));
           

            dispatch(setUserType(response.data.typeuser))
            if(response.data.typeuser =="admin"){
              navigate("/adminmodifierannonces");
            }else{
              navigate("/modifierannonces");
            }
            

    }, (error) => {

      console.log(error);
      openModal()

    });

    
    
        e.preventDefault()
    }



    Modal.setAppElement('#root');

    return(
        <div className='loginMaincontainer'>
            
            <Form inline>
                <FormGroup>
                    <Label
                    for="exampleEmail"
                    hidden
                    >
                    Téléphone
                    </Label>
                    <Input
                    id="telelephone"
                    name="telephone"
                    placeholder="Téléphone"
                    type="text"
                    maxLength={inputTextTitlemaxLength}
                    onChange={handleChange}
                    />
                </FormGroup>
                {' '}
                <FormGroup>
                    <Label
                    for="examplePassword"
                    hidden
                    >
                    Password
                    </Label>
                    <Input
                    id="examplePassword"
                    name="password"
                    placeholder="Password"
                    type="Password"
                    maxLength={inputTextTitlemaxLength}
                    onChange={handleChange}
                    />
                </FormGroup>
                {' '}
                <Button onClick={handleSubmit}>
                    Connecter
                </Button>
                {'    '}
                <Link to={`/signup`} > Créer un compte</Link>
        </Form>
        <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >

      <p>Téléphone et ou mot de passe incorret</p> 
      
      </Modal>

</div>
    )
}

export default Login;

const customStyles = {
    content: {
      top: '20%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      color:'red',
      transform: 'translate(-50%, -50%)',
    },
  };