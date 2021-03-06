import React, { useContext, useState } from 'react';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { LOGIN_ROUTE, REGISTRATION_ROUTE,  SHOP_ROUTE} from '../utils/consts';
import {NavLink, useLocation, useHistory} from "react-router-dom";
import { registration, login } from '../http/userAPI';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBasketDevices} from '../http/deviceAPI'

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation();
    const history = useHistory();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const click = async () => {
        try {
            let data;
            if(isLogin) {
                data = await login(email, password);

                if(data.role === 'ADMIN') {
                    user.setAdmin(true)
                } else {
                    user.setAdmin(false)
                }
                user.setId(data.id)
            } else {
                data = await registration(email, password);

                if(data.role === 'ADMIN') {
                    user.setAdmin(true)
                } else {
                    user.setAdmin(false)
                }
                user.setId(data.id)
            }
            
                user.setId(data.id)
                user.setUser(user)
                user.setIsAuth(true)
                history.push(SHOP_ROUTE)
                fetchBasketDevices(user.userId).then(data => {
                    user.setBasketDevice(data)
                 })
            } catch (e) {
                alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 200} }
        >
            <Card style={{width: 600, border: "2px solid gray", borderRadius: "9px"}} className="p-5">
                <h2 className="m-auto">{isLogin ? "??????????????????????" : "??????????????????????"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-2"
                        placeholder="?????????????? ?????? email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <Form.Control
                        className="mt-2"
                        placeholder="?????????????? ?????? ????????????..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                    />

                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ? 
                            <div>
                                ?????? ????????????????? <NavLink to={REGISTRATION_ROUTE}>??????????????????????????????????!</NavLink>
                            </div>
                            :
                            <div>
                                ???????? ??????????????? <NavLink to={LOGIN_ROUTE}>??????????????!</NavLink>
                            </div>
                        }                    

                        <Button
                        variant={"outline-success"}
                        onClick = {click}
                        >
                            {isLogin ? "??????????" : "??????????????????????"}
                        </Button>
                    </Row>
                </Form>
            </Card>

        </Container>
    );
});

export default Auth;