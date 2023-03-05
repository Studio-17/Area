import { HttpException, Injectable } from '@nestjs/common';
import { ReactionDto } from '../../../cron/dto/reaction.dto';
import { getElemContentInParams } from '../../../cron/utils/getElemContentInParams';
import { catchError, lastValueFrom, map } from 'rxjs';
import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class GoogleEventService {
  constructor(private readonly httpService: HttpService) {}

  // ----------------------- CALENDAR -----------------------
  public async listGoogleCalendars(accessToken: string): Promise<any> {
    const calendars = await lastValueFrom(
      this.httpService
        .get('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error.message);
            throw new HttpException(() => error.message, error.status);
          }),
        ),
    );

    // items.id

    return calendars;
  }

  public async getGoogleCalendarById(accessToken: string, calendarId: string): Promise<any> {
    // const calendarId = getElemContentInParams(body.params, 'calendarId', '', body.returnValues);

    const calendar = await lastValueFrom(
      this.httpService
        .get(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error.message);
            throw new HttpException(() => error.message, error.status);
          }),
        ),
    );

    return calendar;
  }

  public async listGoogleCalendarsEvents(accessToken: string, calendarId: string): Promise<any> {
    // const calendarId = getElemContentInParams(body.params, 'calendarId', '', body.returnValues);

    const events = await lastValueFrom(
      this.httpService
        .get(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error.message, error.status);
          }),
        ),
    );

    // items.id
    // items.htmlLink
    // items.summary
    // items.start

    return events;
  }

  public async getGoogleCalendarEventById(body: ReactionDto): Promise<any> {
    const calendarId = getElemContentInParams(body.params, 'calendarId', '', body.returnValues);
    const eventId = getElemContentInParams(body.params, 'eventId', '', body.returnValues);

    const event = await lastValueFrom(
      this.httpService
        .get(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${body.accessToken}`,
          },
        })
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error.message, error.status);
          }),
        ),
    );

    return event;
  }

  public async createGoogleCalendarEvent(body: ReactionDto): Promise<any> {
    const calendarName = getElemContentInParams(body.params, 'calendarName', '', body.returnValues);
    const calendar = await this.listGoogleCalendars(body.accessToken)
      .then((calendars) => {
        return calendars.items.find((calendar) => calendar.summary === calendarName).id;
      })
      .catch(() => 'primary');
    const location = getElemContentInParams(body.params, 'eventLocation', '', body.returnValues);
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const date = year + '-' + month + '-' + day;
    const startDate = getElemContentInParams(
      body.params,
      'eventStartDate',
      date,
      body.returnValues,
    );
    const content = getElemContentInParams(body.params, 'eventContent', '', body.returnValues);

    const event = await lastValueFrom(
      this.httpService
        .post(
          `https://www.googleapis.com/calendar/v3/calendars/${calendar}/events?sendUpdates=all`,
          {
            summary: content,
            location: location,
            start: {
              date: startDate,
            },
            end: {
              date: startDate,
            },
          },
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${body.accessToken}`,
            },
          },
        )
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error.message, error.status);
          }),
        ),
    );

    return event;
  }

  // ----------------------- TASKS -----------------------
  public async listGoogleTasksList(body: ReactionDto): Promise<any> {
    const tasksLists = await lastValueFrom(
      this.httpService
        .get('https://tasks.googleapis.com/tasks/v1/users/@me/lists', {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${body.accessToken}`,
          },
        })
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error.message, error.status);
          }),
        ),
    );

    // items.id
    // items.title

    return tasksLists;
  }

  public async getGoogleTaskListById(body: ReactionDto): Promise<any> {
    const taskListId = getElemContentInParams(body.params, 'taskListId', '', body.returnValues);

    const tasksList = await lastValueFrom(
      this.httpService
        .get(`https://tasks.googleapis.com/tasks/v1/users/@me/lists/${taskListId}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${body.accessToken}`,
          },
        })
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error.message, error.status);
          }),
        ),
    );

    return tasksList;
  }

  public async createGoogleTaskList(body: ReactionDto): Promise<any> {
    const title = getElemContentInParams(body.params, 'title', '', body.returnValues);

    const taskList = await lastValueFrom(
      this.httpService
        .post(
          `https://tasks.googleapis.com/tasks/v1/users/@me/lists`,
          {
            title: title,
            kind: 'tasks#taskList',
          },
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${body.accessToken}`,
            },
          },
        )
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error.message, error.status);
          }),
        ),
    );

    return taskList;
  }

  public async listGoogleTasks(body: ReactionDto): Promise<any> {
    const taskListId = getElemContentInParams(body.params, 'taskListId', '', body.returnValues);

    const tasks = await lastValueFrom(
      this.httpService
        .get(`https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${body.accessToken}`,
          },
        })
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error.message, error.status);
          }),
        ),
    );

    // items.id
    // items.title

    return tasks;
  }

  public async getGoogleTaskById(body: ReactionDto): Promise<any> {
    const taskListId = getElemContentInParams(body.params, 'taskListId', '', body.returnValues);
    const taskId = getElemContentInParams(body.params, 'taskId', '', body.returnValues);

    const task = await lastValueFrom(
      this.httpService
        .get(`https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks/${taskId}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${body.accessToken}`,
          },
        })
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error.message, error.status);
          }),
        ),
    );

    return task;
  }

  public async createGoogleTask(body: ReactionDto): Promise<any> {
    const taskListId = getElemContentInParams(body.params, 'taskListId', '', body.returnValues);
    const title = getElemContentInParams(body.params, 'title', '', body.returnValues);
    // Format: yyyy-MM-dd'T'HH:mm:ss'Z'
    const dueDate = getElemContentInParams(
      body.params,
      'dueDate',
      '2023-03-11T0:45:26.000Z',
      body.returnValues,
    );

    const task = await lastValueFrom(
      this.httpService
        .post(
          `https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks`,
          {
            title: title,
            kind: 'tasks#task',
            status: 'needsAction',
            due: dueDate,
          },
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${body.accessToken}`,
            },
          },
        )
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error.message, error.status);
          }),
        ),
    );

    return task;
  }

  public async completeGoogleTask(body: ReactionDto): Promise<any> {
    const taskListId = getElemContentInParams(body.params, 'taskListId', '', body.returnValues);
    const taskId = getElemContentInParams(body.params, 'taskId', '', body.returnValues);

    const task = await lastValueFrom(
      this.httpService
        .put(
          `https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks/${taskId}`,
          {
            kind: 'tasks#task',
            status: 'completed',
          },
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${body.accessToken}`,
            },
          },
        )
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error.message, error.status);
          }),
        ),
    );

    return task;
  }
}
