# Welcome to Reaccoon web app

<p align="center">
  <a target="blank"><img src="../.github/assets/area-logo.png" width=300 alt="Reaccoon Logo" /></a>
</p>

# How to run the app ?

First, create a .env.local file in the root of the project with the following content :

```
REACT_APP_API_URL="http://localhost:8080/api/reaccoon"
PORT=8081
REACT_APP_GOOGLE_CLIENT_ID="your google client id"
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

# Technical documenations :gear:

This web application is using React with TypeScript.<br/>

## Data fetching

The state management and the API's calls are using Redux Toolkit Query.

All the API's call are located in the `serviceApi.ts` file.

Example :

This will call the route ```/service``` of the API. <br/>

```javascript
    services: builder.query<Service[], void>({
      query: () => "/service",
      providesTags: ["Service"],
    }),
```
And this is how to get the result of your fetching (in the serviceInfo) element :

```javascript
const {
  data: serviceInfo,
  refetch: refetchServiceInfos,
  isFetching: isFetchingServiceInfo,
} = useServiceQuery(service.name);
```

If you want more informations about how to use the Redux Toolkit Query, check out the [documentation](https://redux-toolkit.js.org/rtk-query/overview). <br/>

## UI elements

All the UI elements are taken from the [Material UI](https://mui.com/material-ui/getting-started/overview/) library. <br/>
Animations are taken from [Framer Motion](https://www.framer.com/motion/) library <br/>

Colors be must strictly respect the graphical chart of the Reaccoon project. <br/>
A MUI palette is set in the ```App.tsx``` file to make sure buttons will respect the right colors :

```javascript
const themeMUI = createTheme({
  palette: {
    primary: {
      main: "#0165F5",
    },
    secondary: {
      main: "#a37c5b",
    },
    warning: {
      main: "#FFF7FA",
    },
  },
});
```

For all other elements, please use the theme located in the ```./constants/theme.ts``` :

```javascript
const themeConfig = {
  palette: {
    common: {
      black: '#000',
      white: '#fff',
      grey: '#E2DDFF'
    },
    primary: '#0165F5',
    secondary: '#a37c5b',
    background: '#FFF7FA',
  },
  spacingUnit: 8
};
```
As you can see the three main colors of the Reaccoon project are : <br/>
The blue : ```#0165F5```<br/>
The brown : ```#a37c5b```<br/>
The white : ```#FFF7FA``` <br/>



## Folders organization

All new component must be function that renders JSX code. <br/>
Component that represents a whole page must be located in the ```pages``` folder, the rest must be located in the ```components``` folder. <br/>
The tottality of your css files must be located in the ```styles``` folders.


## :busts_in_silhouette: Authors :busts_in_silhouette:

DevOps & Backend Team :

- [@martinvanaud](https://www.github.com/martinvanaud)
- [@tibo-pdn](https://www.github.com/tibo-pdn)
- [@Gurvan-Le-Letty](https://www.github.com/Gurvan-Le-Letty)

Mobile & Frontend Team :

- [@maxime-carabina](https://www.github.com/maxime-carabina)
- [@victorpalle](https://www.github.com/victorpalle)
- [@Clement-Fernandes](https://www.github.com/Clement-Fernandes)
