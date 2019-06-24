# Electron Communicator

An electron router that has a similar interface/usage as an HTTP server, Express, and similar libraries.

## Usage

In electron:
```ts
import { mainTransponder } from 'electron-transponder';

const routes = {
  'api/users': {
    func: (req, res) => {
      let orgId = req.data.organization_id;

      return [
        {
          id: 1,
          name: 'test'
        }
      ];
    },
    method: 'GET',
    url: 'api/users',
  },
};

mainTransponder.registerRoutes(routes);

```

In front-end:

```ts
import { renderTransponder, requestMethods } from 'electron-transponder';

let users = await renderTansponder.request('GET' || requestMethods.GET, 'api/users', {
  organization_id: 3
});
```
