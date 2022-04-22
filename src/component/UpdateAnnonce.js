import react, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader, Image, Segment } from 'semantic-ui-react'
import config from "../config/config";
import { ToastContainer, toast } from 'react-toastify';
import { Form, FormGroup, Label, Input, Button} from 'reactstrap';

function UpdateAnnonce(){
    let params = useParams()
    let navigate = useNavigate();

const [annonce,setArray] = useState({})

const [dataForm,setdataForm] = useState({})

    
    useEffect(() => {
        axios.get(config.SERVER+`/annonces/one?id=`+params.id)
              .then(res => {
                  console.log(res.data)
                const tmps = res.data
                setArray(
                  tmps
                )
                setdataForm(tmps)
              }).catch(erreur =>{
                //alert("serveur indisponible")
                console.log(erreur);
            })
      },[]);

    const handleChange =(e)=>{
 
         const dataFormTemp = dataForm
             dataFormTemp[e.target.name] = e.target.value
             setdataForm({
                 ...dataForm,
                 [e.target.name] :e.target.value
                })    
             
     }
 
     
 
     function handlesubmit (e){
         let dataFormTemp = {...dataForm}
         console.log(dataFormTemp)
    
           axios.post(config.SERVER+`/annonces/update`,  dataFormTemp )
         .then(res => {
            
            toast("Annonce modifiée")
            navigate("/modifierannonces/");
         

         }).catch(erreur =>{
             alert("serveur indisponible")
             console.log(erreur);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
         }) 
    
 
       e.preventDefault() 
     }




    return(
        <div className="container-addannonce">
                <ToastContainer />

                {annonce.title? (<div >
                        <div className="form-area">
                            <Form role="form">
                                <br/>
                                    <h3>Ajouter une annonce</h3>
                                    
                                    <FormGroup> 
                                    <Label>Catégorie</Label>
                                <Input
                                    className="mb-3"

                                    type="select"
                                    onChange={handleChange}
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
                                    <Input type="text" className="form-control" value = {dataForm.title} name = "title" onChange ={handleChange} />
					                </div>
                                    <div className="form-group">
                                    <Label>Description</Label>
                                    <textarea className="form-control" type="textarea" rows="7" name = "description" value = {dataForm.description} onChange ={handleChange}/>
                                    </div>
                                
                                  
                                    
                                    <Button  name="submit" onClick={handlesubmit} className="buton-submit-annonce">Publier</Button>
                           
                            </Form>
                        </div>
                    </div>):(  <Segment>
    <Loader disabled />

    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
  </Segment>)}
                    
                </div>
         

    )
               }

export default UpdateAnnonce;