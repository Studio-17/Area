import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { MiroService } from './miro.service';
import { ReactionDto } from 'src/cron/dto/reaction.dto';
import { getElemContentInParams } from 'src/cron/utils/getElemContentInParams';

@Controller('actions/miro')
export class MiroController {
  constructor(private readonly miroService: MiroService) {}

  @Post('/user')
  public async getAuthenticatedUserTopArtists(@Res() response, @Body() body: ReactionDto) {
    try {
      const userInformation = await this.miroService.getAuthenticatedUserInformation(
        body.accessToken,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got authenticated user information using Miro service',
        userInformation,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching user information from Miro services',
        error: error,
        status: 400,
      });
    }
  }

  @Post('/team/boards')
  public async getTeamsBoards(@Res() response, @Body() body: ReactionDto) {
    try {
      const teamId = getElemContentInParams(body.params, 'teamId', undefined, body.returnValues);
      const teamBoards = await this.miroService.getTeamBoards(body.accessToken, teamId);

      const data = teamBoards.data;
      const boardIds = data.map((objects) => objects.id);

      return response.status(HttpStatus.OK).json({
        message: 'Got boards for authenticated user information using Miro service',
        id: boardIds,
        teamBoards,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching boards from Miro services',
        error: error,
        status: 400,
      });
    }
  }

  @Post('/create/team/boards')
  public async createTeamsBoards(@Res() response, @Body() body: ReactionDto) {
    try {
      const userData = await this.miroService.getAuthenticatedUserInformation(body.accessToken);
      body.params = [
        { name: 'teamId', content: userData.team.id, isActionResult: false },
        ...body.params,
      ];
      const createBoard = await this.miroService.createTeamBoards(body);

      return response.status(HttpStatus.OK).json({
        message: 'Board created for team using Miro service',
        createBoard,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error creating boars from Miro services',
        error: error,
        status: 400,
      });
    }
  }

  @Post('/board/share')
  public async shareBoard(@Res() response, @Body() body: ReactionDto) {
    try {
      const sharedBoard = await this.miroService.shareBoard(body);

      return response.status(HttpStatus.OK).json({
        message: 'Shared board using Miro service',
        sharedBoard,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error sharing board from Miro services',
        error: error,
        status: 400,
      });
    }
  }

  @Post('/board/team/members')
  public async getBoardTeamMembers(@Res() response, @Body() body: ReactionDto) {
    try {
      const teamMembers = await this.miroService.getBoardTeamMembers(body);

      const data = teamMembers.data;
      const memberIds = data.map((objects) => objects.id);

      return response.status(HttpStatus.OK).json({
        message: 'Got authenticated user information using Miro service',
        id: memberIds,
        teamMembers,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching user information from Miro services',
        error: error,
        status: 400,
      });
    }
  }

  @Post('/board/get/items')
  public async getBoardItems(@Res() response, @Body() body: ReactionDto) {
    try {
      const embedItem = await this.miroService.getBoardItems(body);

      const data = embedItem.data;
      const item = data.map((objects) => {
        const item = {};
        item['id'] = objects.id;
        item['type'] = objects.type;
        return item;
      });

      return response.status(HttpStatus.OK).json({
        message: 'Got items on board using Miro service',
        item: item,
        embedItem,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error getting items from Miro services',
        error: error,
        status: 400,
      });
    }
  }

  @Post('/board/create/embed')
  public async createBoardEmbedItem(@Res() response, @Body() body: ReactionDto) {
    try {
      const embedItem = await this.miroService.createBoardEmbedItem(body);

      return response.status(HttpStatus.OK).json({
        message: 'Created embed item on board using Miro service',
        embedItem,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error creating embed item from Miro services',
        error: error,
        status: 400,
      });
    }
  }

  @Post('/board/create/text')
  public async createBoardText(@Res() response, @Body() body: ReactionDto) {
    try {
      const text = await this.miroService.createBoardText(body);

      return response.status(HttpStatus.OK).json({
        message: 'Created text on board using Miro service',
        text,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error creating text from Miro services',
        error: error,
        status: 400,
      });
    }
  }

  @Post('/board/create/sticky-note')
  public async createBoardStickyNote(@Res() response, @Body() body: ReactionDto) {
    try {
      const stickNote = await this.miroService.createBoardStickyNote(body);

      return response.status(HttpStatus.OK).json({
        message: 'Created stick note on board using Miro service',
        stickNote,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error creating stick note from Miro services',
        error: error,
        status: 400,
      });
    }
  }

  @Post('/board/create/card')
  public async createBoardCard(@Res() response, @Body() body: ReactionDto) {
    try {
      const card = await this.miroService.createBoardCard(body);

      return response.status(HttpStatus.OK).json({
        message: 'Created card on board using Miro service',
        card,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error creating card from Miro services',
        error: error,
        status: 400,
      });
    }
  }
}
