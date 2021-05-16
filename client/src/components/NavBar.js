import React, { useContext } from 'react';
import { Context } from '../index';
//import UserStore from '../store/UserStore';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {NavLink} from 'react-router-dom';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import {Button, Container, Image} from 'react-bootstrap';
import {observer} from 'mobx-react-lite';
import {useHistory} from 'react-router-dom';
import basketImg from '../assets/basket2.png';

const NavBar = observer(() => {
    const {user} = new useContext(Context);
    const {device}  = useContext(Context);
    const history = useHistory();

    const logOut = () => {
        device.setBasketDevice(null);
        user.setUser({});
        user.setIsAuth(false)
        user.setAdmin(false)
        localStorage.clear();
    }

    return (
    <Navbar bar bg="dark" variant="dark">
        <Container>
            <NavLink style={{color: 'white', fontSize: 30}} to={SHOP_ROUTE}>KuPiK</NavLink>
            {(user.isAuth) ? 
                (user.isAdmin) ?
                <Nav className="ml-auto" style={{color:'white'}}>
                    <Button 
                        variant={"outline-light"} 
                        onClick={() => history.push(ADMIN_ROUTE)}
                    >
                        Админ панель 
                    </Button>

                    <Button 
                        variant={"outline-light"} 
                        onClick={() => logOut()} 
                        className="ml-2"
                    >
                        Выйти
                    </Button> 
                </Nav>
                :
                <Nav className="ml-auto" style={{color:'white'}}>
                        <Button 
                        variant={"outline-light"} 
                        onClick={() => history.push(BASKET_ROUTE)}
                        > 
                        <Image width={30} height={30} src={basketImg}/>
                        </Button>
                

                <Button 
                    variant={"outline-light"} 
                    onClick={() => logOut()} 
                    className="ml-2"
                >
                    Выйти
                </Button> 
            </Nav>
                :
                <Nav className="ml-auto" style={{color:'white'}}>
                    <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button> 
                </Nav>
            }   
        </Container>
    </Navbar>
    );
});

export default NavBar;