const hapi = require('hapi');
const bcrypt = require('bcrypt');
const basic = require('hapi-auth-basic');


const server = new hapi.Server();


server.connection({
  port: 3000,
  host: 'localhost'
});


// coming from front when the user creates their account
// this is not saved in out database
const newUser = {
  username: 'john',
  password: 'abc123',
  name: 'John Doe',
  id: '2133d32a'
};


const saltRounds = 10;

bcrypt.genSalt(saltRounds, function(err, salt) {
  bcrypt.hash(newUser.password, salt, function(err, hash) {
    newUser.password = hash;
  });
});


// validation function
const validate = function(request, username, password, callback) {
  // check if user exists
  const user = newUser.username;
  if (!user) {
    return callback(null, false);
  }

  //
  bcrypt.compare(password, newUser.password, (err, isValid) => {
    callback(err, isValid, {
      id: newUser.id,
      name: newUser.name
    });
  });
};



server.register(basic, (err) => {

  if (err) {
    throw err;
  }

  server.auth.strategy('simple', 'basic', {validateFunc: validate});

  server.route({
    method: 'GET',
    path: '/',
    config: {
      auth: 'simple',
      handler: function(request, reply) {
        console.log('====-==', request.auth.credentials);
        reply('hello, ' + request.auth.credentials.name);
      }
    }
  });

  server.start((err) => {

    if (err) {
      throw err;
    }

    console.log('server running at: ' + server.info.uri);
  });
});
