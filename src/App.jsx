import { useState, useEffect } from 'react'
import { Card } from './components/Card'
import { ApiCard } from './components/ApiCard'
import produtos from './constants/produtos.json'
import { api } from "./api/rmApi"
import style from './App.module.css'
import ReactDOM from "react-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Popup
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import "leaflet-defaulticon-compatibility";

import SweetAlert2 from 'react-sweetalert2';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Tilt } from 'react-tilt'

const defaultOptions = {
  reverse: false,  // reverse the tilt direction
  max: 35,     // max tilt rotation (degrees)
  perspective: 1000,   // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.1,    // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000,   // Speed of the enter/exit transition
  transition: true,   // Set a transition on enter/exit.
  axis: null,   // What axis should be disabled. Can be X or Y.
  reset: true,    // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}

function MyVerticallyCenteredModal(props) {
  console.log(props)
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function App() {
  const [show, setShow] = useState("")
  const [data, setData] = useState([])
  const [page, setPage] = useState("")
  const [name, setName] = useState("")
  const [swalProps, setSwalProps] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);

  let subtitle
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    api.get(`/character/?page=${page}&name=${name}`).then((response) => {
      setSwalProps({
        show: false,
        title: 'Api Reponse',
        text: 'Esta pagina nao contem este personagem',
      });
      if (!response.data.results) {
        console.log("Vazio")
      }
      setData(response.data.results)
    }).catch((error) => {

      if (error.response.status === 404) {
        setSwalProps({
          show: true,
          title: 'Api Reponse',
          text: 'Esta pagina nao contem este personagem',
        });
        // console.log("Esta pagina nao contem este personagem")

      }
      console.error(error)
    })
  }, [page, name])

  return (
    <>
      <SweetAlert2 {...swalProps} />
      <div className={style.wrapBtns}>
        <button onClick={() => setShow("prod")}>Produtos</button>
        <button onClick={() => setShow("api")}>API</button>
        <button onClick={() => setShow("map")}>Mapa</button>
      </div>
      <div className={style.wrapPage}>
        <h1>Exercícios de manutenção</h1>
        {show === "prod" &&
          <>
            <h2>Showroom de produtos</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {produtos.map((item) => {
                // console.log(item)
                return (
                  <Card name={item.name} desc={item.desc} value={item.value} image={item.image} categoria={item.categoria} status={item.status} key={item.id} />
                )
              })}
            </div>
          </>
        }
        {show === "api" &&
          <>
            <h2>Rick and Morty API</h2>
            <div>
              <input type="text" placeholder="1/43" value={page} onChange={(event) => setPage(event.target.value)}
                style={{ marginRight: '20px' }}
              />
              <input type="text" placeholder="name" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {data.map((item, index) => {
                console.log(item)
                return (
                  <div key={item.id} style={{ backgroundColor: 'grey', margin: '20px', padding: '20px', borderRadius: '10px' }}>
                    <ApiCard key={index} name={item.name} species={item.species} gender={item.gender} type={item.type} status={item.status} image={item.image} />
                    <button onClick={() => openModal()}>Info</button>

                    <MyVerticallyCenteredModal
                      show={modalIsOpen}
                      onHide={() => setIsOpen(false)}
                    />

                  </div>
                )
              })}
            </div>
          </>
        }
        {show === "map" &&
          <>
            <h2>Mapa</h2>
            <div>
              <MapContainer style={{ height: '80vh' }} center={[-25.42480547384504, -49.27243151873004]} zoom={20} scrollWheelZoom={true}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[-25.42480547384504, -49.27243151873004]}>
                  <Popup>
                    <a href="https://www.google.com/maps/place/Col%C3%A9gio+SESI+Celso+Charuri/@-25.424849,-49.2753009,17z/data=!3m1!4b1!4m6!3m5!1s0x94dce55e3000a6f1:0xc52cd0912ecfc2bd!8m2!3d-25.4248519!4d-49.2724046!16s%2Fg%2F11vd8tbjfz?entry=ttu">
                      Sesi Celso Charuri
                    </a>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </>
        }
      </div>
    </>
  )
}

export default App
