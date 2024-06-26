import './App.css';
import './share_button.css';
import Reg from './reg.jsx'
import React, { useState } from 'react';
import Modal from 'react-modal';

const recept_example = [
  { name: 'Pizza Mozarela', description: 'Italian pizza with cheese and tomato', time: '10-15 min' },
  { name: 'Pizza Mozarela', description: 'Italian pizza with cheese and tomato', time: '10-15 min' },
  { name: 'Pizza Mozarela', description: 'Italian pizza with cheese and tomato', time: '10-15 min' },
  { name: 'Pizza Mozarela', description: 'Italian pizza with cheese and tomato', time: '10-15 min' },
  { name: 'Pizza Mozarela', description: 'Italian pizza with cheese and tomato', time: '10-15 min' }
];

function Header({ handleButtonClick }) {
  return (
    <header>
      <div><img src='assets/logo.png' alt="Logo"></img></div>
      <div>
        <p>list</p>
        <p>search</p>
      </div>
      <div>
        <p onClick={handleButtonClick}>reg</p>
        <p onClick={handleButtonClick}>sign up</p>
      </div>
    </header>
  );
}

function HeroSection({ handleButtonClick }) {
  return (
    <section>
      <div>
        <img src='assets/logo.png' alt='Logo'></img>
        <button onClick={handleButtonClick}>
          Let's cook!
        </button>
      </div>
      <div>Chef - can help you for your dinner/lunch/break</div>
    </section>
  );
}

function Content() {
  return (
    <div className="content">
      <h2>Discover our recipes!</h2>
      <div className="cards-container">
        {recept_example.map((recept_example, index) => (
          <div className="card" key={index}>
            <h3>{recept_example.name}</h3>
            <p>{recept_example.description}</p>
            <p>{recept_example.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <div>
        <h3>Contact to me</h3>
        <div className='socials'>
          <div className="up">
            <button className="card1">
              <img src='./assets/social_media/instagram.png' style={{ width: '30px', height: '30px' }} alt="Instagram"></img>
            </button>
            <button className="card2">
              <img src='./assets/social_media/whatsapp.png' style={{ width: '30px', height: '30px' }} alt="WhatsApp"></img>
            </button>
            <button className="card3">
              <img src='./assets/social_media/github.png' style={{ width: '30px', height: '30px' }} alt="GitHub"></img>
            </button>
            <button className="card4">
              <img src='./assets/social_media/discord.png' style={{ width: '30px', height: '30px' }} alt="Discord"></img>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Main_Page() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  

  const handleButtonClick = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Header handleButtonClick={handleButtonClick} />
      <HeroSection handleButtonClick={handleButtonClick} />
      <br />
      <Content />
      <Footer />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        
        <Reg />
        <button onClick={closeModal}>Close</button>
      </Modal>
    </>
  );
}

export default Main_Page;
