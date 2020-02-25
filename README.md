

  -  http://localhost:3000/  React component based on a mockup
  -  http://localhost:3000/task2  React component with an API
 

# Stack used 
  - react boilerplate
  - redux/saga
  - material ui
  - react hooks


React component based on a mockup:
  - created a container called Home
  - created a ItemListComponent to map over and display our items
  - asynchronous loading container with Loadable util
  - I created a store with intial Values for items, and then managed them with actions such as: deleteItem, editItem, addItem
  - Created Three Modals, probably for redability purposes should have set them in the independent container, was a bit busy this week, but still keep in mind
  - As an another edge case, I think it makes sense to add validation so we can`t save empty items.
 
RReact component with an API:
  - created a container called SecondTaskPage
  - I created a store with intial Values for fetched data, and then managed them with actions such as: fetchData, setError, setData
  - added request.js helper to fetch data and reuse it in the future
  - I used Saga for asynchronous actions like fetching data, so we can easily manage API features such as pagination, sorting, filtering
  - if you will uncomment line number 50 in saga.js inside SecondTaskPage container. we will evoke inpendent calls to the server. basically promising (yield all) to return either an error or data that we concat to the data array in the redux store. so here also it is possible to integrate pagination with Map or for loop depending on requirements.
### Installation

Dillinger requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd <foolder-name>
$ npm install
$ npm run start
```

For production environments...

```sh
$ npm install --production
$ NODE_ENV=production node app
```
### Todos

 - Add validations for dialogs for adding and removingItems
 - add meaningul pagination
