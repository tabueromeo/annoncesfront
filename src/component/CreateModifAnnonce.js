import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

 class CreateModifAnnonce extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataForm : {},
            clogImageUpload : "",
        }
    }

    handleChange = (e) =>{
        const dataFormTemp = this.state.dataForm
        dataFormTemp[e.target.name] = e.target.value
        this.setState({dataForm : dataFormTemp})
        console.log(this.state.dataForm)
    }
    handleChangeImage = (e) =>{
        let imageTemp = URL.createObjectURL(e.target.files[0])
        this.setState({clogImageUpload : e.target.files[0]})
        const dataFormTemp = this.state.dataForm
        dataFormTemp["photo"] = imageTemp
        this.setState({dataForm:dataFormTemp})
        console.log(this.state.clogImageUpload)  
        
    }

     handlesubmit = (e) =>{
        
        console.log(this.state.clogImageUpload)
        const formData = new FormData()

        formData.append('file', this.state.clogImageUpload)
        formData.append('upload_preset', 'yaya12')

        const option = {
            method : 'POST',
            body : formData,
        }


        axios.post(`https://api.cloudinary.com/v1_1/dbcjapvf8/image/upload`,  formData)
        .then(res => {
          console.log(res.data);
          let temp = this.state.dataForm
          temp['photo'] = res.data.url
          this.setState({ dataForm : temp })
          axios.post(`http://178.62.79.111:5000/annonces/addannonce`,  this.state.dataForm )
        .then(res => {
            console.log(res.data)
           //this.setState({ clog : res.data})
        }).catch(erreur =>{
            alert("serveur indisponible")
            console.log(erreur);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        }) 
        }).catch(erreur =>{
          //alert("serveur indisponible")
          console.log(erreur);
      })
      
        
        

      e.preventDefault() 
    }
    
    componentDidMount() {
        console.log(this.props)
      //  const id = this.props.match.params.id
        
    }
    

   render() {
        return (
            <div>
                <div className="container">
                    <div className="col-md-5">
                        <div className="form-area">
                            <form role="form">
                                <br/>
                                    <h3>INFO ANNONCE</h3>
                                    <div className="form-group">
                                    <label>Catégorie</label>
                                    <select id="pet-select" name ="category" onChange ={this.handleChange}>
                                        <option value = "1">1</option>   
                                        <option value ="2">2</option>   
                                        <option value ="3">3</option>   
                                    </select>
					                </div>
                                    <div className="form-group">
                                    <label>Libellé</label>
                                    <input type="text" className="form-control" name = "wording" onChange ={this.handleChange} />
					                </div>
                                    <div className="form-group">
                                    <label>description</label>
                                    <textarea className="form-control" type="textarea"  maxlength="140" rows="7" name = "description" onChange ={this.handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Nombre de poste</label>
                                        <input type="number" className="form-control" name = "postNumber " onChange ={this.handleChange} />
					                </div>
                                    <div>
                                        <input type = "file" accept = "image" onChange = {this.handleChangeImage} name = "photo" />
                                        {(this.state.dataForm['photo'] !== null)&&<div>
                                            <img src = {this.state.dataForm['photo']} width = "100px" height ="100px"/>
                                           {
                                               <button className = "btn btn-danger" onClick = {() => {
                                                this.setState({image : null})
                                            }}>X</button>
                                           }
                                        </div>}
                                    </div>
                                    <button type="button" id="submit" name="submit" className="btn-envoie" onClick={this.handlesubmit}>Submit Form</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateModifAnnonce;
