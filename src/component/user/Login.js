import React from "react"
import { Link, useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button} from 'reactstrap';
import axios from 'axios'
import { SERVER } from "../../config/config";
import sha256 from "sha256";
import { bodyOpenClassName } from "react-modal/lib/components/Modal";

function Login(){
    const [user, setUser] = React.useState({});
    let navigate = useNavigate();
    
    
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
        console.log(user)
        axios.post(SERVER+"/user/login",user).then((response) => {
            localStorage.setItem('keylogtoken', JSON.stringify(response.data.token));
            localStorage.setItem('userid', JSON.stringify(response.data._id));

       navigate("/modifierannonces");

    }, (error) => {
      console.log(error);
    });

    
    
        e.preventDefault()
    }



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
</div>
    )
}

export default Login;