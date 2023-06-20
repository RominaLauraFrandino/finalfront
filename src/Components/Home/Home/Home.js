
import {Link} from "react-router-dom";

import '../Home/Home.css';
import Logo from '../Home/Himagen/logo.png';
import Navegacion from "../../Navegacion/Navegacion";

export default function Home(){
    return(
        <div>
        <Navegacion/>
        <div className="container">
      <div className="background-container"> 
        <h1 className="title">Instituto Superior Villa del Rosario</h1>
        <p className="subtitle">¡Tu camino al éxito!</p>
        <img className="logo" src={Logo} alt="Logo del instituto" />
        
        
        <div id="inicio" className="section">
          <h2 className="section-title">Bienvenidos</h2>
          <p className="section-description">
            El Instituto Superior Villa del Rosario es una institución educativa comprometida con la formación de profesionales altamente capacitados en diversas áreas del conocimiento. Nuestro compromiso es brindar una educación de calidad y formar líderes en sus respectivos campos.
          </p>
        </div>
        <div id="carreras" className="section">
          <h2 className="section-title">Nuestras Carreras</h2>
          <ul className="section-list">
            <li>Técnico en molienda</li>
            <li>Técnico en desarrollo de software</li>
            <li>Técnico en alimentos</li>
          </ul>
        </div>
        <div id="admision" className="section">
          <h2 className="section-title">Admisión</h2>
          <p className="section-description">
            ¡Inscríbete en nuestras carreras y comienza tu camino al éxito! Ofrecemos un proceso de admisión sencillo y rápido. Puedes consultar los requisitos y llenar el formulario de solicitud en nuestro sitio web.
          </p>
        </div>
        <div id="contacto" className="section">
          <h2 className="section-title">Contacto</h2>
          <p className="section-description">
            Si tienes alguna pregunta o necesitas más información sobre nuestras carreras o el proceso de admisión, no dudes en ponerte en contacto con nosotros. Estaremos encantados de ayudarte.
          </p>
          <p className="section-contact">
            Teléfono: (123) 456-7890<br />
            Email: info@institutovilladelrosario.com<br />
            Dirección: Av. Principal #123, Villa del Rosario, Argentina
          </p>
        </div>
      </div>
    </div>
    </div>
    

               
    )
}