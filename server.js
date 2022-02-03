const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date(),
    }
  ],
  login: [
    {
      id: '123',
      password: 'cookies',
    },
    {
      id: '124',
      password: 'bananas',
    }
  ]
};

app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    res.send(database.users[0])
  } else {
    res.status(400).json('error logging in');
  }
})

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  database.users.push({
    id: '125',
    name: name,
    email: email,
    entries: 0,
    joined: new Date(),
  }); 
  res.send(database.users[database.users.length - 1])
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  database.users.forEach(user => {
    if (user.id === id) {
      return res.json(user);
    }
  });
  res.status(404).json('user not found');
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  database.users.forEach(user => {
    if (user.id === id) {
      user.entries++;
      return res.json(user.entries);
    }
  });
  res.status(404).json('user not found');
})

app.listen(3000, () => {
  console.log("App is running on port 3000");
})