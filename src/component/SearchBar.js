import { Form, Input } from "reactstrap";
import axios from "axios";
import config from "../config/config";

function SearchBar() {
	return (
		<Form className="formulaire_entete">
			<Input className="mb-3" placeholder="default" />

			<Input className="mb-3" type="select">
				<option>Catégories 1</option>
				<option>Catégories 2</option>
			</Input>

			<Input className="mb-3" type="select">
				<option>Yaoundé</option>
				<option>Douala</option>
			</Input>
		</Form>
	);
}

export default SearchBar;
