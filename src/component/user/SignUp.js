import { Link } from "react-router-dom";
import React from "react"
import { Form, FormGroup, Label, Input, Button} from 'reactstrap';
import axios from 'axios'
import { SERVER } from "../../config/config";
import sha256 from "sha256";

function SignUp(){
    const [user, setUser] = React.useState({});
    
    
    function handleChange(e){
        
     
        if(e.target.name==="password"){
            
            let usertmps = user
         usertmps[e.target.name]=sha256(e.target.value);
        setUser(usertmps)
        
        }else if(e.target.name==="passwordcm"){
            let usertmps = user
                if(usertmps["password"]===sha256(e.target.value)){

            }else{
                
            }

        }else{
            let usertmps = user
            usertmps[e.target.name]=e.target.value;
            setUser(usertmps)
        }
        
        
        
        
    }
    
    function handleSubmit(e){
       
        axios.post(SERVER+"/user/signup",user).then((response) => {
            localStorage.setItem('keylogtoken', JSON.stringify(response.data.token));
            localStorage.setItem('userid', JSON.stringify(response.data._id));
            console.log(response.data)
    }, (error) => {
      console.log(error);
    });
    
        e.preventDefault()
    }
    
    return(
        <div className='loginMaincontainer'>

         
            <Form inline>
            <FormGroup> 

                <Input
                    className="mb-3"
                    type="select"
                    onChange={handleChange}
                    name ="ville"
                >
                    <option value={"Yaoundé"}>
                       Yaoundé
                    </option>
                    <option value={"Douala"}>
                       Douala
                    </option>
                    
                </Input>

            </FormGroup>

            <FormGroup>
                <Input
                id="exampleNumber"
                name="age"
                placeholder="âge"
                type="number"
                onChange={handleChange}
                />
            </FormGroup>


                <FormGroup>
                    <Label
                    for="telelephone"
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
                    type="password"
                    onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label
                    for="examplePassword"
                    hidden
                    >
                    Password
                    </Label>
                    <Input
                    id="examplePassword"
                    name="passwordcm"
                    placeholder="Conifrm password"
                    type="password"
                    onChange={handleChange}
                    />
                </FormGroup>

                {' '}
                <Button onClick = {handleSubmit}>
                    S'inscrire
                </Button>

                <Link to={`/login`} > Se connecter</Link>
        </Form>
</div>
    )
}

export default SignUp;