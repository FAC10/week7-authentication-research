const hapi = require('hapi');
const bcrypt = require('bcrypt');
const basic = require('hapi-auth-basic');


const server = new hapi.Server();


server.connection({
  port: 3000,
  host: 'localhost'
});


// New user creates their account
const newUser = {
  username: 'john',
  password: 'abc123',
  name: 'John Doe',
  id: '2133d32a'
};


// Number of times the password will be hashed with random data
const saltRounds = 10;


// Hash the plain text password
bcrypt.genSalt(saltRounds, function(err, salt) {
  bcrypt.hash(newUser.password, salt, function(err, hash) {
    console.log('======= newUser.password before hash: ', newUser.password);
    newUser.password = hash;
    console.log('======= newUser.password after hash: ', newUser.password);
  });
});


//  Function specific to hapi-auth-basic white
//  It allows us to verify that the user has provided valid credentials.
const validate = function(request, username, password, callback) {

  // Exit funtion if user does not exist
  const user = newUser.username;
  if (!user) {
    return callback(null, false);
  }

  // Compare the input password with the hashed password stored in database
  bcrypt.compare(password, newUser.password, (err, isValid) => {
    callback(err, isValid, {
      id: newUser.id,
      name: newUser.name
    });
  });
};



// Register the basic plugin to create authentication scheme
server.register(basic, (err) => {

  if (err) {
    throw err;
  }

  // Once you've registered your scheme, you need a way to use it.
  // This is where strategies come in.
  // Create a authentication strategy with the name 'basic'
  // 'simple' strategy and 'basic' scheme
  server.auth.strategy('simple', 'basic', {validateFunc: validate});

  server.route({
    method: 'GET',
    path: '/',
    config: {
      auth: 'simple',
      handler: function(request, reply) {
        reply(`<h1>Hello ${request.auth.credentials.name}, you are now logged in.</h1>`);
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
