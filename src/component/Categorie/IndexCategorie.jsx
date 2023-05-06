import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import  config  from "../../config/config";
import axios from "axios";

class IndexCategorie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [{}],
		};
	}

	componentDidMount() {
		axios.get(config.SERVER + "/category/read").then((res) => {
			this.setState({
				categories: res.data,
			});
		});
	}
	render() {
		return (
			<div>
				<h1 className="text-center">Affichage des Catégories</h1>
				<table className="table col-11 mx-auto table-borderless text-center mt-4">
					<thead>
						<tr>
							<th>Nom de la catégorie</th>
							<th>Description</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{this.state.categories.map(({ _id, name, description }, index) => {
							return (
								<tr key={index}>
									<td>{name}</td>
									<td>{description}</td>
									<td className="d-flex">
										<Link to={"/admin/categorie/" + _id + "/edit"}>
											<button
												type="button"
												className="btn btn-outline-primary mr-4"
											>
												Modifier
											</button>
										</Link>
										<Link to={"/admin/categorie/" + _id + "/delete"}>
											<button type="button" className="btn btn-outline-danger">
												Supprimer
											</button>
										</Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default IndexCategorie;
