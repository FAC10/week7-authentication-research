const bcrypt = require('bcrypt');
const hapi = require('hapi');
const basic = require('hapi-auth-basic');

const server = new hapi.Server();
server.connection({port: 3000});

const users = {
  john: {
    username: 'john',
    password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm', // 'secret'
    name: 'John Doe',
    id: '2133d32a'
  }
};

const validate = function(request, username, password, callback) {
  const user = users[username];
  if (!user) {
    return callback(null, false);
  }

  bcrypt.compare(password, user.password, (err, isValid) => {
    callback(err, isValid, {
      id: user.id,
      name: user.name
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
