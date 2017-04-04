# week7-authentication-research

### Authentication

Authentication within hapi is based on the concept of `schemes` and `strategies`.

Think of a scheme as a general type of auth, like `"basic"` or `"digest"`. A strategy on the other hand, is a pre-configured and named instance of a scheme.

The authenticate method has a signature of function `(request, reply)`, and is the only required method in a scheme.

### Bcrypt


### Hapi-auth-basic
https://github.com/hapijs/hapi-auth-basic

- Basic authentication requires validating a username and password combination.

### Glossary

- **Scheme** - *a general type of auth, like "basic" or "digest"*
  - A scheme is a method with the signature `function (server, options)`. The server parameter is a reference to the server the scheme is being added to, while the options parameter is the configuration object provided when registering a strategy that uses this scheme.
  - To register a scheme, use either `server.auth.scheme(name, scheme)`. The name parameter is a string used to identify this specific scheme.
- **Strategy** - *a pre-configured and named instance of a scheme.*
  - Once you've registered your scheme, you need a way to use it. This is where strategies come in.
  - To register a strategy, we must first have a scheme registered. Once that's complete, use `server.auth.strategy(name, scheme, [mode], [options])` to register your strategy.
