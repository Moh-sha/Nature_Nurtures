
# Nature_Nurtures

Project Domain: Tree Plantation ,This is nestjs project . I have used nestjs and postgresql ,postman api .I have use relational database ,crud ,session ,session guard ,transmission ,validation ,mailer,exception handling,nestjs architecture ,typerorm,fileupload,typescript


## API Reference

#### Post all items

```Post/api/http://localhost:3000/admin/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `http://localhost:3000/admin/signup` | `string` | **Required**. session |




## Documentation

[Documentation](https://linktodocumentation)


## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```
    
## Roadmap
Introduction
Nest (NestJS) is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript, is built with and fully supports TypeScript (yet still enables developers to code in pure JavaScript), and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).


Building a platform: Nest from the ground up Kamil Mysliwiec
JSPoland Warsaw 2018
Why use NestJS?
Nest provides a level of abstraction above these common Node.js frameworks (Express/Fastify) but also exposes their APIs directly to the developer. This allows developers the freedom to use the myriad of third-party modules which are available for the underlying platform.

There are superb libraries, helpers, and tools that exist for Node (and server-side JavaScript), none of them effectively solve the main problem of — Architecture.

Nest provides an out-of-the-box application architecture that allows developers and teams to create highly testable, scalable, loosely coupled, and easily maintainable applications. The architecture is heavily inspired by Angular.


NestJS Overview
Features of NestJS

Extensible Approach
Easy to use, learn and master
Command Line Interface(CLI)
Versatile
Progressive
Implemented Based on SOLID Principles
Lazy and Dynamic Modules
API Versioning
Documentation
Open Source
Large & Active Community
NestJS Roadmap
Few Core topics every Nest Developer should know:

Controllers
Providers
Modules
Middleware
Exceptions and Error Handling
Pipes
Guards
Interceptors

Nest JS Roadmap (v1)
GitHub - santoshshinde2012/nestjs-mindmaps: A mindmap summarising nestjs concepts
A mindmap summarising nestjs concepts. Contribute to santoshshinde2012/nestjs-mindmaps development by creating an…
github.com

NestJS is having a great ecosystem with a huge set of libraries. It does not make sense to know each and every library but yes having an understanding of at least the most commonly used adds value.

Please check the official documentation of NestJS as they are having detailed documentation for each component.

Documentation | NestJS - A progressive Node.js framework
Nest is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript…
docs.nestjs.com

NestJS Request & Response Lifecycle
Nest applications handle requests and produce responses in a sequence we refer to as the request lifecycle.

With the use of middleware, pipes, guards, and interceptors, it can be challenging to track down where a particular piece of code executes during the request lifecycle, especially as global, controller level, and route level components come into play.

In general, a request flows through middleware to guards, then to interceptors, then to pipes and finally back to interceptors on the return path (as the response is generated).


## Running Tests

To run tests, run the following command

```bash
  npm run test
```

