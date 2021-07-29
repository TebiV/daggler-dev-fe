import React from 'react';
import '../../css/Album_css.css'
import disableScroll from 'disable-scroll';


const Album = ({album,setPedirPass}) => {

    const {cover,_id,name,category,password,download,purchase,date} = album;
    
    //Pide la contrasenia
    const handleClick = () =>{
        setPedirPass({
            isActive:true,
            album:album
        })
        disableScroll.on()
    }
    return ( 
        <>
            <div className="col-xs-12 col-md-3  px-0">
                <div className="album" onClick={handleClick}>
                    <div className="title">{name}</div>
                    <img src={cover} alt={name} className="imagen"></img>
                    
                </div>
            </div>
        </>
     );
}
 
export default Album;