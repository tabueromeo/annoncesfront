import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import { Form, FormGroup, Label, Input, Button,Spinner} from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

import config from '../config/config';
import CustomSpinner from './addons/SpinnerModal'

 class CreateModifAnnonce extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataForm : {},
            clogImageUpload : "",
            images:[],
            url:[],
            modalIsOpen:false,
        }

          
      
    }

  

    handleChange = (e) =>{

        let name = e.target.name

        if (name === 'images' && e.target.files) {
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

    

handlesubmit = async (e) =>{
        
    this.openModal()
    
    let urlimage='';
    for (let index = 0; index < this.state.url.length; index++) {

        const url1 = this.state.url[index];
        let formData = new FormData()
        
        formData.append('file', url1)
                
        formData.append('upload_preset', 'ksgff1pb')

        
        const resp =  await  axios.post(`https://api.cloudinary.com/v1_1/serpoma/image/upload`,  formData)

        if(index==0){
            urlimage = resp.data.url;
        }else{
            urlimage = urlimage+'=='+resp.data.url;
        }
        
    }

          let temp = this.state.dataForm
          temp['images'] = urlimage
          // ajout de l'id utilisateur
          temp['iduser']=JSON.parse(localStorage.getItem('userid'))
          this.setState({ dataForm : temp })
          console.log(this.state.dataForm)

         
          axios.post(config.SERVER+`/annonces/addannonce`,  this.state.dataForm )
            .then(res => {
                this.closeModal()
                console.log(res)
                toast("Annonce ajoutée")
               // this.props.history.push('/modifierannonces/')
            
            }).catch(err =>{
               // alert("serveur indisponible")
               console.log(err)
                toast("Erreur interne, veuillez réessayer")                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
            })      
        

      e.preventDefault() 
    }


    handleDeleteimage = (e)=>{
      
        let nameimg = e.target.name

        let imagestmp = this.state.images;
        let urltemps = this.state.url;

      let imagesout =  imagestmp.filter(function(val,index,arr){
            return index!=nameimg
        })

        let urlout =  urltemps.filter(function(val,index,arr){
            return index!=nameimg
        })


       this.setState({
        images:imagesout,
        url:urlout
       })


    }
     openModal() {
        this.setState({
            modalIsOpen:true
        })
      }
    
     closeModal() {
        this.setState({
            modalIsOpen:false
        })
      }
      afterOpenModal() {
      }
     
    
     



   render() {
       const {dataForm,modalIsOpen} = this.state;
       console.log(this.props.usertype)
       Modal.setAppElement('#root');

        return (
            <div>
                <div className="container-addannonce">
                <ToastContainer />
                    <div >
                        <div className="form-area">
                            <Form role="form">
                                <br/>
                                    <h3 style={{color:"#ee3f89"}}>Ajouter une annonce</h3>
                                    
                                    <FormGroup> 
                                    <Label>Catégorie</Label>
                                <Input
                                    className="mb-3"
                                    type="select"
                                    onChange={this.handleChange}
                                    name ="category"
                                >
                                    <option >
                                    {"Selectionnez une catégorie"}
                                    </option>
                                    <option value={config.title.tesc}>
                                    {config.title.tesc}
                                    </option>
                                    <option value={config.title.thot}>
                                    {config.title.thot}
                                    </option>
                                    <option value={config.title.tsoir}>
                                    {config.title.tsoir}
                                    </option>
                                    <option value={config.title.tmas}>
                                    {config.title.tmas}
                                    </option>
                                    <option value={config.title.tproduit}>
                                    {config.title.tproduit}
                                    </option>
                                    
                                </Input>

                                </FormGroup>

                                <FormGroup> 
                                    <Label>Ville</Label>
                                <Input
                                    className="mb-3"
                                    type="select"
                                    onChange={this.handleChange}
                                    name ="ville"
                                >
                                    <option >
                                    {"Selectionnez votre ville"}
                                    </option>
                                    <option value={config.ville.douala}>
                                    {config.ville.douala}
                                    </option>
                                    <option value={config.ville.yaounde}>
                                    {config.ville.yaounde}
                                    </option>
                                 
                                    
                                </Input>

                                </FormGroup>


                                <FormGroup> 
                                <Label>Cherche</Label>
<Input
    className="mb-3"
    type="select"
    onChange={this.handleChange}
    name ="cherche"
>
<option >
                                    {"Selectionnez"}
                                    </option>
    <option value={config.cherche.femme}>
    {config.cherche.femme}
    </option>
    <option value={config.cherche.homme}>
    {config.cherche.homme}
    </option>
    
    <option value={config.cherche.couple}>
    {config.cherche.couple}
    </option>

</Input>

</FormGroup>


                                    <div className="form-group">
                                    <Label>Titre</Label>
                                    <Input type="text" className="form-control" name = "title" maxLength={config.inputTextTitlemaxLength} onChange ={this.handleChange} />
					                </div>
                                    <div className="form-group">
                                    <Label>Description</Label>
                                    <textarea className="form-control" type="textarea" rows="7" name = "description" maxLength={config.inputTextDescriptionmaxLength} onChange ={this.handleChange}/>
                                    </div>
                                
                                    <div>
                                        <div className="row row-cols-md-4 form-group  ">
                  {this.state.images.length > 0 || this.state.images.length < 4
                     ? this.state.images.map((image, index) => (
                          <div key={index} className="col mt-4">
                              <Button close name = { index}onClick={this.handleDeleteimage} />
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

                <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                         style={customStyles}
                               
                    >
                    
                           <CustomSpinner/>

                    
                    
                    </Modal>
            </div>
        )
    }
}

export default CreateModifAnnonce;

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: 'nonce',
      border:'none',
    },
  };