import { useState, useEffect } from "react";

function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("https://jai-lab7.onrender.com/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch(() => console.error("Failed to load messages"));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Submitted Messages</h2>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <div className="row">
          {messages.map((msg, idx) => (
            <div key={idx} className="col-md-6 mb-3">
              <div className="card p-3">
                <h5>{msg.subject}</h5>
                <p><strong>From:</strong> {msg.name}</p>
                <p>{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Messages;
