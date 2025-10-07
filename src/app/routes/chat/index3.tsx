import { useState } from 'react';

// Create Room Modal Component
function CreateRoomModal({ isOpen, onClose, onCreateRoom }) {
  const [chatType, setChatType] = useState('private'); // 'private' or 'group'
  const [username, setUsername] = useState('');
  const [userDomain, setUserDomain] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomTopic, setRoomTopic] = useState('');
  const [roomPrivacy, setRoomPrivacy] = useState('private'); // 'public' or 'private'
  const [userSearch, setUserSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  // TODO: Replace with actual API call
  const mockUsers = [
    {
      id: 1,
      username: 'john.doe',
      domain: 'matrix.org',
      displayName: 'John Doe',
    },
    {
      id: 2,
      username: 'jane.smith',
      domain: 'matrix.org',
      displayName: 'Jane Smith',
    },
    {
      id: 3,
      username: 'bob.wilson',
      domain: 'matrix.org',
      displayName: 'Bob Wilson',
    },
    {
      id: 4,
      username: 'alice.brown',
      domain: 'matrix.org',
      displayName: 'Alice Brown',
    },
    {
      id: 5,
      username: 'charlie.davis',
      domain: 'matrix.org',
      displayName: 'Charlie Davis',
    },
  ];

  const filteredUsers = mockUsers.filter(
    (user) =>
      !selectedUsers.find((u) => u.id === user.id) &&
      (user.displayName.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.username.toLowerCase().includes(userSearch.toLowerCase())),
  );

  const handleAddUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setUserSearch('');
  };

  const handleRemoveUser = (userId) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== userId));
  };

  const handleCreate = () => {
    if (chatType === 'private') {
      // TODO: Create private chat with username@userDomain
      console.log('Creating private chat with:', `${username}@${userDomain}`);
      onCreateRoom({ type: 'private', username, userDomain });
    } else {
      // TODO: Create group chat
      console.log('Creating group chat:', {
        roomName,
        roomTopic,
        roomPrivacy,
        users: selectedUsers,
      });
      onCreateRoom({
        type: 'group',
        roomName,
        roomTopic,
        roomPrivacy,
        users: selectedUsers,
      });
    }
    handleClose();
  };

  const handleClose = () => {
    setChatType('private');
    setUsername('');
    setUserDomain('');
    setRoomName('');
    setRoomTopic('');
    setRoomPrivacy('private');
    setUserSearch('');
    setSelectedUsers([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
      }}
    >
      <div
        style={{
          backgroundColor: '#2a2a2a',
          borderRadius: '8px',
          width: '90%',
          maxWidth: '500px',
          maxHeight: '90vh',
          overflow: 'auto',
          border: '1px solid #444',
        }}
      >
        <div
          style={{
            padding: '20px',
            borderBottom: '1px solid #444',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ margin: 0, color: '#fff', fontSize: '18px' }}>
            Create New Room
          </h2>
          <button
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#888',
              cursor: 'pointer',
              fontSize: '24px',
              padding: '0',
              width: '30px',
              height: '30px',
            }}
          >
            ×
          </button>
        </div>

        <div style={{ padding: '20px' }}>
          {/* Chat Type Selection */}
          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                color: '#aaa',
                fontSize: '13px',
                marginBottom: '8px',
              }}
            >
              Chat Type
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setChatType('private')}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor:
                    chatType === 'private' ? '#4a90e2' : 'transparent',
                  border: `1px solid ${chatType === 'private' ? '#4a90e2' : '#444'}`,
                  borderRadius: '4px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '13px',
                }}
              >
                Private Chat
              </button>
              <button
                onClick={() => setChatType('group')}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor:
                    chatType === 'group' ? '#4a90e2' : 'transparent',
                  border: `1px solid ${chatType === 'group' ? '#4a90e2' : '#444'}`,
                  borderRadius: '4px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '13px',
                }}
              >
                Group Chat
              </button>
            </div>
          </div>

          {/* Private Chat Form */}
          {chatType === 'private' && (
            <>
              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'block',
                    color: '#aaa',
                    fontSize: '13px',
                    marginBottom: '8px',
                  }}
                >
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#1e1e1e',
                    border: '1px solid #444',
                    borderRadius: '4px',
                    color: '#fff',
                    fontSize: '13px',
                  }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'block',
                    color: '#aaa',
                    fontSize: '13px',
                    marginBottom: '8px',
                  }}
                >
                  User Domain
                </label>
                <input
                  type="text"
                  value={userDomain}
                  onChange={(e) => setUserDomain(e.target.value)}
                  placeholder="e.g., matrix.org"
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#1e1e1e',
                    border: '1px solid #444',
                    borderRadius: '4px',
                    color: '#fff',
                    fontSize: '13px',
                  }}
                />
              </div>
            </>
          )}

          {/* Group Chat Form */}
          {chatType === 'group' && (
            <>
              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'block',
                    color: '#aaa',
                    fontSize: '13px',
                    marginBottom: '8px',
                  }}
                >
                  Room Privacy
                </label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => setRoomPrivacy('public')}
                    style={{
                      flex: 1,
                      padding: '8px',
                      backgroundColor:
                        roomPrivacy === 'public' ? '#4a90e2' : 'transparent',
                      border: `1px solid ${roomPrivacy === 'public' ? '#4a90e2' : '#444'}`,
                      borderRadius: '4px',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }}
                  >
                    Public
                  </button>
                  <button
                    onClick={() => setRoomPrivacy('private')}
                    style={{
                      flex: 1,
                      padding: '8px',
                      backgroundColor:
                        roomPrivacy === 'private' ? '#4a90e2' : 'transparent',
                      border: `1px solid ${roomPrivacy === 'private' ? '#4a90e2' : '#444'}`,
                      borderRadius: '4px',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }}
                  >
                    Private
                  </button>
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'block',
                    color: '#aaa',
                    fontSize: '13px',
                    marginBottom: '8px',
                  }}
                >
                  Room Name
                </label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="Enter room name"
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#1e1e1e',
                    border: '1px solid #444',
                    borderRadius: '4px',
                    color: '#fff',
                    fontSize: '13px',
                  }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'block',
                    color: '#aaa',
                    fontSize: '13px',
                    marginBottom: '8px',
                  }}
                >
                  Topic (Optional)
                </label>
                <input
                  type="text"
                  value={roomTopic}
                  onChange={(e) => setRoomTopic(e.target.value)}
                  placeholder="Enter room topic"
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#1e1e1e',
                    border: '1px solid #444',
                    borderRadius: '4px',
                    color: '#fff',
                    fontSize: '13px',
                  }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'block',
                    color: '#aaa',
                    fontSize: '13px',
                    marginBottom: '8px',
                  }}
                >
                  Add Users
                </label>
                {/* Selected Users (Chips) */}
                {selectedUsers.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginBottom: '8px',
                      padding: '8px',
                      backgroundColor: '#1e1e1e',
                      borderRadius: '4px',
                      border: '1px solid #444',
                    }}
                  >
                    {selectedUsers.map((user) => (
                      <div
                        key={user.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 10px',
                          backgroundColor: '#4a90e2',
                          borderRadius: '16px',
                          fontSize: '12px',
                          color: '#fff',
                        }}
                      >
                        <span>{user.displayName}</span>
                        <button
                          onClick={() => handleRemoveUser(user.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#fff',
                            cursor: 'pointer',
                            padding: '0',
                            fontSize: '16px',
                            lineHeight: '1',
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {/* User Search */}
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search users..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#1e1e1e',
                    border: '1px solid #444',
                    borderRadius: '4px',
                    color: '#fff',
                    fontSize: '13px',
                  }}
                />
                {/* User List */}
                {userSearch && filteredUsers.length > 0 && (
                  <div
                    style={{
                      marginTop: '8px',
                      backgroundColor: '#1e1e1e',
                      border: '1px solid #444',
                      borderRadius: '4px',
                      maxHeight: '150px',
                      overflow: 'auto',
                    }}
                  >
                    {filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => handleAddUser(user)}
                        style={{
                          padding: '10px',
                          cursor: 'pointer',
                          borderBottom: '1px solid #333',
                          transition: 'background-color 0.2s',
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = '#2a2a2a')
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            'transparent')
                        }
                      >
                        <div style={{ color: '#fff', fontSize: '13px' }}>
                          {user.displayName}
                        </div>
                        <div style={{ color: '#888', fontSize: '11px' }}>
                          @{user.username}:{user.domain}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {userSearch && filteredUsers.length === 0 && (
                  <div
                    style={{
                      marginTop: '8px',
                      padding: '10px',
                      backgroundColor: '#1e1e1e',
                      border: '1px solid #444',
                      borderRadius: '4px',
                      color: '#888',
                      fontSize: '13px',
                      textAlign: 'center',
                    }}
                  >
                    No users found
                  </div>
                )}
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button
              onClick={handleClose}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: 'transparent',
                border: '1px solid #444',
                borderRadius: '4px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={
                (chatType === 'private' && (!username || !userDomain)) ||
                (chatType === 'group' && !roomName)
              }
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#4a90e2',
                border: 'none',
                borderRadius: '4px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '13px',
                opacity:
                  (chatType === 'private' && (!username || !userDomain)) ||
                  (chatType === 'group' && !roomName)
                    ? 0.5
                    : 1,
              }}
            >
              Create Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
export default function MatrixChatApp() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [createRoomModalOpen, setCreateRoomModalOpen] = useState(false);

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

  const handleCreateRoom = (roomData) => {
    // TODO: Integrate Matrix SDK - create new room
    // const client = matrixClient;
    // if (roomData.type === 'private') {
    //   client.createRoom({
    //     is_direct: true,
    //     invite: [`@${roomData.username}:${roomData.userDomain}`]
    //   });
    // } else {
    //   client.createRoom({
    //     name: roomData.roomName,
    //     topic: roomData.roomTopic,
    //     visibility: roomData.roomPrivacy,
    //     invite: roomData.users.map(u => `@${u.username}:${u.domain}`)
    //   });
    // }
    console.log('Creating room:', roomData);
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
