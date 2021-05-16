import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Context } from '../index';
import bigStar from '../assets/bigStar.png'
import pencl from '../assets/pencl.png'
import cros from '../assets/cros.png'
import { fetchOneDevice, deleteOneDevice, updatePrice, addToBasket } from '../http/deviceAPI';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';


const DevicePage = observer(() => {
    const [device, setDevice] = useState({info: []})
    const [isEditing, setEditing] = useState(false);
    const {id} = useParams()
    const {user} = useContext(Context);
    const history = useHistory();
    console.log(user.userId);
    useEffect(() => {
        fetchOneDevice(id).then(data => {setDevice(data); console.log(data)})
    }, [])

    const deleteDevice = async () => {
        try {
            history.push(SHOP_ROUTE);
            await deleteOneDevice(id);
            window.location.reload();
            alert("Товар удален!")
        } catch(e) {
            alert(e)
        }
    }
    // updatePrice(device.id, e.target.value)
    // const updatePrices =  () => {
    //       updatePrice(57, 777)
    // }
    const set = () => {
        setEditing(true)
    }

    return (
        <Container className="mt-3">
           <Row>
            <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <div 
                            className="d-flex align-items-center justify-content-center"
                            style={{background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64}}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width:300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <Row>
                            От:  
                            {
                                isEditing ? 
                                <Form.Control
                                    className="mt-2"
                                    placeholder={device.price}
                                    style={{width: 130}}
                                    onBlur={e => {updatePrice(id, e.target.value) 
                                                  setEditing(false)
                                                  window.location.reload()}}
                                    
                                />
                                :
                                <strong style={{marginLeft: 12, marginRight: 12}}> {device.price} </strong>
                            }
                            
                            руб.
                            
                            {   user.isAdmin && (
                                isEditing ?
                                <Image width={20} height={20} src={cros} onClick={() => setEditing(false)} style={{cursor: 'pointer'}} />
                                :
                                <Image width={20} height={20} onClick={set} src={pencl} style={{cursor: 'pointer'}}/>
                            )
                            }
                            
                        </Row>

                        
                        {user.isAdmin ? 
                            <Button style={{fontSize: 25}} variant={'outline-danger'} onClick={deleteDevice} >Удалить товар</Button>
                            :
                            <Button variant={'outline-dark'} onClick={() => addToBasket(user.userId, device.id)} >Добавить в корзину</Button>}
                        
                    </Card>
                </Col>
           </Row>
           <Row className="d-flex flex-column m-3">
               <h1>Харастеристики</h1>
               {device.info.map((info, index) => 
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'Lightgray' : 'transparent', paddind: 10}}>
                        <strong>{info.title}</strong>:  {info.description}
                    </Row>
                )}
           </Row>
        </Container>
    );
});

export default DevicePage;