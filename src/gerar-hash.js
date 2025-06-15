const bcrypt = require('bcrypt');

const senha = 'senha654';
const saltRounds = 10;

bcrypt.hash(senha, saltRounds, function(err, hash) {
  if (err) throw err;
  console.log('Hash gerado:', hash);
});
