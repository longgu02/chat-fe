import { Menu, Send, ExpandLess, ExpandMore, Add } from '@mui/icons-material';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Box,
  Divider,
  Collapse,
  Paper,
} from '@mui/material';
import React, { useState } from 'react';

// Navbar Component
function Navbar() {
  return (
    <AppBar
      position="static"
      color="default"
      sx={{ background: '#1e1e1e', color: '#fff' }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          PGX System
        </Typography>
        <IconButton color="inherit">🔔</IconButton>
        <IconButton color="inherit">👤</IconButton>
      </Toolbar>
    </AppBar>
  );
}

// Sidebar Component
function Sidebar({ rooms, onRoomSelect, onAddRoom }) {
  const [open, setOpen] = useState(true);

  return (
    <Drawer variant="permanent" sx={{ width: open ? 250 : 60, flexShrink: 0 }}>
      <Box
        sx={{
          background: '#111',
          color: '#fff',
          height: '100%',
          width: open ? 250 : 60,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={1}
        >
          <Typography variant="subtitle1">Conversations</Typography>
          <IconButton
            color="inherit"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
        <Divider sx={{ bgcolor: '#333' }} />
        <List>
          {rooms.map((room, idx) => (
            <ListItem button key={idx} onClick={() => onRoomSelect(room)}>
              <ListItemText primary={room.name} />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ bgcolor: '#333' }} />
        <Box p={1}>
          <Button
            startIcon={<Add />}
            fullWidth
            variant="outlined"
            color="primary"
            onClick={onAddRoom}
          >
            Add Conversation
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

// Chat Snippet Component
function ChatSnippet({ messages }) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 2,
        overflowY: 'auto',
        background: '#1b1b1b',
        color: '#fff',
      }}
    >
      {messages.map((msg, i) => (
        <Box
          key={i}
          sx={{
            mb: 1,
            display: 'flex',
            flexDirection: msg.self ? 'row-reverse' : 'row',
          }}
        >
          <Paper
            sx={{
              p: 1,
              maxWidth: '60%',
              background: msg.self ? '#007bff' : '#333',
              color: '#fff',
            }}
          >
            <Typography variant="body2">{msg.text}</Typography>
            <Typography
              variant="caption"
              sx={{ display: 'block', textAlign: msg.self ? 'right' : 'left' }}
            >
              {msg.time}
            </Typography>
          </Paper>
        </Box>
      ))}
    </Box>
  );
}

// Input Bar Component
function InputBar({ onSend }) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <Box display="flex" alignItems="center" p={2} sx={{ background: '#111' }}>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ background: '#222', borderRadius: 1, input: { color: '#fff' } }}
      />
      <IconButton color="primary" onClick={handleSend} sx={{ ml: 1 }}>
        <Send />
      </IconButton>
    </Box>
  );
}

// Main Chat Page
export default function MatrixChatUI() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([
    { text: 'Lorem ipsum dolor sit amet.', time: '14:15', self: false },
    { text: 'Aliquam vitae turpis lorem lacinia.', time: '14:16', self: true },
  ]);

  const rooms = [
    { name: 'AX Status Management Operator' },
    { name: 'Operation Technical Personnel - 1342' },
    { name: 'Performance Status Operator' },
  ];

  const handleSend = (text) => {
    setMessages((prev) => [
      ...prev,
      { text, time: new Date().toLocaleTimeString(), self: true },
    ]);
    // TODO: send to Matrix homeserver here
  };

  const handleAddRoom = () => {
    // TODO: integrate with Matrix API to create room
    alert('Create new conversation room logic goes here');
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Navbar />
      <Box display="flex" flexGrow={1}>
        <Sidebar
          rooms={rooms}
          onRoomSelect={setSelectedRoom}
          onAddRoom={handleAddRoom}
        />
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <ChatSnippet messages={messages} />
          <InputBar onSend={handleSend} />
        </Box>
      </Box>
    </Box>
  );
}
