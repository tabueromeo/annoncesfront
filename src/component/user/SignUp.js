import { Link,useNavigate } from "react-router-dom";
import React from "react"
import { Form, FormGroup, Label, Input, Button} from 'reactstrap';
import axios from 'axios'
import config, { SERVER } from "../../config/config";
import sha256 from "sha256";
import {FaSms,FaWhatsappSquare} from "react-icons/fa";
import {IoMdCall} from "react-icons/io";
import { wait } from "@testing-library/user-event/dist/utils";

function SignUp(){
    const [user, setUser] = React.useState({});
    const [typeContact, setTypeContact] = React.useState(["","",""]);
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

function handleTypeContact(e){
    let temp = typeContact
    switch (e.target.name) {
        case "W":
            temp[0]==="W"?temp[0]="":temp[0]="W";
            break;
      case "S":
            temp[1]==="S"?temp[1]="":temp[1]="S";
            break;
      case "C":
            temp[2]==="C"?temp[2]="":temp[2]="C";
            break;
        default:
            break;
    }

    console.log(temp.toString())
}    
    

const typecall = ()=>{
return(
    <Form>
 
  <FormGroup
    check
    inline
  >
    <FaWhatsappSquare/>
    <Input type="checkbox" name ="W"  onChange={handleTypeContact}/>
    <Label check>
    WhatsApp
    </Label>
  </FormGroup>
  <FormGroup
    check
    inline
  >
    <FaSms/> 
    <Input type="checkbox" name ="S" onChange={handleTypeContact}/>
    <Label check>
    SMS
    </Label>
  </FormGroup>
  <FormGroup
    check
    inline
  >
    <IoMdCall/>
    <Input type="checkbox" name ="C" onChange={handleTypeContact}/>
    <Label check>
    Call
    </Label>
  </FormGroup>
</Form>
)
}


function handleSubmit(e){

    if(user["password"]===user["passwordcm"]){

        let tempUser = user
        tempUser["telephone"]=tempUser["telephone"]+"|"+typeContact.toString()

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
                <fieldset style={{border:"solid 1px #ced4da", padding:"6px", borderRadius:"5px"}}>
              
                    {typecall()}
                    <Label
                    for="telephone"
                    hidden
                    >
                    Téléphone
                    </Label>
                    <Input
                    id="telelephone"
                    name="telephone"
                    placeholder="Téléphone"
                    type="text"
                    style={{border:"none"}}
                    maxLength={config.inputTextTitlemaxLength}
                    onChange={handleChange}
                    />
                    </fieldset>
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
                    maxLength={config.inputTextTitlemaxLength}
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
                    maxLength={config.inputTextTitlemaxLength}
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