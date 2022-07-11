
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
    
    useEffect(() => {
        axios.get(config.SERVER+`/annonces/one?id=`+params.id)
              .then(res => {
                
                let tmps = res.data
                setannonceSend(tmps)
                    
                

// début traitement de l'image
               const tabimages= tmps.images.split('==')
               let imagesAllTab = []
               
                console.log(tabimages)
                for (let index = 0; index < tabimages.length; index++) { 
                let tempsobject = {
                    key:index,
                    src:config.rezisecarrousel+tabimages[index]
                }
                imagesAllTab.push(tempsobject)
               };             

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

    return(
        <div className='annonceDetailContainer'>
            <div className='annonceDetailItem'>   

            <div className='entetePageDetail'>
            <div className='annonceDetailItemCarroussel'>
                <UncontrolledCarousel
                items={annonce.images?annonce.images:[]}
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