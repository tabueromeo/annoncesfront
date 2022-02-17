import { Link } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button} from 'reactstrap';


function Login(){
    return(
        <div className='loginMaincontainer'>
            
            <Form inline>
                <FormGroup>
                    <Label
                    for="exampleEmail"
                    hidden
                    >
                    Email
                    </Label>
                    <Input
                    id="telelephone"
                    name="telelephone"
                    placeholder="Téléphone"
                    type="text"
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
                    />
                </FormGroup>
                {' '}
                <Button>
                    Connecter
                </Button>
                {'    '}
                <Link to={`/signup`} > Créer un compte</Link>
        </Form>
</div>
    )
}

export default Login;