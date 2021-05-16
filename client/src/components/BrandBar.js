import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Card, Image, Row } from 'react-bootstrap';
import { Context } from '../index';
import cros from '../assets/cros.png'
import pencl from '../assets/pencl.png'
import {deleteOneBrand} from '../http/deviceAPI'

const BrandBar = observer(() => {
    const {device} = useContext(Context);
    const {user} = useContext(Context);
    const [isEditing, setEditing] = useState(false)

    return (
        <Row className="d-flex">
            {device.brands.map((brand, i) => 
            <div id={i}>
                { 
                isEditing && user.isAdmin && <Image width={15} height={15} onClick={() => {document.getElementById(`${i}`).style.display = 'none'; deleteOneBrand(brand.id)}}  src={cros} style={{cursor: 'pointer', marginRight:'auto'}} />
                }

                <Card
                style={{cursor: 'pointer'}}
                key={brand.id}
                className="p-3"
                onClick={() => {device.setSelectedBrand(brand); device.setPage(1)}}
                border={brand.id ===device.selectedBrand.id ? "danger" : "light"}
            >
                {brand.name}
                
            </Card>
            </div>
                
            )}

                {user.isAdmin && (
                    isEditing ?
                    <Image width={20} height={20} src={cros} onClick={() => setEditing(false)} style={{cursor: 'pointer'}} />
                    :
                    <Image width={20} height={20} onClick={() => setEditing(true)} src={pencl} style={{cursor: 'pointer'}}/>
                    )
                }
        </Row>
    );
});

export default BrandBar;