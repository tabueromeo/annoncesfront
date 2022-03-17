import { Link } from "react-router-dom";
import React from "react"
import { Form, FormGroup, Label, Input, Button} from 'reactstrap';
import axios from 'axios'

function SignUp(){
    const [user, setUser] = React.useState({});
    
    
    function handleChange(e){
        
     
        let usertmps = user
         usertmps[e.target.name]=e.target.value;
        setUser(usertmps)
        
        
        
    }
    
    function handleSubmit(e){
        
        console.log(user)
        axios.post("http://137.184.225.204:5000/",user).then((response) => {
      console.log(response)
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
                name="telephone"
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
                    type="mot de passe"
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
                    type="mot de passe"
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