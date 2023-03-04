import { Controller, Get, HttpStatus, Req, Res, Body, Post } from '@nestjs/common';
import { ReactionDto } from 'src/cron/dto/reaction.dto';
import { GoogleEventService } from './google-event.service';

@Controller('actions/google-event')
export class GoogleEventController {
  constructor(private readonly googleEventService: GoogleEventService) {}

  @Post('/calendars/list/all')
  public async listGoogleCalendars(@Res() response, @Body() body: ReactionDto) {
    try {
      const googleCalendars = await this.googleEventService.listGoogleCalendars(body);

      const data = googleCalendars.files;
      const formIds = data.map((objects) => objects.id);

      return response.status(HttpStatus.OK).json({
        message: 'Got calendars from Google Calendar services',
        id: formIds,
        googleCalendars,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error getting calendars from Google Calendar Apis',
        error: error,
        status: 400,
      });
    }
  }

  @Post('calendars/get/byId')
  public async getGoogleCalendarsById(@Res() response, @Body() body: ReactionDto) {
    try {
      const googleCalendar = await this.googleEventService.getGoogleCalendarById(body);

      return response.status(HttpStatus.OK).json({
        message: 'Got calendar from Google Calendar services',
        googleCalendar,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error getting calendar from Google Calendar Apis',
        error: error,
        status: 400,
      });
    }
  }

  @Post('calendars/events/list/all')
  public async listGoogleCalendarsEvents(@Res() response, @Body() body: ReactionDto) {
    try {
      const googleCalendarEvents = await this.googleEventService.listGoogleCalendarsEvents(body);

      const data = googleCalendarEvents.data;
      const events = data.map((objects) => {
        const item = {};
        item['id'] = objects.id;
        item['htmlLink'] = objects.htmlLink;
        item['summary'] = objects.summary;
        item['start'] = objects.start;
        return item;
      });

      return response.status(HttpStatus.OK).json({
        message: 'Got calendar events from Google Calendar services',
        events: events,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error getting calendar events from Google Calendar Apis',
        error: error,
        status: 400,
      });
    }
  }

  @Post('calendars/events/get/byId')
  public async getGoogleCalendarEventsById(@Res() response, @Body() body: ReactionDto) {
    try {
      const googleCalendarEvent = await this.googleEventService.getGoogleCalendarEventById(body);

      return response.status(HttpStatus.OK).json({
        message: 'Got calendar event from Google Calendar services',
        googleCalendarEvent,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error getting calendar event from Google Calendar Apis',
        error: error,
        status: 400,
      });
    }
  }

  @Post('calendars/events/create')
  public async createGoogleCalendarEvent(@Res() response, @Body() body: ReactionDto) {
    try {
      const googleCalendarEvent = await this.googleEventService.createGoogleCalendarEvent(body);

      return response.status(HttpStatus.OK).json({
        message: 'Created calendar event from Google Calendar services',
        googleCalendarEvent,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error creating calendar event from Google Calendar Apis',
        error: error,
        status: 400,
      });
    }
  }

  @Post('tasks/tasklist/all')
  public async listGoogleTasksLists(@Res() response, @Body() body: ReactionDto) {
    try {
      const googleTasksLists = await this.googleEventService.listGoogleTasksList(body);

      const data = googleTasksLists.data;
      const taskLists = data.map((objects) => {
        const item = {};
        item['id'] = objects.id;
        item['title'] = objects.title;
        return item;
      });

      return response.status(HttpStatus.OK).json({
        message: 'Got tasksLists from Google Tasks services',
        tasksLists: taskLists,
        googleTasksLists,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error getting tasksLists from Google Tasks Apis',
        error: error,
        status: 400,
      });
    }
  }

  @Post('tasks/tasklist/get/byId')
  public async getGoogleTasksListById(@Res() response, @Body() body: ReactionDto) {
    try {
      const googleTasksList = await this.googleEventService.getGoogleTaskListById(body);

      return response.status(HttpStatus.OK).json({
        message: 'Got tasksLists from Google Tasks services',
        googleTasksList,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error getting tasksLists from Google Tasks Apis',
        error: error,
        status: 400,
      });
    }
  }

  @Post('tasks/tasklist/create')
  public async createGoogleTasksList(@Res() response, @Body() body: ReactionDto) {
    try {
      const googleTasksList = await this.googleEventService.createGoogleTaskList(body);

      return response.status(HttpStatus.OK).json({
        message: 'Created tasksLists from Google Tasks services',
        googleTasksList,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error creating tasksLists from Google Tasks Apis',
        error: error,
        status: 400,
      });
    }
  }

  @Post('tasks/tasks/all')
  public async listGoogleTasks(@Res() response, @Body() body: ReactionDto) {
    try {
      const googleTasks = await this.googleEventService.listGoogleTasks(body);

      const data = googleTasks.data;
      const tasks = data.map((objects) => {
        const item = {};
        item['id'] = objects.id;
        item['title'] = objects.title;
        return item;
      });

      return response.status(HttpStatus.OK).json({
        message: 'Got tasks from Google Tasks services',
        tasksLists: tasks,
        googleTasks,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error getting tasks from Google Tasks Apis',
        error: error,
        status: 400,
      });
    }
  }

  @Post('tasks/tasks/get/byId')
  public async getGoogleTasksById(@Res() response, @Body() body: ReactionDto) {
    try {
      const googleTask = await this.googleEventService.getGoogleTaskById(body);

      return response.status(HttpStatus.OK).json({
        message: 'Got tasks from Google Tasks services',
        googleTask,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error getting tasks from Google Tasks Apis',
        error: error,
        status: 400,
      });
    }
  }

  @Post('tasks/tasks/create')
  public async createGoogleTask(@Res() response, @Body() body: ReactionDto) {
    try {
      const googleTask = await this.googleEventService.createGoogleTask(body);

      return response.status(HttpStatus.OK).json({
        message: 'Created tasks from Google Tasks services',
        googleTask,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error creating tasks from Google Tasks Apis',
        error: error,
        status: 400,
      });
    }
  }

  @Post('tasks/tasks/complete')
  public async completeGoogleTask(@Res() response, @Body() body: ReactionDto) {
    try {
      const googleTask = await this.googleEventService.completeGoogleTask(body);

      return response.status(HttpStatus.OK).json({
        message: 'Completed tasks from Google Tasks services',
        googleTask,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error completing tasks from Google Tasks Apis',
        error: error,
        status: 400,
      });
    }
  }
}
