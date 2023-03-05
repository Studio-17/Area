# Welcome to Reaccoon web app

## How to run the app ?

First, create a .env.local file in the root of the project with the following content :

```
REACT_APP_API_URL=
PORT=
REACT_APP_GOOGLE_CLIENT_ID=
```

**To launch the app in dev mode do the following commands:**

```
npm install
```

Then:

```
npm start
```

You can also use docker to run in dev mode : 

```
sudo docker-compose -f docker-compose.dev.yml up
```