import React, { useState } from "react";
import axios from 'axios'
import "../../../css/BackgroundConfig_css.css";
import { apiUploadBackground } from "../../apis/apis";
import { useSelector } from "react-redux";

const BackgroundConfigContainer = () => {
	const [background, setBackground] = useState();
	const [showcaseImg, setShowcaseImg] = useState();

	const handleChange = (e) => {
		try {
			setShowcaseImg(URL.createObjectURL(e.target.files[0]));
		} catch {
			setShowcaseImg(null);
		}
		setBackground(e.target.files[0]);
	};

    const token = useSelector(state => state.tokenReducer);
    
    const handleSubmit = () =>{
        const headers = {
            'Authorization': `${token}`
        };
        
        if(background){
            const formData = new FormData()
            formData.append('image', background)
            axios.put(apiUploadBackground,formData,{headers})
        }
    }
	return (
		<div className="col-12 col-md-6 d-flex flex-column justify-content-end ">
			<div className="background-config-container__div  p-0 bottom-squared">
				<input
					className="background-config-container__input"
					type="file"
					name="background"
					id="background"
					onChange={handleChange}
                    accept="image/*"
				/>
				<label htmlFor="background" className="background__label"></label>
				{showcaseImg ? (
					<div className="background-showcase__div mx-0 px-0 bottom-squared">
						<img src={showcaseImg} alt="" className="background-showcase__img mx-0 px-0 bottom-squared"/>
					</div>
				) : (
					<div className="d-flex justify-content-center align-items-center plus-background bottom-squared">
						<i className="bi bi-plus"></i>
					</div>
                    
				)}
			</div>
            {showcaseImg
                ?
            <button type="submit" className="btn-inferior btn w-100 btn-primary mb-3" onClick={handleSubmit}>Enviar</button>
                :
            <button type="submit" className="btn-inferior btn w-100 btn-primary mb-3" disabled>Enviar</button>
            }
		</div>
	);
};

export default BackgroundConfigContainer;
