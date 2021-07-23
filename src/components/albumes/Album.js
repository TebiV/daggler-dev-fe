import React from 'react';
import '../../css/Album_css.css'


const Album = ({album,setPedirPass}) => {

    const {cover,_id,name,category,password,download,purchase,date} = album;

    const handleClick = () =>{
        setPedirPass({
            isActive:true,
            album:album
        })
    }
    return ( 
        <>
            <div className="col-xs-12 col-md-auto mb-3">
                <div className="album" onClick={handleClick}>
                    <div className="title">{name}</div>
                    <img src={cover} alt={name} className="imagen"></img>
                    
                </div>
            </div>
        </>
     );
}
 
export default Album;