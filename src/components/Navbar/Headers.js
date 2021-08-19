import React,  {useReducer} from 'react'
import {Navbar, Nav, Container, Button} from 'react-bootstrap'
import Logo from '../../assets/Logo.svg'
import LoginModal from '../Modal/LoginModal';
import RegisterModal from '../Modal/RegisterModal';

function Headers() {
   const initialState = {
      modalLogin: false,
      modalRegister: false
   };

   function reducer(state, action) {
      switch (action.type) {
        case 'showModalL':
          return {modalLogin: true};
        case 'showModalR':
          return {modalRegister: true};
        case 'hideModalL':
          return {modalLogin: false};
        case 'hideModalR':
          return {modalRegister: false};
        case 'switchModal':
          return {
             modalRegister: !state.modalRegister,
             modalLogin: !state.modalLogin,
         };
        default:
          throw new Error();
      }
    }

   const [state, dispatch] = useReducer(reducer, initialState);
//    const [showLogin, setShowL] = useState(false);
//    const [showRegister, setShowR] = useState(false);

//   const handleCloseL = () => setShowL(false);
//   const handleShowL = () => setShowL(true);
//   const handleCloseR = () => setShowR(false);
//   const handleShowR = () => setShowR(true);
   return (
      <>
      <Navbar collapseOnSelect expand="lg">
         <Container>
            <Navbar.Brand href="#home"><img src={Logo} alt="..." width="60px" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
               <Nav className="me-auto">
               </Nav>
               <Nav>
                  <Nav.Link><Button variant="outline-danger" size="sm" onClick={()=>dispatch({type:'showModalL'})}>Login</Button></Nav.Link>
                  <Nav.Link><Button variant="danger" size="sm" className="bg-overide" onClick={()=>dispatch({type:'showModalR'})}>Register</Button></Nav.Link>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
      <LoginModal handleClose={()=>dispatch({type:'hideModalL'})} switchModal={()=>dispatch({type:'switchModal'})} show={state.modalLogin} />
      </>
   )
}

export default Headers
