import React, { useState, useEffect } from "react";
import {motion as M,AnimatePresence as AP} from 'framer-motion'

const App = () => {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [msgbox, setMsgbox] = useState(false);
  const handelSubmit = () => {
    if (name && msg) {
      fetch("https://worldchat-adsjf.herokuapp.com/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          name: name,
          message: msg,
        }),
      })
        .then((res) => true)
        .catch((err) => console.log(err));
    }
    setName('');
    setMsg('');
  };
  useEffect(() => {
    let id = setInterval(() => {
      fetch("https://worldchat-adsjf.herokuapp.com/")
        .then((res) => res.json())
        .then((result) => {
          setMessages(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1500);
    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "auto",
        height: "100vh",
        backgroundColor: "white",
        position: "relative",
      }}
    >
      <header
        style={{
          fontSize: "2rem",
          color: "#008BFF",
        }}
      >
        <p style={{ padding: "30px", paddingBottom: "0px", fontWeight: "600" }}>
          World Chat
        </p>
      </header>
      <h4
        style={{
          margin: "20px",
          textAlign: "center",
          color: "#008BFF",
        }}
      >
        You can send message to world! Go ahead raise your voice don't be shy!
      </h4>
      <h3
        style={{
          padding: "10px",
          textAlign: "center",
          backgroundColor: "#008BFF",
          color: "white",
          width: "90%",
          margin: "auto",
          marginBottom: "20px",
          borderRadius: ".5rem",
        }}
      >
        Messages from world
      </h3>
      <div
        style={{
          width: "90%",
          margin: "auto",
        }}
      >
        {messages.map((msg) => (
          <Message key={msg._id} name={msg.name} message={msg.message} />
        ))}
      </div>
      <AP>
        {msgbox && (
          <M.div 
            transition={{
              duration:.5
            }}
            exit={{y:'100vh'}}
            initial={{
              y: "100vh",
            }}
            animate={{
              y: 0,
            }}
            style={{
              position: "fixed",
              bottom: "0px",
              width:'100%',
              left: "50%",
              maxWidth:'450px',
              height: "400px",
              backgroundColor: "#48ACFF",
              borderRadius: "20px 20px 0 0",
              zIndex: 1,
              translateX:'-50%'
            }}
          >
            <form
              style={{
                width: "100%",
                height: "100%",
              }}
              onSubmit={(e) => {
                e.preventDefault();
              }}
              action="submit"
            >
              <input
                style={{
                  margin: "30px auto",
                  width: "90%",
                  display: "block",
                  padding: "10px",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "1rem",
                }}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Name"
                type="text"
              />
              <input
                style={{
                  margin: "30px auto",
                  width: "90%",
                  display: "block",
                  padding: "10px",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "1rem",
                }}
                value={msg}
                onChange={(e) => {
                  setMsg(e.target.value);
                }}
                placeholder="Message"
                type="text"
              />
              <button
                onClick={() => {
                  setMsgbox(false);
                  handelSubmit();
                }}
                style={{
                  margin: "30px auto",
                  width: "90%",
                  display: "block",
                  padding: "10px",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "1rem",
                }}
                type="submit"
              >
                Send
              </button>
            </form>
          </M.div>
        )}
      </AP>
      <button
        style={{
          position: "fixed",
          bottom: "3%",
          right: "5%",
          border: "none",
          backgroundColor: "#008BFF",
          color: "white",
          padding: "10px 20px",
          borderRadius: "50%",
          fontSize: "2rem",
          zIndex: 0,
        }}
        onClick={() => {
          setMsgbox(true);
        }}
      >
        +
      </button>
    </div>
  );
};

export default App;

const Message = ({ name, message }) => {
  return (
    <div
      style={{
        marginTop: "10px",
        padding: "20px",
        height: "auto",
        backgroundColor: "#DDDDDD",
        borderRadius:'10px 10px 10px 0'
      }}
    >
      <span
        style={{
          fontWeight: "500",
        }}
      >
        {message}
      </span>
      <br />
      <span
        style={{
          color: "#333",
          fontSize: ".9rem",
        }}
      >
        {name}
      </span>
    </div>
  );
};
