> ⚠️ This repository is abandoned.

# Example of Web App Using Zenaton
This web app proposes a simple UI to dispatch Zenaton workflows and sends events to them. 

Written in node.js, it uses [Zenaton node.js SDK](https://github.com/zenaton/zenaton-node). It another language, it would use the [Zenaton Graphql API](https://docs.zenaton.com/client/graphql-api/).



## Project setup
First, install dependencies and build the project
```
yarn && yarn build 
```
Then, retrieve your App ID and Api Token from the [Zenaton](https://app.zenaton.com/api) Website and use them to fill the `ZENATON_APP_ID` and `ZENATON_API_TOKEN` in the `.env` file.

You can now run this project:
```
yarn express
```
The website should be now running at [http://localhost:3000/](http://localhost:3000/).

## Workflows Processings
To process the workflows triggered from this application, you must have a [Zenaton project](https://docs.zenaton.com/getting-started/setup/) running somewhere, with an Agent setup with the same credentials than within your `.env` file here, and defining your workflows in its `boot.js` file

[Zenaton boilerplate](https://github.com/zenaton/zenaton-boilerplate) is an example of such project.

## Workflow Quick Launch
You can update the `config.json` file in the `public` directory to add some quick launch shortcuts. For examples:
````json
{
  "workflows": [
    {
      "name": "DateWorkflow",
      "input": [{ "email": "john@document.com" }, { "date": 1580220000 }],
      "event": { "name": "", "data": [] }
    },
    {
      "name": "RandomWorkflow",
      "input": [],
      "event": { "name": "", "data": [] }
    },
  ]
}
````
Note: you must run `yarn build` after having changed `public/config.json` and reload the website.
