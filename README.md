# Unix Timestamp Converter Testing

## How to Run

### 1. Install Dependencies

```bash
npm install

Additionally, install k6 depending on your operating system:
https://grafana.com/docs/k6/latest/set-up/install-k6/

```

### 2. Run React.js Application

Build and start the React application:
```bash
npm run build
npm run dev

```

### 3. Run Cypress Tests

To open Cypress in interactive mode:
```bash
npx cypress open

```
To run Cypress tests headlessly (mocha reports will be generated):
"cypress\reports\html\index.html"
```bash
npx cypress run

```

### 4. Run Performance Tests with k6

Run the performance test script:
```bash
k6 run performance/perf-test.js
```

For more detailed information, please refer to the [ReadMe.doc](./ReadMe.doc) 
 file.
