<!-- omit in toc -->
# Contributing to Area

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to help and details about how this project handles them. Please make sure to read the relevant section before making your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved. The community looks forward to your contributions. 🎉

> And if you like the project, but just don't have time to contribute, that's fine. There are other easy ways to support the project and show your appreciation, which we would also be very happy about:
> - Star the project
> - Tweet about it
> - Refer this project in your project's readme
> - Mention the project at local meetups and tell your friends/colleagues

## Table of Contents

- [I Have a Question](#i-have-a-question)
- [I Want To Contribute](#i-want-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
  - [Improving The Documentation](#improving-the-documentation)
- [Styleguides](#styleguides)
  - [Commit Messages](#commit-messages)
- [Join The Project Team](#join-the-project-team)

## I Have a Question

> If you want to ask a question, we assume that you have read the available [Documentation]().

Before you ask a question, it is best to search for existing [Issues](https://github.com/EpitechPromo2025/B-DEV-500-PAR-5-2-area-martin.vanaud/issues) that might help you. In case you have found a suitable issue and still need clarification, you can write your question in this issue. It is also advisable to search the internet for answers first.

If you then still feel the need to ask a question and need clarification, we recommend the following:

- Open an [Issue](https://github.com/EpitechPromo2025/B-DEV-500-PAR-5-2-area-martin.vanaud/issues/new).
- Provide as much context as you can about what you're running into.
- Provide project and platform versions (nodejs, npm, etc), depending on what seems relevant.

We will then take care of the issue as soon as possible.

<!--
You might want to create a separate issue tag for questions and include it in this description. People should then tag their issues accordingly.

Depending on how large the project is, you may want to outsource the questioning, e.g. to Stack Overflow or Gitter. You may add additional contact and information possibilities:
- IRC
- Slack
- Gitter
- Stack Overflow tag
- Blog
- FAQ
- Roadmap
- E-Mail List
- Forum
-->

## I Want To Contribute

> ### Legal Notice <!-- omit in toc -->
> When contributing to this project, you must agree that you have authored 100% of the content, that you have the necessary rights to the content and that the content you contribute may be provided under the project license.

```bash
git clone git@github:EpitechPromo2025/...
```

Next you will copy the .env.example file to an .env file and fill all empty values

- If you want to run everything:
```bash
docker-compose --profile all up
```

- If You want to run only the backend:
```bash
docker-compose --profile backend up
```

- If You want to run only the web app (with the backend):
```bash
docker-compose --profile web up
```

- If You want to run only the mobile app (with the backend):
```bash
docker-compose --profile mobile up
```

### Reporting Bugs

<!-- omit in toc -->
#### Before Submitting a Bug Report

A good bug report shouldn't leave others needing to chase you up for more information. Therefore, we ask you to investigate carefully, collect information and describe the issue in detail in your report. Please complete the following steps in advance to help us fix any potential bug as fast as possible.

- Make sure that you are using the latest version.
- Determine if your bug is really a bug and not an error on your side e.g. using incompatible environment components/versions (Make sure that you have read the [documentation](). If you are looking for support, you might want to check [this section](#i-have-a-question)).
- To see if other users have experienced (and potentially already solved) the same issue you are having, check if there is not already a bug report existing for your bug or error in the [bug tracker](https://github.com/EpitechPromo2025/B-DEV-500-PAR-5-2-area-martin.vanaud/issues?q=label:bug).
- Also make sure to search the internet (including Stack Overflow) to see if users outside of the GitHub community have discussed the issue.
- Collect information about the bug:
  - Stack trace (Traceback)
  - OS, Platform and Version (Windows, Linux, macOS, x86, ARM)
  - Version of the interpreter, compiler, SDK, runtime environment, package manager, depending on what seems relevant.
  - Possibly your input and the output
  - Can you reliably reproduce the issue? And can you also reproduce it with older versions?

<!-- omit in toc -->
#### How Do I Submit a Good Bug Report?

> You must never report security related issues, vulnerabilities or bugs including sensitive information to the issue tracker, or elsewhere in public. Instead sensitive bugs must be sent by email to <studio17@epitech.eu>.
<!-- You may add a PGP key to allow the messages to be sent encrypted as well. -->

We use GitHub issues to track bugs and errors. If you run into an issue with the project:

- Open an [Issue](https://github.com/EpitechPromo2025/B-DEV-500-PAR-5-2-area-martin.vanaud/issues/new). (Since we can't be sure at this point whether it is a bug or not, we ask you not to talk about a bug yet and not to label the issue.)
- Explain the behavior you would expect and the actual behavior.
- Please provide as much context as possible and describe the *reproduction steps* that someone else can follow to recreate the issue on their own. This usually includes your code. For good bug reports you should isolate the problem and create a reduced test case.
- Provide the information you collected in the previous section.

Once it's filed:

- The project team will label the issue accordingly.
- A team member will try to reproduce the issue with your provided steps. If there are no reproduction steps or no obvious way to reproduce the issue, the team will ask you for those steps and mark the issue as `needs-repro`. Bugs with the `needs-repro` tag will not be addressed until they are reproduced.
- If the team is able to reproduce the issue, it will be marked `needs-fix`, as well as possibly other tags (such as `critical`), and the issue will be left to be [implemented by someone](#your-first-code-contribution).

<!-- You might want to create an issue template for bugs and errors that can be used as a guide and that defines the structure of the information to be included. If you do so, reference it here in the description. -->


### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for Area, **including completely new features and minor improvements to existing functionality**. Following these guidelines will help maintainers and the community to understand your suggestion and find related suggestions.

<!-- omit in toc -->
#### Before Submitting an Enhancement

- Make sure that you are using the latest version.
- Read the [documentation]() carefully and find out if the functionality is already covered, maybe by an individual configuration.
- Perform a [search](https://github.com/EpitechPromo2025/B-DEV-500-PAR-5-2-area-martin.vanaud/issues) to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.
- Find out whether your idea fits with the scope and aims of the project. It's up to you to make a strong case to convince the project's developers of the merits of this feature. Keep in mind that we want features that will be useful to the majority of our users and not just a small subset. If you're just targeting a minority of users, consider writing an add-on/plugin library.

<!-- omit in toc -->
#### How Do I Submit a Good Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://github.com/EpitechPromo2025/B-DEV-500-PAR-5-2-area-martin.vanaud/issues).

- Use a **clear and descriptive title** for the issue to identify the suggestion.
- Provide a **step-by-step description of the suggested enhancement** in as many details as possible.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why. At this point you can also tell which alternatives do not work for you.
- You may want to **include screenshots and animated GIFs** which help you demonstrate the steps or point out the part which the suggestion is related to. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux. <!-- this should only be included if the project has a GUI -->
- **Explain why this enhancement would be useful** to most Area users. You may also want to point out the other projects that solved it better and which could serve as inspiration.

<!-- You might want to create an issue template for enhancement suggestions that can be used as a guide and that defines the structure of the information to be included. If you do so, reference it here in the description. -->

### Your First Code Contribution
Follow the next guidelines for any contribution on this repository

- [Add a new service](#add-a-new-service)
- [Add a new action](#add-a-new-action)
- [Add a new reaction](#add-a-new-reaction)
<br/>

#### **Add a new service**
First you have to implement the connection of this service. If it don't need connection, skip this step.
Add a new module in [extern service connection](/backend/src/externService/oauth2/). You can see example in this folder to help you.

The controller of your service is named `/service/connect` and need to have two routes:
- `/serviceName` (GET) will return the external connection url.
- `/serviceName/redirect` is the redirect called in the redirect_uri of external connection url.

The user can now connect to the service

All the logic of your service actions / reactions have to be coded in an other module located in the [extern service service](/backend/src/externService/service/) folder. So create a new module in the folder with the name of your service. It have to contains a crontroller, a service and a cron.service.

Now you will add the service to the service list of the Reaccoon application.
- Add in the [ServiceList](/backend/src/service/entity/service.entity.ts#L3) enum the service name.
```ts
export enum ServiceList {
  ...
  SERVICENAME = 'servicename'
}
```

- Add in the [service Seeder](/backend/config/seeder/service.seeder.ts#L14) the sevice information
```ts
async seed() {
    const services = [
      ...
      {
        name: ServiceList.SERVICENAME
        description: 'the description of the service'
        color: '#000000' (used in front side)
        type: ServiceType.EXTERNAL | ServiceType.INTERNAL
      }
    ]
}
```
> The type of your service is external if it need a connection or internal if it doesn't

- Add the modules in the [app module imports](/backend/src/app.module.ts#L40) (your oauth module and service module).

- Add the service in the [appController about Json list](/backend/src/app.controller.ts#L33)
```ts
server: {
  services: [
    ...
    {
      name: 'serviceName',
      actions: [
        { name: undefined, description: undefined },
      ],
      reactions: [
        { name: undefined description: undefined },
      ],
    },
  ]
}
```


Congratulations, you added a new service !


#### **Add a new action**

All your external API call will be added in function in the `.service` of your service.

The action will run in a cron, that is generated with a generic method. All you have to do is to develop the logic function of the action. In fact it will check if the action is triggered or not.

This function will be added in the `.cron.service`. The function to add the action Cron will call a map containing the list of available services that contains map of available actions of the service.

In your `.cron.service` add a map (usually named availableActions):
```ts
 availableActions = new Map<string, ActionFunction>();
```
> ActionFunction is an interface that we will see later the details.

In the [myAction service](/backend/src/myAction/myAction.service.ts) add this map to the map of [available service Actions]((/backend/src/myAction/myAction.service.ts#L113)):
```ts
 availableActions = new Map<string, Map<string, ActionFunction>>([
    ...
    [ServiceList.SERVICENAME, this.serviceNameCronService.availableActions],
  ]);
```
> Don't forget to add serviceNameCronService in the constructor of the myActionservice and to import the ServiceNameModule in myActionModule.

Now the app can call your future action when the user create an area.

The format of your function have is specific. It is an [ActionFunction](/backend/src/cron/interfaces/actionFunction.interface.ts)
```ts
(actionParam: ActionParam): Promise<ActionResult>;
```
The [actionParam](/backend/src/cron/interfaces/actionParam.interface.ts) have 3 elements:
- accessToken: The token of the user of the service (created in the service connect). Is empty and not used if it is an internal service.
- myActionId: The uuid in the database of the created action of the area (used later to store some data of your action).
- [params](/backend/src/cron/type/param.type.ts): list of params sent by the user to be used in the action (see later how to use them).

The [ActionResult](/backend/src/cron/interfaces/actionResult.interface.ts) have 2 elements:
- isTriggered: a boolean to know if your action is triggered.
- [returnValues](/backend/src/cron/type/returnValue.type.ts): a list of value that the action will return tu be used by the reaction (see how to set them later).

You can now develop your action function. If the request of your external Api requires some arguments, you have to get them from the params. To do that, you can use the [getElemContentInParams](/backend/src/cron/utils/getElemContentInParams.ts) function.
```ts
    const elem = getElemContentInParams(body.params, 'nameOfElemInParams', 'standartValue', []);
```
> You can chose what is the name of your element(see later where we gonna define it) and his standart value.

In most case, the function will compare a past value with the new gotten by the call of api to check if it has changed, so you have to store the value to use it at the next iteration.
You can store it in the [ActionReccord](/backend/src/cron/entity/actionRecord.entity.ts) entity.

Some [functions](/backend/src/cron/cron.service.ts) are related to this entity.

[To create a new local record](/backend/src/cron/cron.service.ts#L81):
```ts
  const record = this.cronService.createRecord(actionParam.myActionId, 'category', content);
```
> the category is a name of your choice to store it and difference them if you have plurial values to store

> the content of your choice in string format

[To get the stored record](/backend/src/cron/cron.service.ts#L38):
```ts
  const record = await this.cronService.findByActionId(actionParam.myActionId, 'category');
```

[To store a new record](/backend/src/cron/cron.service.ts#L49) (it will replace the past one):
```ts
  const newReccord = this.cronService.createReccord(actionParam.myActionId, 'category', content);

  const isChanged = await this.cronService.findOrUpdateLastRecord(newReccord);
```
The function will store the new value at the place of the past one but it will compare it before. if it changed, it will return true.

It can be very helpful to reduce the code in your action fucntion.

After having devolopped your fucntion, you can add it to the `availableAction` map previously created.
```ts
availableActions = new Map<string, ActionFunction>(
  ['fake/path/to/the/action', this.actionFunction.bind(this)],
)
```
> the left part of the map is a fake path to the action

If the action return some values, you can add them in the returnValues field:
```ts
return { isTriggered: true,
  returnValues: [
    { name: 'valueNameOne', content: content.value1 },
    { name: 'valueNametwo', content: content.value2 },
  ],
}
```
> the names of the returnValues is your choice.

Your action is now complete. The last thing you have to do is to add it in the [action seeders](/backend/config/seeder/action.seeder.ts) for the users:
```ts
const actions = [
  ...
  {
    uuid: 'd1e11414-32b5-40fa-852c-60eaacfb7e2c',
    service: ServiceList.SERVICENAME,
    type: ActionType.ACTION,
    name: 'action name',
    params: [{ name: 'param sample', type: 'string', description: 'description of the param.' }],
    returnValues: [{ name: 'returnValueO1', type: 'string', description: 'description of the return value.' }],
    description:
      'description of the action',
    link: 'fake/path/to/the/action',
  },
]
```
> the params field are the params you have used (from the actionParam.params). the name have to be the same as you defined in your function. the type is for the front side. The same shit with the returnValues.

Finally, finish by add the action in the [aboutJson](/backend/src/app.controller.ts#L31)
```ts
server: {
  services: [
    ...
    {
      name: 'serviceName',
      actions: [
        { name: 'name of the action', description: 'description of the action.' },
      ],
      reactions: [
        { name: undefined description: undefined },
      ],
    },
  ]
}
```

#### **Add a new reaction**
To implement a reaction, it is spimplier. All you have to do is to add it in your `service.controller` as a Post request.
```ts
@Controller('actions/serviceName')
export class ServiceNameController {
  constructor(private readonly serviceNameService: ServiceNameService) {}

  @Post('/reactionName')
  public async getAuthenticatedUserTopArtists(@Res() response, @Body() body: ReactionDto) {
    try {
      const result = await this.serviceNameService.reactionFunction(body);

      return response.status(HttpStatus.OK).json({
        message: 'all is ok',
        result,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error in the reaction services',
        error: error,
        status: 400,
      });
    }
  }
}
```
> your controller must be named `actions/serviceName`

The reaction controller have a [ReactionDto](/backend/src/cron/dto/reaction.dto.ts) as body:
- accessToken: The token of the user of the service (created in the service connect). Is empty and not used if it is an internal service
- [params](/backend/src/cron/type/param.type.ts): list of params sent by the user to be used in the reaction (see later how to use them).
- [returnValues](/backend/src/cron/type/param.type.ts): list of return values sent back by the action when it was triggered (you don't have to handle them except call specific function using them. see just later to see the case).

To get the content of a param:
```ts
const elem = getElemContentInParams(body.params, 'nameOfElemInParams', 'standartValue', body.returnValues);
```
> this is the only case where the returnValues will be used

> The name of the element and the standart value is your choice


Your reaction is now complete. The last thing you have to do is to add it in the [action seeders](/backend/config/seeder/action.seeder.ts) for the users:
```ts
const actions = [
  ...
  {
    uuid: 'd1e11414-32b5-40fa-852c-60eaacfb7e2c',
    service: ServiceList.SERVICENAME,
    type: ActionType.REACTION,
    name: 'reaction name',
    params: [{ name: 'param sample', type: 'string', description: 'description of the param.' }],
    description:
      'description of the action',
    link: 'serviceName/reactionName/',
  },
]
```
> the params field are the params you have used (from the actionParam.params). the name have to be the same as you defined in your function. the type is for the front side.

Finally, finish by add the reaction in the [aboutJson](/backend/src/app.controller.ts#L31)
```ts
server: {
  services: [
    ...
    {
      name: 'serviceName',
      actions: [
        { name: undefined description: undefined },
      ],
      reactions: [
        { name: 'name of the reaction', description: 'description of the reaction.' },
      ],
    },
  ]
}
```




### Improving The Documentation
The usage of DOxygen is mandatory, please document your functions, methods, class and other instances
Feel free to be as detailed as possible.

## Styleguides
### Commit Messages
https://www.conventionalcommits.org/en/v1.0.0/#specification
