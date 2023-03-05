import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CronService } from 'src/cron/cron.service';
import { ActionFunction } from 'src/cron/interfaces/actionFunction.interface';
import { ActionParam } from 'src/cron/interfaces/actionParam.interface';
import { ActionResult } from 'src/cron/interfaces/actionResult.interface';
import { getElemContentInParams } from 'src/cron/utils/getElemContentInParams';
import { GoogleEventService } from './google-event.service';

@Injectable()
export class GoogleEventCronService {
  constructor(
    private readonly googleEventService: GoogleEventService,
    private readonly cronService: CronService,
  ) {}

  public async checkNewCalendar(actionParam: ActionParam): Promise<ActionResult> {
    try {
      const calendars = await this.googleEventService.listGoogleCalendars(actionParam.accessToken);
      const record = this.cronService.createRecord(
        actionParam.myActionId,
        'nbCalendars',
        calendars.items.length.toString(),
      );
      const pastRecord = await this.cronService.findByActionId(
        actionParam.myActionId,
        'nbCalendars',
      );
      const isUpdated = await this.cronService.findOrUpdateLastRecord(record);
      if (isUpdated && calendars.items.length > +pastRecord.content) {
        return {
          isTriggered: true,
          returnValues: [
            { name: 'calendarName', content: calendars.items.at(-1).summary },
            { name: 'calendarId', content: calendars.items.at(-1).id.toString() },
          ],
        };
      }

      return { isTriggered: false, returnValues: [] };
    } catch (error) {
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  public async checkNewEvent(actionParam: ActionParam): Promise<ActionResult> {
    try {
      const calendars = await this.googleEventService.listGoogleCalendars(actionParam.accessToken);
      const calendarName = getElemContentInParams(actionParam.params, 'calendarName', '', []);
      const calendar = calendars.items.find((calendar) => calendar.summary === calendarName);
      const calendarEvents = await this.googleEventService.listGoogleCalendarsEvents(
        actionParam.accessToken,
        calendar.id.toString(),
      );

      const record = this.cronService.createRecord(
        actionParam.myActionId,
        'nbEvents',
        calendarEvents.items.length.toString(),
      );
      const pastRecord = await this.cronService.findByActionId(actionParam.myActionId, 'nbEvents');
      const isUpdated = await this.cronService.findOrUpdateLastRecord(record);
      if (isUpdated && calendarEvents.items.length > +pastRecord.content) {
        return {
          isTriggered: true,
          returnValues: [
            { name: 'calendarId', content: calendar.id.toString() },
            { name: 'eventId', content: calendarEvents.items.at(-1).id.toString() },
            { name: 'eventName', content: calendarEvents.items.at(-1).summary },
            { name: 'eventStart', content: calendarEvents.items.at(-1).start.dateTime },
            { name: 'eventEnd', content: calendarEvents.items.at(-1).end.dateTime },
          ],
        };
      }
      return { isTriggered: false, returnValues: [] };
    } catch (error) {
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  googleEventAvailableActions = new Map<string, ActionFunction>([
    ['google-event/new-calendar/', this.checkNewCalendar.bind(this)],
    ['google-event/new-event/', this.checkNewEvent.bind(this)],
  ]);
}
