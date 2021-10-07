const fs = require('fs');
const authActions = require('./authActions');

const actions = {
  logIn: authActions.logIn,
  signUp: authActions.signUp,
};

const handler = (req, res, action, file) => {
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 1, text: err }));
    } else {
      switch (action) {
        case 'logIn':
          const uid =  actions[action](JSON.parse(data), req);
          if (uid) {
            res.send(JSON.stringify({result: 0, uid: uid}));
          } else {
            res.send(JSON.stringify({result: 2, text: 'Неверный логин или пароль'}))
          }
          break;
        
        case 'signUp':
          const newRegistredUsersList = actions[action](JSON.parse(data), req);

          if (newRegistredUsersList) {
            fs.writeFile(file, newRegistredUsersList, (err) => {
              if (err) {
                res.sendStatus(404, JSON.stringify({ result: 0, text: err }))
              } else {
                res.send(JSON.stringify({ result: 0, text: 'Успешно!' }))
              }
            });    
          } else {
            res.send(JSON.stringify({ result: 2, text: 'Такой пользователь уже существует'}))
          }

          break;      
        default:
          res.send(JSON.stringify({ result: 0, text: 'ничего' }));
          break;
      }
    }
  });
};

module.exports = handler;
