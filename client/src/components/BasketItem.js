import React from 'react';
import { Card, Col, Image, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { DEVICE_ROUTE} from '../utils/consts';
import { deleteOneDevice, deleteBasketDevice} from '../http/deviceAPI';


const BasketItem = ({device}) => {
    const history = useHistory();
    
    return (
        <div id={device.id}>
            <Col md={3} className={"mt-3"} >
            <Card  style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image 
                    width={150} 
                    height={150} 
                    src={process.env.REACT_APP_API_URL + device.img}
                    onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}
                    />
                <div className="mt-1 text-black-50 d-flex justify-content-center align-items-center">
                    <div>{device.brand}</div>
                </div>
                <div className="d-flex justify-content-center" >{device.name}</div>
                <Button 
                    style={{fontSize: 10}} 
                    variant={'outline-danger'} 
                    onClick={() => {deleteBasketDevice(device.id)
                        document.getElementById(`${device.id}`).style.display = 'none'}} 
                >
                    Удалить товар
                </Button>
            </Card>
            </Col>
        </div>
        
    );
};

export default BasketItem;