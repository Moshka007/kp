import React, { useContext, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Col, Dropdown, Form, Row } from 'react-bootstrap';
import {Context} from '../../index';
import { fetchTypes, fetchBrands, createDevice, fetchDevices} from '../../http/deviceAPI';
import { observer } from 'mobx-react-lite';

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context);
    const [info, setInfo] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, []);    

    const addInfo = () => {
      setInfo([...info, {title: '', description: '', number: Date.now()}]);
    }

    const removeInfo = (number) => {
      setInfo(info.filter(i => i.number !== number));
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => onHide())
    }
  
        return (
            <Modal
                show={show}
                onHide={onHide}
                centered
            >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form>
              <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle>{device.selectedType.name || 'Выберете тип'}</Dropdown.Toggle>
                <Dropdown.Menu>
                    {device.types.map(type => 
                        <Dropdown.Item 
                            key={type.id}
                            onClick={() => device.setSelectedType(type)}
                        >
                            {type.name}
                        </Dropdown.Item>  
                    )}
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown>
                <Dropdown.Toggle>{device.selectedBrand.name || 'Выберете бренд'}</Dropdown.Toggle>
                <Dropdown.Menu>
                    {device.brands.map(brand => 
                        <Dropdown.Item 
                            key={brand.id}
                            onClick={() => device.setSelectedBrand(brand)}
                        >
                            {brand.name}
                        </Dropdown.Item>  
                    )}
                </Dropdown.Menu>
              </Dropdown>
              
              <Form.Control 
                  className="mt-2"
                  placeholder="Введите название устройства"
                  value={name}
                  onChange={e => setName(e.target.value)}
              />

              <Form.Control 
                  className="mt-2"
                  placeholder="Введите стоимость устройства"
                  type="number"
                  value={price}
                  onChange={e => setPrice(Number(e.target.value))}
              />

              <Form.Control 
                  className="mt-2"
                  type="file"
                  onChange={selectFile}
              />
              <hr/>

              <Button
                  variant={'outline-dark'}
                  onClick={addInfo}
              >
                Добавить новое свойство
              </Button>
              {info.map(i => 
                    <Row className="mt-3" key={i.number}>
                        <Col md={4}>
                            <Form.Control
                                value={i.title}
                                onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                placeholder="Введите название свойства"
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Control
                                value={i.description}
                                onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                placeholder="Введите описание свойства"
                            />
                        </Col>
                        <Col md={4}>
                            <Button 
                                variant={"outline-danger"}
                                onClick={() => removeInfo(i.number)}
                            >
                                Удалить
                            </Button>
                        </Col>
                    </Row>
                )}
          </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
      </Modal.Footer>
    </Modal>
        );
});

export default CreateDevice;