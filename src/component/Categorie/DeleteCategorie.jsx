import { Component } from "react";
import { Navigate } from "react-router-dom";
import { cherche } from "../../config/config";

class DeleteCategorie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isRedirect: false,
			id: 1,
		};
	}

	componentDidMount() {
		const id = this.state.id;
		console.log(id);
	}
	render() {
		if (this.state.isRedirect) {
			return <Navigate to="/admin/categorie" />;
		}
		return <h1>Suppression d'une categorie </h1>;
	}
}
export default DeleteCategorie;
