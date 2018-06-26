# polls

## Notes:

Api for /questions does not provide Access-Control-Expose-Headers so direct access to links in the header is not allowed.
To fix this a simple express proxy is provided to route the requests.
Also if proxy is not used, but the original url, the page navigation will be just disabled.
It can be worked around with "probing" for next page in the background and with no proxy.

Getting questions is "slow". After voting the vote does not apply in the fetching from the server for some time.
As we fetch the details the question details on preview the votes might fall back to the old value if we click fast.

### To install:

```bash
$ npm install
```

### To develop:

```bash
$ npm run dev
```

### To build for production:

```bash
$ npm run build
```

### To lint you code:

```bash
$ npm run lint
```

### To run unit tests

```bash
$ npm run unit
```

### To run unit tests with --watch

```bash
$ npm run tdd
```

### To run unit tests and e2d

```bash
$ npm run test
```

### Docsify init

```bash
$ npm run docs-init
```

### Docsify serve

```bash
$ npm run docs-serve
```

#### ToDo:

- implement e2e
- bit more unit tests
- split store into multiple modules maybe to make it cleaner
- generate documentation
- multilanguage support
