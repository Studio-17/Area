# Reaccoon (Area) <img align="center" src=".github/assets/area-logo.png" height=35 alt="Reaccoon Logo" />

<img align="right" width="110" src="preview.gif">

Reaccoon is an [IFTTT](https://ifttt.com/)-like Epitech project.
The goal of this project is to allow you to automatically execute some reactions according to defined actions.

You'll create an account and start connect you account to several services.

> For example :
> - **IF** I receive an email on my `GMail` address
> - **THEN**, I launch the _ZeratoR_ stream on `TwitchTV`

## :gear: Environment Variables :gear:

To run this project, you firstly need to edit your configuration environment file.

At the root of the repository, you can find a `.env.example` file containing those values :

```bash
# Available values : development, production
NODE_ENV=development

APP_HOST=localhost
APP_ENDPOINT=/api/reaccoon
API_PORT=8080
WEB_PORT=8081

#---------- BACKEND ----------#
# Database connection
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=

# JWT authentication private key
JWT_SECRET=

# SMTP services, put your email credentials here
GOOGLE_MAIL_ID=
GOOGLE_MAIL_PASSWORD=

# Google services
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Github service
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

#---------- FRONTEND ----------#
# Expo configuration
EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
# Available value : Public IP address of your computer
REACT_NATIVE_PACKAGER_HOSTNAME=
```

You just have to duplicate it as a `.env` file and to fill the empty values. **All of them are mandatory**.

## :hammer: Installation :hammer:

To use Reaccoon, clone the repository:

```bash
# Via HTTPs
git clone https://github.com/Studio-17/Area.git reaccoon
```

Go to the project directory:

```bash
cd reaccoon/
```

Then, just before running the Reaccoon application, install all the necessary dependencies.

**For that, we created a simple script to make this step easier.** :smile:

Executing the following command gives you the right to execute the installation Shell script:

```bash
chmod +x install.sh
```

Once this is done, execute the script with the following command:

```bash
./install.sh
```

## :whale: Run Locally :whale:

**As the Reaccoon is using Docker, you can manage and run the containers easily.**

The application is composed of three [services](https://docs.docker.com/compose/profiles/) :

- The `server`, which contains the API and the database.
- The `client_mobile`, which contains the mobile version of the frontend application.
- The `client_web`, which contains the mobile version of the frontend application.

To excute it you can run:

```bash
docker compose up --build
```

- The **Mobile** documentation is [here](/mobile/README.md)

- The **Web** documentation is [here](/web/README.md)

- The **Backend** documentation and the list of all the action and reactions are listed [here](/backend/README.md)

## :brain: Tech Stack :brain:

**API:** NestJS, TypeScript

**Database:** PostgreSQL

**Web Client:** ReactJS, TypeScript

**Mobile Client:** React-Native, TypeScript

## :book: Documentation :book:

Click on the following link to API endpoints documentation **(the API must be running)** : [SwaggerUI documentation](http://localhost:8000/api/docs)

You can access to the global documentation of the project [here](https://miro.com/app/board/uXjVP0EAWi0=/?share_link_id=7334968386)

## :busts_in_silhouette: Authors :busts_in_silhouette:

#### DevOps & Backend Team :

- [Martin Vanaud](https://www.github.com/martinvanaud)
- [Gurvan Le Letty](https://www.github.com/Gurvan-Le-Letty)
- [Tibo Pendino](https://www.github.com/tibo-pdn)

#### Mobile & Frontend Team :

- [Clement Fernandes](https://www.github.com/Clement-Fernandes)
- [Victor Palle](https://www.github.com/victorpalle)
- [Maxime Carabina](https://www.github.com/maxime-carabina)

Thank you for reading this documentation. :heart: