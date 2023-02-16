import { EntitySubscriberInterface, EventSubscriber, UpdateEvent } from 'typeorm';
import { GmailRecord } from '../../entity/gmail/gmail.entity';

@EventSubscriber()
export class GmailRecordSubscriber implements EntitySubscriberInterface<GmailRecord> {
  listenTo(): any {
    return GmailRecord;
  }

  afterUpdate(event: UpdateEvent<GmailRecord>): Promise<any> | void {
    console.log(`updated: ${event.databaseEntity.lastEmailId} @ ${event.databaseEntity.email}`);

    // const googleApiCredentials = this.googleService
    //   .getCredentialsForApi(event.databaseEntity.email)
    //   .then((credentials) => credentials.data)
    //   .catch(function (error) {
    //     throw new ErrorEvent(error);
    //   });
    //
    // console.log('mis à jour:', googleApiCredentials);

    // const emailContent = this.googleService
    //   .getEmailContent(googleApiCredentials, event.databaseEntity.lastEmailId)
    //   .then((content) => content)
    //   .catch(function (error) {
    //     throw new HttpException(error, HttpStatus.BAD_REQUEST);
    //   });
    //
    // this.googleService
    //   .createGoogleDocOnDrive(googleApiCredentials, emailContent)
    //   .catch(function (error) {
    //     throw new HttpException(error, HttpStatus.BAD_REQUEST);
    //   });
  }
}
