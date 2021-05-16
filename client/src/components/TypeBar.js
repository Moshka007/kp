import React, { useContext, useState } from 'react';
import {observer} from 'mobx-react-lite';
import {Context} from "../index";
import ListGroup  from "react-bootstrap/ListGroup";
import { Image } from 'react-bootstrap';
import cros from '../assets/cros.png'
import {deleteOneType} from '../http/deviceAPI'
import pencl from '../assets/pencl.png'


const TypeBar = observer(() => {
    const {device} = useContext(Context);
    const {user} = useContext(Context);
    const [isEditing, setEditing] = useState(false)

    return (
        
        <ListGroup class='list' style={{position: 'relative'}}>
            {user.isAdmin && (
                    isEditing ?
                    <Image width={20} height={20} src={cros} onClick={() => setEditing(false)} style={{cursor: 'pointer'}} />
                    :
                    <Image width={20} height={20} onClick={() => setEditing(true)} src={pencl} style={{cursor: 'pointer'}}/>
                    )
                }

           {device.types.map((type, i) => 
           <div id={i}>
                    {   isEditing &&
                        user.isAdmin && <Image 
                                            width={15} 
                                            height={15} 
                                            onClick={e => { e.preventDefault(); 
                                                            deleteOneType(type.id);
                                                            document.getElementById(`${i}`).style.display = 'none'}}
                                            src={cros} 
                                            style={{cursor: 'pointer'}} 
                                        />
                    }
                <div>
                    <ListGroup.Item
                        style={{cursor: 'pointer'}}
                        active={type.id === device.selectedType.id}
                        onClick={() => { device.setSelectedType(type); device.setPage(1)}}
                        key={type.id}
                    >
                    {type.name}
                    </ListGroup.Item>
                </div>
               
                    
           </div>   
        )}
        </ListGroup>
    );
});

export default TypeBar;