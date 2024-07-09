import './App.css';
import './share_button.css';
import Reg from './reg.jsx';
import LoginForm from './login.jsx';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Cookies from 'js-cookie';
import axios from 'axios';
import logo from './assets/logo.png';
import discord from './assets/social_media/discord.png'
import github from './assets/social_media/github.png'
import instagram from './assets/social_media/instagram.png'
import whatsapp from './assets/social_media/whatsapp.png'



const recept_example = [
  { name: 'Pizza Mozarela', description: 'Italian pizza with cheese and tomato', time: '10-15 min' },
  { name: 'Pizza Mozarela', description: 'Italian pizza with cheese and tomato', time: '10-15 min' },
  { name: 'Pizza Mozarela', description: 'Italian pizza with cheese and tomato', time: '10-15 min' },
  { name: 'Pizza Mozarela', description: 'Italian pizza with cheese and tomato', time: '10-15 min' },
  { name: 'Pizza Mozarela', description: 'Italian pizza with cheese and tomato', time: '10-15 min' }
];

function Header({ handleButtonClick, username, handleLogout }) {
  return (
    <header>
      <div><img src={logo} alt="Logo"></img></div>
      <div>
        <p>list</p>
        <p>search</p>
      </div>
      <div>
        {username ? (
          <>
            <p>{username}</p>
            <p onClick={handleLogout}>Logout</p>
          </>
        ) : (
          <>
            <p onClick={handleButtonClick}>reg</p>
            <p onClick={handleButtonClick}>sign up</p>
          </>
        )}
      </div>
    </header>
  );
}

function HeroSection({ handleButtonClick }) {
  return (
    <section>
      <div>
        <img src={logo} alt='Logo'></img>
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
              <img src={instagram} style={{ width: '30px', height: '30px' }} alt="Instagram"></img>
            </button>
            <button className="card2">
              <img src={whatsapp} style={{ width: '30px', height: '30px' }} alt="WhatsApp"></img>
            </button>
            <button className="card3">
              <img src={github} style={{ width: '30px', height: '30px' }} alt="GitHub"></img>
            </button>
            <button className="card4">
              <img src={discord} style={{ width: '30px', height: '30px' }} alt="Discord"></img>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Main_Page() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [Regisopen, setRegisopen] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      axios.get('http://127.0.0.1:8000/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setUsername(response.data.username);
      })
      .catch(error => {
        console.error('Error fetching user data', error);
      });
    }
  }, []);

  const handleRegclose = () => {
    setRegisopen(false);
  };

  const handleRegopen = () => {
    setRegisopen(true);
  };

  const handleButtonClick = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleLoginSuccess = (username, token) => {
    setUsername(username);
    Cookies.set('access_token', token);
    setModalIsOpen(false);
  };

  const handleLogout = () => {
    Cookies.remove('access_token');
    setUsername(null);
  };

  return (
    <>
      <Header handleButtonClick={handleButtonClick} username={username} handleLogout={handleLogout} />
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
        {Regisopen ? (
          <>
            <Reg />
            <button onClick={handleRegclose}>Close</button>
          </>
        ) : (
          <>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
            <button onClick={handleRegopen}>Open Registration</button>
          </>
        )}
      </Modal>
    </>
  );
}

export default Main_Page;
