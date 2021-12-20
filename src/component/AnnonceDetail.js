
import react from 'react';
import { UncontrolledCarousel } from 'reactstrap';

function AnnonceDetail(){

    return(
        <div className='annonceDetailContainer'>
       <div className='annonceDetailItem'>
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

    </div>

    )
}

export default AnnonceDetail