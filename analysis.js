/**
 * Components.js. :'(
 */
 
const cors = require('cors');
const {
  RuntimeConfig,
  CompositeAsyncHandler,
  DeleteOperationHandler,
  GetOperationHandler,
  PatchOperationHandler,
  // HeadOperationHandler,
  PostOperationHandler,
  PutOperationHandler,
  AcceptPreferenceParser,
  BasicRequestParser,
  BasicTargetExtractor,
  RawBodyParser,
  AllowEverythingAuthorizer,
  AuthenticatedLdpHandler,
  BasePermissionsExtractor,
  BasicResponseWriter,
  InMemoryResourceStore,
  UnsecureWebIdExtractor,
} = require('@solid/community-server');

const port = 3000;
const BASE = 'http://solidin-test.com';

let config = {
  'port': port,
  'base': BASE,
  'rootFilepath': '/'
}

const store = new InMemoryResourceStore(new RuntimeConfig(config));
// const store = new SimpleResourceStore(); // Failed

const targetExtractor = new BasicTargetExtractor();
const bodyParser = new RawBodyParser();
const preferenceParser = new AcceptPreferenceParser();
const requestParser = new BasicRequestParser({ targetExtractor, bodyParser, preferenceParser });
const credentialsExtractor = new UnsecureWebIdExtractor();
const permissionsExtractor = new BasePermissionsExtractor();
const authorizer = new AllowEverythingAuthorizer();

const handlers = [
  new DeleteOperationHandler(store),
  new GetOperationHandler(store),
  // new HeadOperationHandler(store),
  new PatchOperationHandler(store),
  new PostOperationHandler(store),
  new PutOperationHandler(store),
];
const operationHandler =new CompositeAsyncHandler(handlers);
const responseWriter = new BasicResponseWriter();
const handler = new AuthenticatedLdpHandler({
  requestParser,
  credentialsExtractor,
  permissionsExtractor,
  authorizer,
  operationHandler,
  responseWriter,
});

const express = require('express');
const app = express();
app.use((request, response, done) => {
  response.setHeader('X-Powered-By', 'Whatever');
  done();
});

// Set up Cross-Origin Resource Sharing (CORS)
// https://github.com/solid/solid-spec/blob/master/recommendations-server.md#cors---cross-origin-resource-sharing
app.use(cors());

// Delegate to the main handler
app.use(async (request, response, done) => {
  try {
    console.log(`Received request for ${request.url}`);
    await handler.handleSafe({
      request,
      response,
    });
  } catch (error) {
    const errMsg = error instanceof Error ? `${error.name}: ${error.message}\n${error.stack}` : 'Unknown error.';
    console.log.error(errMsg);
    response.status(500)
      .contentType('text/plain')
      .send(errMsg);
  } finally {
    done();
  }
});

app.listen(port, () => {
  console.log(`Solidin listening at http://localhost:${port}`);
});
