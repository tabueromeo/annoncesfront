import { Form, Input} from 'reactstrap';

function SearchBar(){

    return (
<Form className='formulaire_entete'>

  <Input
    className="mb-3"
    placeholder="default"
  />
 

  <Input
    className="mb-3"
    type="select"
  >
    <option>
      Catégories
    </option>
  </Input>


  <Input
    className="mb-3"
    type="select"
  >
    <option>
      Cameroun
    </option>
    <option>
      Ville
    </option>
  </Input>

</Form>
    )
}

export default SearchBar;