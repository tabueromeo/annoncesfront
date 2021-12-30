import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react'
import  { Navigate } from 'react-router-dom'
class AddCategorie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category: {
                name: '',
                description: '',
                createdAt: '',
                updatedAt: ''
            },
            isRedirect: false
        }
    }

    handleChange = event => {
        let categoryTemp = this.state.category
        categoryTemp[event.target.name] = event.target.value
        this.setState({
            category: categoryTemp
        })
    }
    handleSubmit = event => {
        const category = this.state.category
        axios.post('http://178.62.79.111:5000/category/addcategory', category)
            .then(res => {
                this.setState({
                    isRedirect : true
                })
            }).catch(error => {
                console.log(error);
            })
        event.preventDefault()
    }
    render() {
        if (this.state.isRedirect) {
            return <Navigate to="/admin/categorie" />
        }
        return (
            <div>
                <h1 className="text-center mx-4">Creaction d'une categorie</h1>
                <form className="m-auto col-4" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nom</label>
                        <input type="text" required value={this.state.category.name} onChange={this.handleChange} name="name" id="name" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea className="form-control" required value={this.state.category.description} onChange={this.handleChange} name="description" id="description" rows="4"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Ajouter</button>
                </form>
            </div>
        )
    }
}
export default AddCategorie;