import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios/index';
import { map } from 'rxjs';
import { getElemContentInParams } from 'src/cron/utils/getElemContentInParams';
import { ReactionDto } from 'src/cron/dto/reaction.dto';

@Injectable()
export class MiroService {
  constructor(private readonly httpService: HttpService) {}

  public async getAuthenticatedUserInformation(accessToken: string): Promise<any> {
    const user = await lastValueFrom(
      this.httpService
        .get('https://api.miro.com/v1/oauth-token', {
          headers: {
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

    return user;
  }

  public async getTeamBoards(accessToken: string, teamId: string): Promise<any> {
    const teamBoards = await lastValueFrom(
      this.httpService
        .get(`https://api.miro.com/v2/boards?sort=default&team_id=${teamId}`, {
          headers: {
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

    return teamBoards;
  }

  public async createTeamBoards(body: ReactionDto): Promise<any> {
    const name = getElemContentInParams(body.params, 'name', undefined, body.returnValues);
    const description = getElemContentInParams(
      body.params,
      'description',
      undefined,
      body.returnValues,
    );
    const teamId = getElemContentInParams(body.params, 'teamId', undefined, body.returnValues);
    const boardCreated = await lastValueFrom(
      this.httpService
        .post(
          `https://api.miro.com/v2/boards`,
          {
            name: name,
            description: description,
            team_id: teamId,
            policy: {
              permissionsPolicy: {
                collaborationToolsStartAccess: 'all_editors',
                copyAccess: 'anyone',
                sharingAccess: 'team_members_with_editing_rights',
              },
              sharingPolicy: {
                access: 'private',
                inviteToAccountAndBoardLinkAccess: 'no_access',
                organizationAccess: 'private',
                teamAccess: 'private',
              },
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

    return boardCreated;
  }

  public async shareBoard(body: ReactionDto): Promise<any> {
    const boardId = getElemContentInParams(body.params, 'boardId', undefined, body.returnValues);
    const email = getElemContentInParams(body.params, 'email', undefined, body.returnValues);
    // Available roles are the following: commenter, editor, coowner
    const role = getElemContentInParams(body.params, 'role', 'commenter', body.returnValues);

    const sharedBoard = await lastValueFrom(
      this.httpService
        .post(
          `https://api.miro.com/v2/boards/${boardId}/members`,
          {
            emails: [email],
            role: role,
          },
          {
            headers: {
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

    return sharedBoard;
  }

  public async getBoardTeamMembers(accessToken: string, boardId: string): Promise<any> {
    // const boardId = getElemContentInParams(body.params, 'boardId', undefined, body.returnValues);
    const boardMembers = await lastValueFrom(
      this.httpService
        .get(encodeURI(`https://api.miro.com/v2/boards/${boardId}/members`), {
          headers: {
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

    return boardMembers;
  }

  public async getBoardItems(body: ReactionDto): Promise<any> {
    const boardId = getElemContentInParams(body.params, 'boardId', undefined, body.returnValues);
    // Available types are the following: text, sticky_note, embed and card
    // const type = getElemContentInParams(body.params, 'type', undefined, body.returnValues);
    const boardItems = await lastValueFrom(
      this.httpService
        .get(encodeURI(`https://api.miro.com/v2/boards/${boardId}/items`), {
          headers: {
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

    return boardItems;
  }

  // Be careful with the board rights for the users
  public async createBoardEmbedItem(body: ReactionDto): Promise<any> {
    const boardId = getElemContentInParams(body.params, 'boardId', undefined, body.returnValues);

    const url = getElemContentInParams(body.params, 'url', undefined, body.returnValues);
    const origin = getElemContentInParams(body.params, 'origin', undefined, body.returnValues);
    const x = getElemContentInParams(body.params, 'x', undefined, body.returnValues);
    const y = getElemContentInParams(body.params, 'y', undefined, body.returnValues);

    const boardEmbedItem = await lastValueFrom(
      this.httpService
        .post(
          `https://api.miro.com/v2/boards/${boardId}/embeds`,
          {
            data: {
              url: url,
            },
            position: {
              origin: origin,
              x: x,
              y: y,
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
            console.log(error.message);
            throw new HttpException(() => error.message, error.status);
          }),
        ),
    );

    return boardEmbedItem;
  }

  public async createBoardText(body: ReactionDto): Promise<any> {
    const boardId = getElemContentInParams(body.params, 'boardId', undefined, body.returnValues);

    const content = getElemContentInParams(body.params, 'content', undefined, body.returnValues);
    const origin = getElemContentInParams(body.params, 'origin', undefined, body.returnValues);
    const x = getElemContentInParams(body.params, 'x', undefined, body.returnValues);
    const y = getElemContentInParams(body.params, 'y', undefined, body.returnValues);

    const boardText = await lastValueFrom(
      this.httpService
        .post(
          `https://api.miro.com/v2/boards/${boardId}/texts`,
          {
            data: {
              content: content,
            },
            position: {
              origin: origin,
              x: x,
              y: y,
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
            console.log(error.message);
            throw new HttpException(() => error.message, error.status);
          }),
        ),
    );

    return boardText;
  }

  public async createBoardStickyNote(body: ReactionDto): Promise<any> {
    const boardId = getElemContentInParams(body.params, 'boardId', undefined, body.returnValues);

    const content = getElemContentInParams(body.params, 'content', undefined, body.returnValues);
    const origin = getElemContentInParams(body.params, 'origin', undefined, body.returnValues);
    const x = getElemContentInParams(body.params, 'x', undefined, body.returnValues);
    const y = getElemContentInParams(body.params, 'y', undefined, body.returnValues);

    const boardStickyNote = await lastValueFrom(
      this.httpService
        .post(
          `https://api.miro.com/v2/boards/${boardId}/sticky_notes`,
          {
            data: {
              content: content,
              shape: 'square',
            },
            position: {
              origin: origin,
              x: x,
              y: y,
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
            console.log(error.message);
            throw new HttpException(() => error.message, error.status);
          }),
        ),
    );

    return boardStickyNote;
  }

  public async createBoardCard(body: ReactionDto): Promise<any> {
    const boardId = getElemContentInParams(body.params, 'boardId', undefined, body.returnValues);

    const title = getElemContentInParams(body.params, 'title', undefined, body.returnValues);
    const description = getElemContentInParams(
      body.params,
      'description',
      undefined,
      body.returnValues,
    );
    const origin = getElemContentInParams(body.params, 'origin', undefined, body.returnValues);
    const x = getElemContentInParams(body.params, 'x', undefined, body.returnValues);
    const y = getElemContentInParams(body.params, 'y', undefined, body.returnValues);

    const boardCard = await lastValueFrom(
      this.httpService
        .post(
          `https://api.miro.com/v2/boards/${boardId}/cards`,
          {
            data: {
              title: title,
              description: description,
            },
            position: {
              origin: origin,
              x: x,
              y: y,
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
            console.log(error.message);
            throw new HttpException(() => error.message, error.status);
          }),
        ),
    );

    return boardCard;
  }
}
