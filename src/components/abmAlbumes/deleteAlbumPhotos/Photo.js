import React, { useState } from 'react'
import '../../../css/DeleteAlbumPhotos_css.css'
const Photo = (props) => {

    const [selected, setSelected] = useState(false);

    function handleImg() {
        if (!selected) {
            props.select(props.photo)
        } else {
            props.unselect(props.photo)
        }
        setSelected(!selected)
    }
    return <>
        <div className="col-md-3 col-xl-2 col-4 p-1" style={{ position: 'relative' }}>
            <div className={selected ? 'delete-photo_border-highlight' : 'delete-photo_border'}>
                <button className="delete-photo_button-expand" onClick={()=>props.maximize(props.photo.urlMax)}>
                    <i className="bi bi-arrows-fullscreen" />
                </button>

                <img className="img-delete-photo " src={props.photo.urlMin} alt={props.photo.name} onClick={handleImg} />
            </div>
        </div>
    </>
}

export default Photo;