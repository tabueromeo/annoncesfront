import { Form, FormGroup, Label, Input, Button} from 'reactstrap';

function SignUp(){
    return(
        <div className='loginMaincontainer'>

         
            <Form inline>
            <FormGroup> 

                <Input
                    className="mb-3"
                    type="select"
                >
                    <option>
                    Ville
                    </option>
                </Input>

            </FormGroup>

            <FormGroup>
                <Input
                id="exampleNumber"
                name="number"
                placeholder="âge"
                type="number"
                />
            </FormGroup>


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
                    placeholder="Conifrm password"
                    type="mot de passe"
                    />
                </FormGroup>

                {' '}
                <Button>
                    S'inscrire
                </Button>
        </Form>
</div>
    )
}

export default SignUp;