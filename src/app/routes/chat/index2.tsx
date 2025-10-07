import {
  Send,
  Menu,
  Plus,
  Paperclip,
  Smile,
  Image,
  Home,
  Settings,
  Bell,
  Search,
  User,
  MoreVertical,
  Check,
} from 'lucide-react';
import React, { useState } from 'react';

// Navbar Component
function Navbar({ onMenuClick }) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div
      style={{
        height: '64px',
        backgroundColor: '#1e1e1e',
        borderBottom: '1px solid #333',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: '16px',
      }}
    >
      <button
        onClick={onMenuClick}
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Menu size={24} />
      </button>
      <h1
        style={{
          margin: 0,
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#fff',
        }}
      >
        PGX
      </h1>
      <div
        style={{
          marginLeft: '32px',
          display: 'flex',
          gap: '32px',
          fontSize: '14px',
          color: '#aaa',
        }}
      >
        <span style={{ cursor: 'pointer' }}>Service</span>
        <span style={{ cursor: 'pointer' }}>Plan</span>
        <span
          style={{
            color: '#fff',
            borderBottom: '2px solid #4a90e2',
            paddingBottom: '20px',
          }}
        >
          System
        </span>
        <span style={{ cursor: 'pointer' }}>Records</span>
        <span style={{ cursor: 'pointer' }}>Management</span>
        <span style={{ cursor: 'pointer' }}>Status Report</span>
      </div>
      <div
        style={{
          marginLeft: 'auto',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
        }}
      >
        <button
          style={{
            background: 'none',
            border: 'none',
            color: '#aaa',
            cursor: 'pointer',
            padding: '8px',
          }}
        >
          <Bell size={20} />
        </button>
        <button
          style={{
            background: 'none',
            border: 'none',
            color: '#aaa',
            cursor: 'pointer',
            padding: '8px',
          }}
        >
          <Home size={20} />
        </button>
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#4a90e2',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            CH
          </button>
          {showUserMenu && (
            <div
              style={{
                position: 'absolute',
                top: '40px',
                right: 0,
                backgroundColor: '#2a2a2a',
                border: '1px solid #444',
                borderRadius: '8px',
                minWidth: '150px',
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  padding: '8px 16px',
                  cursor: 'pointer',
                  color: '#fff',
                  fontSize: '14px',
                }}
              >
                Profile
              </div>
              <div
                style={{
                  padding: '8px 16px',
                  cursor: 'pointer',
                  color: '#fff',
                  fontSize: '14px',
                }}
              >
                Settings
              </div>
              <div
                style={{
                  padding: '8px 16px',
                  cursor: 'pointer',
                  color: '#fff',
                  fontSize: '14px',
                }}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Sidebar Component
function Sidebar({ open, rooms, selectedRoom, onSelectRoom, onCreateRoom }) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!open) return null;

  // TODO: Integrate Matrix SDK - fetch rooms from homeserver
  // const fetchRooms = async () => {
  //   const client = matrixClient;
  //   const rooms = client.getRooms();
  //   return rooms;
  // };

  return (
    <div
      style={{
        width: '320px',
        backgroundColor: '#2a2a2a',
        borderRight: '1px solid #333',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 64px)',
      }}
    >
      <div style={{ padding: '16px' }}>
        <h3
          style={{
            margin: '0 0 16px 0',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          Operators
        </h3>
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#888',
            }}
          />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 8px 8px 36px',
              backgroundColor: '#1e1e1e',
              border: '1px solid #444',
              borderRadius: '4px',
              color: '#fff',
              fontSize: '13px',
            }}
          />
        </div>
        <button
          onClick={onCreateRoom}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: 'transparent',
            border: '1px solid #4a90e2',
            borderRadius: '4px',
            color: '#4a90e2',
            cursor: 'pointer',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <Plus size={16} /> Create New Room
        </button>
      </div>
      <div style={{ flexGrow: 1, overflow: 'auto', padding: '0 8px' }}>
        {rooms.map((room, index) => (
          <div
            key={room.id}
            onClick={() => onSelectRoom(index)}
            style={{
              padding: '12px',
              backgroundColor:
                selectedRoom === index ? '#4a90e2' : 'transparent',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#fff',
              fontSize: '13px',
            }}
          >
            <span>{room.name}</span>
            {room.unread > 0 && (
              <span
                style={{
                  backgroundColor: selectedRoom === index ? '#fff' : '#4a90e2',
                  color: selectedRoom === index ? '#4a90e2' : '#fff',
                  borderRadius: '10px',
                  padding: '2px 8px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                }}
              >
                {room.unread}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Chat Messages Component
function ChatMessages({ messages, roomName }) {
  // TODO: Integrate Matrix SDK - fetch messages from room
  // const fetchMessages = async (roomId) => {
  //   const client = matrixClient;
  //   const room = client.getRoom(roomId);
  //   const timeline = room.timeline;
  //   return timeline;
  // };

  return (
    <div
      style={{
        flexGrow: 1,
        overflow: 'auto',
        padding: '24px',
        backgroundColor: '#1e1e1e',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          color: '#888',
          textAlign: 'center',
          fontSize: '12px',
          marginBottom: '16px',
        }}
      >
        Chat: {roomName}
      </div>
      {messages.map((msg) => (
        <div key={msg.id} style={{ marginBottom: '16px' }}>
          {msg.isDate && (
            <div
              style={{
                color: '#888',
                textAlign: 'center',
                fontSize: '11px',
                margin: '16px 0',
              }}
            >
              {msg.date}
            </div>
          )}
          {!msg.isDate && (
            <div
              style={{
                display: 'flex',
                justifyContent: msg.isMe ? 'flex-end' : 'flex-start',
                alignItems: 'flex-end',
              }}
            >
              <div
                style={{
                  maxWidth: '70%',
                  padding: '12px',
                  backgroundColor: msg.isMe ? '#4a90e2' : '#2a2a2a',
                  color: '#fff',
                  borderRadius: '8px',
                  fontSize: '13px',
                }}
              >
                {!msg.isMe && (
                  <div
                    style={{
                      color: '#aaa',
                      fontSize: '11px',
                      marginBottom: '4px',
                    }}
                  >
                    {msg.sender}
                  </div>
                )}
                <div>{msg.text}</div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '4px',
                    marginTop: '4px',
                  }}
                >
                  <span style={{ color: '#aaa', fontSize: '10px' }}>
                    {msg.time}
                  </span>
                  {msg.isMe && msg.status && (
                    <Check size={12} style={{ color: '#aaa' }} />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      <div
        style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}
      >
        <div
          style={{
            backgroundColor: '#444',
            color: '#ffa726',
            padding: '6px 12px',
            borderRadius: '16px',
            fontSize: '11px',
          }}
        >
          ⏱ Time left for operator acknowledge 03:12
        </div>
      </div>
    </div>
  );
}

// Input Bar Component
function InputBar({ onSendMessage }) {
  const [message, setMessage] = useState('');
  const [showPlugins, setShowPlugins] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      // TODO: Integrate Matrix SDK - send message to room
      // const client = matrixClient;
      // client.sendMessage(roomId, { msgtype: 'm.text', body: message });
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      style={{
        padding: '16px',
        backgroundColor: '#2a2a2a',
        borderTop: '1px solid #333',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowPlugins(!showPlugins)}
          style={{
            background: 'none',
            border: 'none',
            color: '#888',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Plus size={20} />
        </button>
        {showPlugins && (
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              left: 0,
              backgroundColor: '#2a2a2a',
              border: '1px solid #444',
              borderRadius: '8px',
              minWidth: '180px',
              zIndex: 1000,
            }}
          >
            <div
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                color: '#fff',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Paperclip size={16} /> Attach File
            </div>
            <div
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                color: '#fff',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Image size={16} /> Send Image
            </div>
          </div>
        )}
      </div>
      <button
        style={{
          background: 'none',
          border: 'none',
          color: '#888',
          cursor: 'pointer',
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Smile size={20} />
      </button>
      <textarea
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{
          flexGrow: 1,
          padding: '12px',
          backgroundColor: '#1e1e1e',
          border: '1px solid #444',
          borderRadius: '4px',
          color: '#fff',
          fontSize: '13px',
          resize: 'none',
          fontFamily: 'inherit',
          minHeight: '40px',
        }}
        rows={1}
      />
      <button
        onClick={handleSend}
        style={{
          padding: '12px 24px',
          backgroundColor: '#4a90e2',
          border: 'none',
          borderRadius: '4px',
          color: '#fff',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        Send <Send size={16} />
      </button>
    </div>
  );
}

// Main App Component
export default function MatrixChatApp() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(0);

  // TODO: Replace with actual Matrix SDK data
  const rooms = [
    { id: 1, name: 'AX Status Management Operator', unread: 0 },
    { id: 2, name: 'Opeation Technical Personnel - 1342', unread: 1 },
    { id: 3, name: 'Opeation Technical Personnel - 1080', unread: 1 },
    { id: 4, name: 'AX Status Sub-Operator', unread: 0 },
    { id: 5, name: 'System /Operation Engineer', unread: 0 },
    { id: 6, name: 'Controller', unread: 0 },
    { id: 7, name: 'Performance Status Operator', unread: 0 },
  ];

  const messages = [
    {
      id: 1,
      text: 'tincidunt at tellus.',
      time: '20:22',
      isMe: false,
      sender: 'Operator',
      status: 'read',
    },
    { id: 2, isDate: true, date: '01.03.2024 Friday' },
    {
      id: 3,
      text: 'Lorem ipsum dolor sit.',
      time: '14:15',
      isMe: true,
      status: 'read',
    },
    {
      id: 4,
      text: 'Lorem ipsum dolor sit amet consectetur. Aliquam vitae turpis lorem lacinia. Nunc convallis hendrerit egestas integer commodo. Neque nec et vel ornare. Justo id eget tincidunt at tellus.',
      time: '14:15',
      isMe: false,
      sender: 'Operator',
      status: 'read',
    },
    {
      id: 5,
      text: 'Lorem ipsum dolor sit amet consectetur. Aliquam vitae turpis lorem lacinia. Nunc convallis hendrerit egestas integer commodo. Neque nec et vel ornare. Justo id eget tincidunt at tellus.',
      time: '14:15',
      isMe: true,
      status: 'read',
    },
    {
      id: 6,
      text: 'Lorem ipsum dolor sit amet consectetur. Aliquam vitae el.',
      time: '14:15',
      isMe: false,
      sender: 'Operator',
      status: 'read',
    },
    {
      id: 7,
      text: 'Lorem ipsum dolor sit.',
      time: '14:15',
      isMe: true,
      status: 'read',
    },
  ];

  const handleCreateRoom = () => {
    // TODO: Integrate Matrix SDK - create new room
    // const client = matrixClient;
    // client.createRoom({ name: 'New Room', visibility: 'private' });
    console.log('Create new room');
  };

  const handleSendMessage = (message) => {
    // TODO: Integrate Matrix SDK - send message
    console.log('Sending message:', message);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#1e1e1e',
      }}
    >
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        <Sidebar
          open={sidebarOpen}
          rooms={rooms}
          selectedRoom={selectedRoom}
          onSelectRoom={setSelectedRoom}
          onCreateRoom={handleCreateRoom}
        />
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <ChatMessages
            messages={messages}
            roomName={rooms[selectedRoom].name}
          />
          <InputBar onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
