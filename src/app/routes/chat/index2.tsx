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

// Navbar Component
function Navbar({ onMenuClick }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  const notifications = [
    {
      id: 1,
      title: 'New message',
      text: 'You have a new message from AX Status Management',
      time: '2 min ago',
    },
    {
      id: 2,
      title: 'System Update',
      text: 'System maintenance scheduled for tonight',
      time: '1 hour ago',
    },
    {
      id: 3,
      title: 'Room Invite',
      text: 'You were invited to Performance Status Operator',
      time: '3 hours ago',
    },
  ];

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
          alignItems: 'center',
          height: '64px',
        }}
      >
        <button
          onClick={() => console.log('Service clicked')}
          style={{
            background: 'none',
            border: 'none',
            color: '#aaa',
            cursor: 'pointer',
            padding: '0',
            height: '64px',
            borderBottom: '2px solid transparent',
            fontSize: '14px',
          }}
        >
          Service
        </button>
        <button
          onClick={() => console.log('Plan clicked')}
          style={{
            background: 'none',
            border: 'none',
            color: '#aaa',
            cursor: 'pointer',
            padding: '0',
            height: '64px',
            borderBottom: '2px solid transparent',
            fontSize: '14px',
          }}
        >
          Plan
        </button>
        <button
          onClick={() => console.log('System clicked')}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            padding: '0',
            height: '64px',
            borderBottom: '2px solid #4a90e2',
            fontSize: '14px',
          }}
        >
          System
        </button>
        <button
          onClick={() => console.log('Records clicked')}
          style={{
            background: 'none',
            border: 'none',
            color: '#aaa',
            cursor: 'pointer',
            padding: '0',
            height: '64px',
            borderBottom: '2px solid transparent',
            fontSize: '14px',
          }}
        >
          Records
        </button>
        <button
          onClick={() => console.log('Management clicked')}
          style={{
            background: 'none',
            border: 'none',
            color: '#aaa',
            cursor: 'pointer',
            padding: '0',
            height: '64px',
            borderBottom: '2px solid transparent',
            fontSize: '14px',
          }}
        >
          Management
        </button>
        <button
          onClick={() => console.log('Status Report clicked')}
          style={{
            background: 'none',
            border: 'none',
            color: '#aaa',
            cursor: 'pointer',
            padding: '0',
            height: '64px',
            borderBottom: '2px solid transparent',
            fontSize: '14px',
          }}
        >
          Status Report
        </button>
      </div>
      <div
        style={{
          marginLeft: 'auto',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
        }}
      >
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              background: 'none',
              border: 'none',
              color: '#aaa',
              cursor: 'pointer',
              padding: '8px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Bell size={20} />
            {notificationCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  backgroundColor: '#e74c3c',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  fontSize: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                }}
              >
                {notificationCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                top: '45px',
                right: 0,
                backgroundColor: '#2a2a2a',
                border: '1px solid #444',
                borderRadius: '8px',
                minWidth: '320px',
                maxHeight: '400px',
                overflow: 'auto',
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #444',
                  fontWeight: 'bold',
                  color: '#fff',
                  fontSize: '14px',
                }}
              >
                Notifications
              </div>
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #444',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = '#333')
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                >
                  <div
                    style={{
                      color: '#fff',
                      fontSize: '13px',
                      fontWeight: '500',
                      marginBottom: '4px',
                    }}
                  >
                    {notif.title}
                  </div>
                  <div
                    style={{
                      color: '#aaa',
                      fontSize: '12px',
                      marginBottom: '4px',
                    }}
                  >
                    {notif.text}
                  </div>
                  <div style={{ color: '#888', fontSize: '11px' }}>
                    {notif.time}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          style={{
            background: 'none',
            border: 'none',
            color: '#aaa',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
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
  const [isCreatingRoom, setCreatingRoom] = useState(false);

  if (!open) return null;

  // TODO: Integrate Matrix SDK - fetch rooms from homeserver
  // const fetchRooms = async () => {
  //   const client = matrixClient;
  //   const rooms = client.getRooms();
  //   return rooms;
  // };

  // Filter rooms based on search query
  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
          onClick={() => {
            setCreatingRoom(true);
          }}
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
        {filteredRooms.length === 0 ? (
          <div
            style={{
              padding: '16px',
              textAlign: 'center',
              color: '#888',
              fontSize: '13px',
            }}
          >
            No rooms found
          </div>
        ) : (
          filteredRooms.map((room, index) => {
            // Find the original index for selection
            const originalIndex = rooms.findIndex((r) => r.id === room.id);
            return (
              <div
                key={room.id}
                onClick={() => onSelectRoom(originalIndex)}
                style={{
                  padding: '12px',
                  backgroundColor:
                    selectedRoom === originalIndex ? '#4a90e2' : 'transparent',
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
                      backgroundColor:
                        selectedRoom === originalIndex ? '#fff' : '#4a90e2',
                      color:
                        selectedRoom === originalIndex ? '#4a90e2' : '#fff',
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
            );
          })
        )}
      </div>
      {isCreatingRoom && (
        <CreateRoomModal
          isOpen={isCreatingRoom}
          onClose={() => setCreatingRoom(false)}
          onCreateRoom={() => {}}
        />
      )}
    </div>
  );
}

// Chat Messages Component
function ChatMessages({ messages, roomName }) {
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      <div ref={messagesEndRef} />
    </div>
  );
}

// Input Bar Component
function InputBar({ onSendMessage }) {
  const [message, setMessage] = useState('');
  const [showPlugins, setShowPlugins] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);

  const emojis = [
    '😀',
    '😂',
    '😍',
    '🥰',
    '😎',
    '🤔',
    '😊',
    '😢',
    '😭',
    '😡',
    '👍',
    '👎',
    '👏',
    '🙌',
    '💪',
    '🔥',
    '✨',
    '❤️',
    '💯',
    '🎉',
    '🚀',
    '⭐',
    '💡',
    '✅',
    '❌',
  ];

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

  const handleEmojiClick = (emoji) => {
    setMessage(message + emoji);
    setShowEmojis(false);
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
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowEmojis(!showEmojis)}
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
        {showEmojis && (
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              left: 0,
              backgroundColor: '#2a2a2a',
              border: '1px solid #444',
              borderRadius: '8px',
              padding: '12px',
              width: '280px',
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '8px',
              zIndex: 1000,
            }}
          >
            {emojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiClick(emoji)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#444')}
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = 'transparent')
                }
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
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
