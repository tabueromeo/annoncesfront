
import react, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { UncontrolledCarousel } from 'reactstrap';
import CallComponent from './CallComponent';
import axios from 'axios';
import config from "../config/config";


function AnnonceDetail(){
    let params = useParams()

const [annonce,setArray] = useState({})

const [annonceSend,setannonceSend] = useState({})
    
    const updateNberVueAnnonce =(annoncetmp)=>{
    
    annoncetmp["nbervue"] = ""+(parseInt(annoncetmp.nbervue)+1)


    axios.post(config.SERVER+`/annonces/update`,  annoncetmp )
    .then(res => {

    }).catch(erreur =>{
        
        console.log(erreur);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    }) 

    }


    useEffect(() => {
        axios.get(config.SERVER+`/annonces/one?id=`+params.id)
              .then(res => {
                
                let tmps = res.data
                setannonceSend(tmps)
                
                // mise à jour du nombre de vue
                    
                updateNberVueAnnonce(tmps)

// début traitement de l'image
console.log(tmps.images)
               const tabimages= tmps.images.split('==')
               let imagesAllTab = []
               
                if(tmps.images.length>1){
                for (let index = 0; index < tabimages.length; index++) { 
                let tempsobject = {
                    key:index,
                    src:config.rezisecarrousel+tabimages[index]
                }
                imagesAllTab.push(tempsobject)
               };             
            }else{
                let tempsobject = {
                    key:0,
                    src:config.rezisecarrousel+config.defaultlovonsimage
                }
                imagesAllTab.push(tempsobject)
                
            }
               tmps = {
                   ...tmps,
                   images:imagesAllTab

               }
               console.log(tmps)
            // fin traitement de l'image
                setArray(
                  tmps
                )



                
              }).catch(erreur =>{
                //alert("serveur indisponible")
                console.log(erreur);
            })
      },[]);


console.log(annonce.images)

    return(
        <div className='annonceDetailContainer'>
            <div className='annonceDetailItem'>   

            <div className='entetePageDetail'>
            <div className='annonceDetailItemCarroussel'>
                <UncontrolledCarousel
                items={annonce.images?annonce.images:[config.wareframeParagraph]}
                />

            </div>    
            <div className='callBoxDetailRight'>
                <CallComponent annonce ={annonce} annonceSend = {annonceSend}/>
            </div>
           

            </div>

    </div>

    </div>

    )
}

export default AnnonceDetail