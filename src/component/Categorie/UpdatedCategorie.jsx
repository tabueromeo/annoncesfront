import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react'
import { Navigate } from 'react-router-dom';
class UpdatedCategorie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category: {
                name: '',
                description: '',
                createdAt: '',
                updatedAt: ''
            },
            isRedirect: false,
            id: 1
        }
    }
    componentDidMount() {
        const id = this.state.id
        
    }
    handleChange = event => {
        let categoryTemp = this.state.category
        categoryTemp[event.target.name] = event.target.value
        this.setState({
            category: categoryTemp
        })
    }
    handleSubmit = event => {
        let category = this.state.category

        event.preventDefault()
    }
    render() {
        if (this.isRedirect) {
            return <Navigate to="/admin/categorie" />
        }
        return (
            <div>
                <h1 className="text-center mb-4">Modification de la categorie {this.state.category.name}</h1>
                <form className="m-auto col-4" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nom</label>
                        <input type="text" required value={this.state.category.name} onChange={this.handleChange} name="name" id="name" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea className="form-control" required value={this.state.category.description} onChange={this.handleChange} name="description" id="description" rows="4"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Modifier</button>
                </form>
            </div>
        )
    }
}
export default UpdatedCategorie;