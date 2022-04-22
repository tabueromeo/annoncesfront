import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Form, FormGroup, Label, Input, Button} from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';

import config from '../config/config';

 class CreateModifAnnonce extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataForm : {},
            clogImageUpload : "",
            images:[],
            url:[],
        }
      
    }

    componentDidMount(){
       if(this.props.match.param){
           console.log(this.props)
       }else{
           console.log("ajout")
       }
    }

    handleChange = (e) =>{

        let name = e.target.name

        if (name === 'images') {
            let img = URL.createObjectURL(e.target.files[0])
            let imgUrl = e.target.files[0]
            let images = this.state.images
            let url = this.state.url
            images.push(img)
            url.push(imgUrl)
            this.setState({
               images,
               url,
            })
            console.log(images)
         }else{
            const dataFormTemp = this.state.dataForm
            dataFormTemp[e.target.name] = e.target.value
            this.setState({dataForm : dataFormTemp})
           // console.log(this.state.dataForm)
         }
       
    }

    

     handlesubmit = (e) =>{
        
        console.log(this.state.images)
        const formData = new FormData()
        if(this.state.url.length>0){
            formData.append('file', this.state.url[0])
        }
        
        formData.append('upload_preset', 'ksgff1pb')

        const option = {
            method : 'POST',
            body : formData,
        }


        axios.post(`https://api.cloudinary.com/v1_1/serpoma/image/upload`,  formData)
        .then(res => {
        
          let temp = this.state.dataForm
          temp['images'] = res.data.url
          // ajout de l'id utilisateur
          temp['iduser']=JSON.parse(localStorage.getItem('userid'))
          this.setState({ dataForm : temp })

          axios.post(config.SERVER+`/annonces/addannonce`,  this.state.dataForm )
        .then(res => {
           
           toast("Annonce ajoutée")
           this.props.history.push('/modifierannonces/')
        }).catch(erreur =>{
            alert("serveur indisponible")
            toast("Erreur interne, veuillez réessayer")                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
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
       const {dataForm} = this.state;
       
        return (
            <div>
                <div className="container-addannonce">
                <ToastContainer />
                    <div >
                        <div className="form-area">
                            <Form role="form">
                                <br/>
                                    <h3>Ajouter une annonce</h3>
                                    
                                    <FormGroup> 
                                    <Label>Catégorie</Label>
                                <Input
                                    className="mb-3"
                                    type="select"
                                    onChange={this.handleChange}
                                    name ="category"
                                >
                                    <option value={"1"}>
                                    1
                                    </option>
                                    <option value={"2"}>
                                    Douala
                                    </option>
                                    
                                </Input>

                                </FormGroup>
                                    <div className="form-group">
                                    <Label>Titre</Label>
                                    <Input type="text" className="form-control" name = "title" onChange ={this.handleChange} />
					                </div>
                                    <div className="form-group">
                                    <Label>Description</Label>
                                    <textarea className="form-control" type="textarea" rows="7" name = "description" onChange ={this.handleChange}/>
                                    </div>
                                
                                    <div>
                                        <div className="row row-cols-md-4 form-group  ">
                  {this.state.images.length > 0 || this.state.images.length < 4
                     ? this.state.images.map((image, index) => (
                          <div key={index} className="col mt-4">
                             <img
                                src={image}
                                alt=""
                                className="img-responsive img-thumbnail"
                                id="img-tache"
                             />
                          </div>
                       ))
                     : null}
               </div>
               {this.state.images.length < 4 ? (
                  <div >
                     <div className="form-group col mt-3">
                        <div>
                           <label
                              className="btn btn-primary"
                              htmlFor="img"
                              type="button"
                           >
                              Entrer une image
                              <Input
                                 type="file"
                                 onChange={this.handleChange}
                                 id="img"
                                 className="form-control"
                                 hidden
                                 name="images"
                              />
                           </label>
                        </div>
                     </div>
                  </div>
               ) : null}
                                    </div>
                                    
                                    <Button  name="submit" onClick={this.handlesubmit} className="buton-submit-annonce">Publier</Button>
                           
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateModifAnnonce;
