
import react, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { UncontrolledCarousel } from 'reactstrap';
import CallComponent from './CallComponent';
import axios from 'axios';
import config from "../config/config";

function AnnonceDetail(){
    let params = useParams()

const [annonce,setArray] = useState({})

    
    useEffect(() => {
        axios.get(config.SERVER+`/annonces/one?id=`+params.id)
              .then(res => {
                  console.log(res.data)
                const tmps = res.data
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
                items={[
                    {

                    key: 1,
                    src: config.rezisecarrousel+ annonce.images
                    },
                    {
            
                    key: 2,
                    src: 'https://picsum.photos/id/456/1200/600'
                    },
                    {
                    key: 3,
                    src: 'https://picsum.photos/id/678/1200/600'
                    }
                ]}
                />

            </div>    
            <div className='callBoxDetailRight'>
                <CallComponent annonce ={annonce}/>
            </div>
           

            </div>

    </div>

    </div>

    )
}

export default AnnonceDetail