import React from "react";
import ProjectModify from "./ProjectModify";
import "../../../css/Project_css.css";

const ProjectsContainer = ({setMostrarModal}) => {
	return (
		<div className="col-12 col-md-4 project-selects-container__div">
            <form>
			<div className="container">
				<div className="row ">
					<div className="d-flex justify-content-end pt-3 pe-0">
						<select className="form-control w-25 ">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
						</select>
					</div>
				</div>
				<div className="row py-3">
					<div className="col-12 project__div px-0 bottom-squared">
						<button type="button" className="plus-fs-button bottom-squared" onClick={()=>{setMostrarModal(true)}}><i className="bi bi-plus plus-project "></i></button>
                        
					</div>
                    <button type="submit" className="btn-inferior btn w-100 btn-primary">Enviar</button>
				</div>
			</div>
            </form>
		</div>
	);
};

export default ProjectsContainer;
