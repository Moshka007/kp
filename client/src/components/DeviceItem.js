import React, { useContext } from 'react';
import { Card, Col, Image, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import star from '../assets/star.png';
import cros from '../assets/cros.png'
import { DEVICE_ROUTE } from '../utils/consts';
import { deleteOneDevice, addToBasket } from '../http/deviceAPI';
import { Context } from '../index';


const DeviceItem = ({device}) => {
    const history = useHistory();
    const {user} = useContext(Context)

    const deleteDevice = async () => {
            await deleteOneDevice(device.id);
    }
    
    return (
        <div id={device.id}>
            <Col md={3} className={"mt-3"} >
            {
                user.isAdmin && <Image width={15} height={15} src={cros} onClick={() => {deleteDevice(); document.getElementById(`${device.id}`).style.display = 'none'}} style={{cursor: 'pointer'}} />
            }
            
            <Card  style={{width: 150, cursor: 'pointer'}} border={"light"} >
                <Image width={150} 
                       height={150} 
                       src={process.env.REACT_APP_API_URL + device.img}
                       onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}
                />
                <div className="mt-1 text-black-50 d-flex justify-content-between align-items-center">
                    <div>{device.brand.name}</div>
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <Image width={15} height={15} src={star}/>
                    </div>
                </div>
                <div>{device.name}</div>
                <div className="mt-1 d-flex justify-content-between">
                    <div  style={{display: "inline-block"}} className="mt-1 text-black-50">{device.price}р</div>
                    {
                        <Button
                        style={{width: 70, height: 25, fontSize: 9, display: "inline-block"}} 
                        variant={'primary'}
                        onClick={() => addToBasket(user.userId, device.id)}
                        
                    >
                        В корзину
                    </Button>
                    }
                    
                </div>
                {/* <Row className="d-flex justify-content-between">
                <div className="text-black-50">{device.price}</div>
                <Button style={{width: 50, height: 20, fontSize: 10}} variant={'primary'}>В корзину</Button>
                </Row> */}
            </Card>
            </Col>
        </div>
        
    );
};

export default DeviceItem;