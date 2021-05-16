import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { Context } from '../index';
import {fetchBasketDevices } from '../http/deviceAPI';
import BasketItem from '../components/BasketItem';

const DeviceList = () => {
    const {user}  = useContext(Context);
    const {device}  = useContext(Context);
    const [dev, setDev] = useState();
    
    useEffect(() => {
        fetchBasketDevices(user.userId).then(data => {
           setDev(data)
        })
    }, [])
    console.log(dev);
    return (
           
       <Row className="d-flex">
           { dev &&
           dev.map(device =>  
                    <BasketItem key={device.id} device={device}/>
            )}
       </Row>
    );
};

export default DeviceList;