import React, { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import Message from '../Message/Message';
import './Cat.css';
import send from './send.png';
import { user } from '../join/join';
import closeIcon from './closeIcon.png';

const ENDPOINT = `https://server-side-five-pearl.vercel.app`;
let socket;

const Cat = () => {
  const [id, setId] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    const message = document.getElementById('catinput').value;
    if (message.trim()) {
      socket.emit('message', { message, id });
      document.getElementById('catinput').value = '';
    }
  };

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ['websocket'] });
    socket.on('connect', () => {
      alert('connected');
      setId(socket.id);
    });

    socket.emit('joined', { user });

    // Listen for messages and join/leave events
    socket.on('welcome', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data.user, data.message);
    });
    socket.on('userJoined', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data.user, data.message);
    });
    socket.on('leave', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on('sendmessage', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data.user, data.message, data.id);
    });

    return () => {
      socket.off('sendmessage');
    };
  }, []);

  return (
    <div className='catpae'>
      <div className='catcontainer'>
        <div className='main'>
          <h2>Here the Chat Begins</h2>
          <a href='/'><img src={closeIcon} alt='' /></a>
        </div>
        <ReactScrollToBottom className='catbox'>
          {messages.map((item, i) => (
            <Message
              key={i}
              user={item.id === id ? '' : item.user}
              message={item.message}
              classs={item.id === id ? 'right' : 'left'}
            />
          ))}
        </ReactScrollToBottom>
        <div className='inputbox'>
          <input
            onKeyPress={(event) => event.key === 'Enter' ? sendMessage() : null}
            id='catinput'
            type='text'
          />
          <button onClick={sendMessage} id='catbtn'>
            <img src={send} alt='' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cat;
