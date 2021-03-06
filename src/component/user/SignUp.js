import { Link,useNavigate } from "react-router-dom";
import React from "react"
import { Form, FormGroup, Label, Input, Button} from 'reactstrap';
import axios from 'axios'
import config, { SERVER } from "../../config/config";
import sha256 from "sha256";
import { wait } from "@testing-library/user-event/dist/utils";

function SignUp(){
    const [user, setUser] = React.useState({});
    const [isPassEgal, setisPassEgal] = React.useState(true);

    let navigate = useNavigate();
    
    function handleChange(e){
        
     
        if(e.target.name==="password"){
            
            let usertmps = user
            usertmps[e.target.name]=sha256(e.target.value);
            setUser(usertmps)

                if(usertmps["password"]===usertmps["passwordcm"]){
                    setisPassEgal(true)
                }else{
                    setisPassEgal(false)
                    
                }
        
        }else if(e.target.name==="passwordcm"){
                let usertmps = user
                usertmps[e.target.name]=sha256(e.target.value);
                    if(usertmps["password"]===sha256(e.target.value)){
                    setisPassEgal(true)
                }else{
                    setisPassEgal(false)
                    
                }

        }else{
            let usertmps = user
            usertmps[e.target.name]=e.target.value;
            setUser(usertmps)
        }
        
        
        
        
    }
    
function handleSubmit(e){

    if(user["password"]===user["passwordcm"]){

        axios.post(SERVER+"/user/signup",user).then((response) => {
            // console.log(response)
                
                 localStorage.setItem('userid', JSON.stringify(response.data.iduser))
                 localStorage.setItem('keylogtoken', JSON.stringify(response.data.token));
                  
                 navigate("/createmodifannonce");
                 
         }, (error) => {
           console.log(error);
         });

    }else{

        setisPassEgal(false)
    }
       
       
    
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
                    <option value={"Yaound??"}>
                       Yaound??
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
                placeholder="??ge"
                type="number"
                onChange={handleChange}
                />
            </FormGroup>

 
            <FormGroup> 

                <Input
                    className="mb-3"
                    type="select"
                    onChange={handleChange}
                    name ="genre"
                >
                    <option value={config.cherche.femme}>
                    {config.cherche.femme}
                    </option>
                    <option value={config.cherche.homme}>
                    {config.cherche.homme}
                    </option>
                    
                </Input>

            </FormGroup>
            

                <FormGroup>
                    <Label
                    for="telelephone"
                    hidden
                    >
                    T??l??phone
                    </Label>
                    <Input
                    id="telelephone"
                    name="telephone"
                    placeholder="T??l??phone"
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
                    style={{borderBlockColor : isPassEgal?"#ced4da":"red"}}
                    />
                </FormGroup>
                <p  style={{color : "red"}} > {isPassEgal?"":"Les mots de passe ne corespondent pas"}</p>

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