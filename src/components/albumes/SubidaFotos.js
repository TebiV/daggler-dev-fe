import React,{useState, useEffect} from 'react';
import '../../css/SubidaFotos_css.css'
import Slider from "react-slick";



const SubidaFotos = () => {


    //*State de fotos
    const [fotos, setFotos] = useState([])

    const [preview_urls, set_preview_urls] = useState([]);
    const handleChange = (e: React.ChangeEvent) => {
    set_preview_urls((prev) =>
      prev.concat(
        Array.from(e.target.files ?? []).map((f) =>
          window.URL.createObjectURL( f )
                )
            )
        );
    };
  useEffect(() => {
    return () => {
      preview_urls.forEach((url) => window.URL.revokeObjectURL(url));
    };
  }, []);

    var settings = {
        dots: true,
        infinite: false,
        speed: 100,
        slidesToShow: 5,
        slidesToScroll: 15,
        centerMode: true,
        focusOnSelect: true,
        swipeToSlide:true
        
    };

    return ( 
        <div className="container-fluid">

            <div className="row">
                <h3>SUBIR FOTOS</h3>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-3">

                    <label className="inputFotos" htmlFor="inputFotos">+</label>
                    <input
                        type="file"
                        id="inputFotos"
                        multiple
                        onChange={handleChange}
                        accept=".png, .jpg, .raw"
                    />

                </div>
                <div className="col-xs-12 col-md-9">
                    <Slider {...settings} className="mx-4">
                        {preview_urls.map((url) => (
                        <div>
                            <img key={url} src={url} alt="" className="preview"></img>
                        </div>
                    ))}
                    </Slider>
                </div>
            </div>

            <div className="row">

            </div>
            <div className="row"></div>
        </div>
     );
}
 
export default SubidaFotos;