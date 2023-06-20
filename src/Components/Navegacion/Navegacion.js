import {Link} from"react-router-dom";
import './Navegacion.css';
export default function Navegacion() {
    return(
        <header className="style">            
            <nav className='navbar navbar-expand-lg  w-100 '>
                <div className='container-fluid'>
                <Link to="/"className='nav-link tamano' aria-current="page" >Instituto Superior Villa del Rosario</Link> 
                    <ul className='navbar-list'>
                        <li className='navbar-item'>
                            
                            <Link to="/"className='nav-link boton' aria-current="page" >Home</Link> 
                        </li>
                        
                        <li className='navbar-item'>
                        
                        <Link to="/login"className='nav-link boton' aria-current="page" >Login</Link> 
                        </li>
                        
                       
                    </ul>
               
                </div>
</nav>
        </header>
            )
}