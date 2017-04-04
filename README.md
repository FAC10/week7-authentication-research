# week7-authentication-research

### Authentication

Authentication within hapi is based on the concept of `schemes` and `strategies`.

Think of a `scheme` as a general type of auth, like `"basic"` or `"digest"`. You can think of a scheme as a template for authentication. A scheme isn’t used directly to authenticate users - instead you create a specific strategy from the scheme.

A `strategy` is a pre-configured and named instance of a scheme. Strategies exist so you can use the same scheme several times, in a slightly different way. For instance, might decide to you want use basic authentication in your app. For some routes you might wish to validate a user’s passwords against a value in a database and for some other routes, you might wish to check the password against a value stored in a text file. In this case you can create 2 different strategies from the scheme.

![3bksb](https://cloud.githubusercontent.com/assets/20152018/24664718/4b73c99a-1953-11e7-8c58-02c5f9d04d6f.png)


The authenticate method has a signature of `function (request, reply)`, and is the only required method in a scheme.

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

### Resources

[Bcrypt docs](https://www.npmjs.com/package/bcrypt)

[Authentication tutorial](https://hapijs.com/tutorials/auth)
