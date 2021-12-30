
import react from 'react';
import { useParams } from 'react-router-dom';
import { UncontrolledCarousel } from 'reactstrap';
import CallComponent from './CallComponent';

function AnnonceDetail(){
    let params = useParams()
    console.log(params.index)

    return(
        <div className='annonceDetailContainer'>
            <div className='annonceDetailItem'>   

            <div className='entetePageDetail'>
            <div className='annonceDetailItemCarroussel'>
                <UncontrolledCarousel
                items={[
                    {

                    key: 1,
                    src: 'https://picsum.photos/id/123/1200/600'
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
                <CallComponent/>
            </div>
           

            </div>

    </div>

    </div>

    )
}

export default AnnonceDetail