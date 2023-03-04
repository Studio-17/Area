import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GithubService } from './github.service';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GithubRecordEntity } from './entity/github-record.entity';
import { GithubRecordDto } from './dto/github-record.dto';

@Injectable()
export class GithubCronService {
  constructor(
    @Inject(forwardRef(() => GithubService))
    private readonly githubService: GithubService,
    private readonly httpService: HttpService,
    @InjectRepository(GithubRecordEntity)
    private readonly githubRecordRepository: Repository<GithubRecordEntity>,
  ) {}

  availableActions = new Map([
    // ACTIONS
    ['github/check-pull-request/', this.checkPullRequest.bind(this)],
    ['github/check-issue/', this.checkIssue.bind(this)],
    ['github/check-user-issue/', this.checkUserIssue.bind(this)],
    ['github/check-team/', this.checkTeam.bind(this)],
    ['github/check-contributor/', this.checkIssue.bind(this)],
    ['github/check-fork/', this.checkFork.bind(this)],
    ['github/check-star/', this.checkStar.bind(this)],
    ['github/check-user-star/', this.checkUserStar.bind(this)],
    ['github/check-invitation/', this.checkInvitation.bind(this)],
    ['github/check-milestone/', this.checkMilestone.bind(this)],
    ['github/check-review-comment/', this.checkReviewComment.bind(this)],

    // REACTIONS
    ['github/fork-repository/', this.forkRepository.bind(this)],
    // ['github/get-repository/', this.githubService.addRepositoryCron.bind(this.githubService)],
  ]);

  // --- FORK ---
  public async forkRepository(accessToken: string, params: { name: string; content: string }[]) {
    let owner = '';
    try {
      owner = params.find((param) => param.name === 'owner').content;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
    let repo = '';
    try {
      repo = params.find((param) => param.name === 'repo').content;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
    let name = '';
    try {
      name = params.find((param) => param.name === 'new_name').content;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
    let default_branch_only: boolean;
    try {
      default_branch_only =
        params.find((param) => param.name === 'default_branch_only').content === 'true';
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }

    try {
      return this.githubService.forkRepository(accessToken, {
        owner: owner,
        repo: repo,
        name: name,
        default_branch_only: default_branch_only,
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  // --- PULL REQUEST ---
  public async checkPullRequest(accessToken: string, params: { name: string; content: string }[]) {
    let owner = '';
    try {
      owner = params.find((param) => param.name === 'owner').content;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
    let repo = '';
    try {
      repo = params.find((param) => param.name === 'repo').content;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }

    try {
      const pullRequest = await this.githubService.getPullRequest(accessToken, {
        owner: owner,
        repo: repo,
      });

      const record = new GithubRecordEntity();
      record.owner = owner;
      record.repo = repo;
      record.category = 'pullRequest';
      record.id = pullRequest;
      return (await this.findOrUpdateLastPullRequest(record)).new;
    } catch (error) {
      console.error(error);
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  public async findPullRequest(githubRecordDto: GithubRecordDto): Promise<GithubRecordEntity> {
    try {
      const records = await this.githubRecordRepository.findOneBy({
        owner: githubRecordDto.owner,
        repo: githubRecordDto.repo,
        category: 'pullRequest',
      });

      if (!records) {
        return undefined;
      }

      return records;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  public async findOrUpdateLastPullRequest(githubRecordDto: GithubRecordDto) {
    const record = await this.findPullRequest(githubRecordDto);

    if (!record) {
      try {
        return {
          new: false,
          data: await this.githubRecordRepository.save(githubRecordDto),
        };
      } catch (err) {
        console.error(err);
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else if (
      githubRecordDto.id.toString() !== '0' &&
      record.id.toString() < githubRecordDto.id.toString()
    ) {
      try {
        const newRecord = await this.githubRecordRepository.update(
          {
            id: record.id,
          },
          { ...githubRecordDto },
        );

        if (!newRecord) {
          throw new NotFoundException(`Record does not exist`);
        }

        return {
          new: true,
          data: await this.findPullRequest(githubRecordDto),
        };
      } catch (err) {
        console.error(err);
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else {
      return { new: false, data: record };
    }
  }

  // --- ISSUE ---
  public async checkIssue(accessToken: string, params: { name: string; content: string }[]) {
    let owner = '';
    try {
      owner = params.find((param) => param.name === 'owner').content;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
    let repo = '';
    try {
      repo = params.find((param) => param.name === 'repo').content;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }

    try {
      const issue = await this.githubService.getIssue(accessToken, {
        owner: owner,
        repo: repo,
      });

      const record = new GithubRecordEntity();
      record.owner = owner;
      record.repo = repo;
      record.category = 'issue';
      record.id = issue;
      return (await this.findOrUpdateLastIssue(record)).new;
    } catch (error) {
      console.error(error);
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  public async findOrUpdateLastIssue(githubRecordDto: GithubRecordDto) {
    const record = await this.findIssue(githubRecordDto);

    if (!record) {
      try {
        return {
          new: false,
          data: await this.githubRecordRepository.save(githubRecordDto),
        };
      } catch (err) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else if (
      githubRecordDto.id.toString() !== '0' &&
      record.id.toString() < githubRecordDto.id.toString()
    ) {
      try {
        const newRecord = await this.githubRecordRepository.update(
          {
            id: record.id,
          },
          { ...githubRecordDto },
        );

        if (!newRecord) {
          throw new NotFoundException(`Record does not exist`);
        }

        return {
          new: true,
          data: await this.findIssue(githubRecordDto),
        };
      } catch (err) {
        console.error(err);
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else {
      return { new: false, data: record };
    }
  }

  public async findIssue(githubRecordDto: GithubRecordDto): Promise<GithubRecordEntity> {
    try {
      const records = await this.githubRecordRepository.findOneBy({
        owner: githubRecordDto.owner,
        repo: githubRecordDto.repo,
        category: 'issue',
      });

      if (!records) {
        return undefined;
      }

      return records;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  // TODO - Fix user conflicts
  // --- USER ISSUE ---
  public async checkUserIssue(accessToken: string, params: { name: string; content: string }[]) {
    try {
      const issue = await this.githubService.getUserIssue(accessToken);

      const record = new GithubRecordEntity();
      record.owner = '';
      record.repo = '';
      record.category = 'user-issue';
      record.id = issue;
      return (await this.findOrUpdateLastUserIssue(record)).new;
    } catch (error) {
      console.error(error);
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  public async findOrUpdateLastUserIssue(githubRecordDto: GithubRecordDto) {
    const record = await this.findUserIssue(githubRecordDto);

    if (!record) {
      try {
        return {
          new: false,
          data: await this.githubRecordRepository.save(githubRecordDto),
        };
      } catch (err) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else if (
      githubRecordDto.id.toString() !== '0' &&
      record.id.toString() < githubRecordDto.id.toString()
    ) {
      try {
        const newRecord = await this.githubRecordRepository.update(
          {
            id: record.id,
          },
          { ...githubRecordDto },
        );

        if (!newRecord) {
          throw new NotFoundException(`Record does not exist`);
        }

        return {
          new: true,
          data: await this.findUserIssue(githubRecordDto),
        };
      } catch (err) {
        console.error(err);
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else {
      return { new: false, data: record };
    }
  }

  public async findUserIssue(githubRecordDto: GithubRecordDto): Promise<GithubRecordEntity> {
    try {
      const records = await this.githubRecordRepository.findOneBy({
        owner: githubRecordDto.owner,
        repo: githubRecordDto.repo,
        category: 'user-issue',
      });

      if (!records) {
        return undefined;
      }

      return records;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  // --- STAR ---
  public async checkStar(accessToken: string, params: { name: string; content: string }[]) {
    let owner = '';
    try {
      owner = params.find((param) => param.name === 'owner').content;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
    let repo = '';
    try {
      repo = params.find((param) => param.name === 'repo').content;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }

    try {
      const star = await this.githubService.getStar(accessToken, {
        owner: owner,
        repo: repo,
      });

      const record = new GithubRecordEntity();
      record.owner = owner;
      record.repo = repo;
      record.category = 'star';
      record.id = star;
      return (await this.findOrUpdateLastStar(record)).new;
    } catch (error) {
      console.error(error);
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  public async findOrUpdateLastStar(githubRecordDto: GithubRecordDto) {
    const record = await this.findStar(githubRecordDto);

    if (!record) {
      try {
        return {
          new: false,
          data: await this.githubRecordRepository.save(githubRecordDto),
        };
      } catch (err) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else if (
      githubRecordDto.id.toString() !== '0' &&
      record.id.toString() < githubRecordDto.id.toString()
    ) {
      try {
        const newRecord = await this.githubRecordRepository.update(
          {
            id: record.id,
          },
          { ...githubRecordDto },
        );

        if (!newRecord) {
          throw new NotFoundException(`Record does not exist`);
        }

        return {
          new: true,
          data: await this.findStar(githubRecordDto),
        };
      } catch (err) {
        console.error(err);
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else {
      return { new: false, data: record };
    }
  }

  public async findStar(githubRecordDto: GithubRecordDto): Promise<GithubRecordEntity> {
    try {
      const records = await this.githubRecordRepository.findOneBy({
        owner: githubRecordDto.owner,
        repo: githubRecordDto.repo,
        category: 'star',
      });

      if (!records) {
        return undefined;
      }

      return records;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  // --- USER STAR ---
  // TODO - Fix conflict between users
  public async checkUserStar(accessToken: string) {
    try {
      const star = await this.githubService.getUserStar(accessToken);

      const record = new GithubRecordEntity();
      record.owner = '';
      record.repo = '';
      record.category = 'user-star';
      record.id = star;
      return (await this.findOrUpdateLastUserStar(record)).new;
    } catch (error) {
      console.error(error);
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  public async findOrUpdateLastUserStar(githubRecordDto: GithubRecordDto) {
    const record = await this.findUserStar(githubRecordDto);

    if (!record) {
      try {
        return {
          new: false,
          data: await this.githubRecordRepository.save(githubRecordDto),
        };
      } catch (err) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else if (
      githubRecordDto.id.toString() !== '0' &&
      record.id.toString() < githubRecordDto.id.toString()
    ) {
      try {
        const newRecord = await this.githubRecordRepository.update(
          {
            id: record.id,
          },
          { ...githubRecordDto },
        );

        if (!newRecord) {
          throw new NotFoundException(`Record does not exist`);
        }

        return {
          new: true,
          data: await this.findUserStar(githubRecordDto),
        };
      } catch (err) {
        console.error(err);
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else {
      return { new: false, data: record };
    }
  }

  public async findUserStar(githubRecordDto: GithubRecordDto): Promise<GithubRecordEntity> {
    try {
      const records = await this.githubRecordRepository.findOneBy({
        owner: githubRecordDto.owner,
        repo: githubRecordDto.repo,
        category: 'user-star',
      });

      if (!records) {
        return undefined;
      }

      return records;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  // --- MILESTONE ---
  public async checkMilestone(accessToken: string, params: { name: string; content: string }[]) {
    let owner = '';
    try {
      owner = params.find((param) => param.name === 'owner').content;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
    let repo = '';
    try {
      repo = params.find((param) => param.name === 'repo').content;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }

    try {
      const milestone = await this.githubService.getMilestone(accessToken, {
        owner: owner,
        repo: repo,
      });

      const record = new GithubRecordEntity();
      record.owner = owner;
      record.repo = repo;
      record.category = 'milestone';
      record.id = milestone;
      return (await this.findOrUpdateLastMilestone(record)).new;
    } catch (error) {
      console.error(error);
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  public async findOrUpdateLastMilestone(githubRecordDto: GithubRecordDto) {
    const record = await this.findMilestone(githubRecordDto);

    if (!record) {
      try {
        return {
          new: false,
          data: await this.githubRecordRepository.save(githubRecordDto),
        };
      } catch (err) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else if (
      githubRecordDto.id.toString() !== '0' &&
      record.id.toString() < githubRecordDto.id.toString()
    ) {
      try {
        const newRecord = await this.githubRecordRepository.update(
          {
            id: record.id,
          },
          { ...githubRecordDto },
        );

        if (!newRecord) {
          throw new NotFoundException(`Record does not exist`);
        }

        return {
          new: true,
          data: await this.findMilestone(githubRecordDto),
        };
      } catch (err) {
        console.error(err);
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else {
      return { new: false, data: record };
    }
  }

  public async findMilestone(githubRecordDto: GithubRecordDto): Promise<GithubRecordEntity> {
    try {
      const records = await this.githubRecordRepository.findOneBy({
        owner: githubRecordDto.owner,
        repo: githubRecordDto.repo,
        category: 'milestone',
      });

      if (!records) {
        return undefined;
      }

      return records;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  // --- TEAM ---
  public async checkTeam(accessToken: string, params: { name: string; content: string }[]) {
    let owner = '';
    try {
      owner = params.find((param) => param.name === 'owner').content;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
    let repo = '';
    try {
      repo = params.find((param) => param.name === 'repo').content;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }

    try {
      const team = await this.githubService.getTeam(accessToken, {
        owner: owner,
        repo: repo,
      });

      const record = new GithubRecordEntity();
      record.owner = owner;
      record.repo = repo;
      record.category = 'team';
      record.id = team;
      return (await this.findOrUpdateLastTeam(record)).new;
    } catch (error) {
      console.error(error);
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  public async findOrUpdateLastTeam(githubRecordDto: GithubRecordDto) {
    const record = await this.findTeam(githubRecordDto);

    if (!record) {
      try {
        return {
          new: false,
          data: await this.githubRecordRepository.save(githubRecordDto),
        };
      } catch (err) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else if (
      githubRecordDto.id.toString() !== '0' &&
      record.id.toString() < githubRecordDto.id.toString()
    ) {
      try {
        const newRecord = await this.githubRecordRepository.update(
          {
            id: record.id,
          },
          { ...githubRecordDto },
        );

        if (!newRecord) {
          throw new NotFoundException(`Record does not exist`);
        }

        return {
          new: true,
          data: await this.findTeam(githubRecordDto),
        };
      } catch (err) {
        console.error(err);
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else {
      return { new: false, data: record };
    }
  }

  public async findTeam(githubRecordDto: GithubRecordDto): Promise<GithubRecordEntity> {
    try {
      const records = await this.githubRecordRepository.findOneBy({
        owner: githubRecordDto.owner,
        repo: githubRecordDto.repo,
        category: 'team',
      });

      if (!records) {
        return undefined;
      }

      return records;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  // --- INVITATION ---
  public async checkInvitation(accessToken: string, params: { name: string; content: string }[]) {
    let owner = '';
    try {
      owner = params.find((param) => param.name === 'owner').content;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
    let repo = '';
    try {
      repo = params.find((param) => param.name === 'repo').content;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }

    try {
      const invitation = await this.githubService.getInvitation(accessToken, {
        owner: owner,
        repo: repo,
      });

      const record = new GithubRecordEntity();
      record.owner = owner;
      record.repo = repo;
      record.category = 'invitation';
      record.id = invitation;
      return (await this.findOrUpdateLastInvitation(record)).new;
    } catch (error) {
      console.error(error);
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  public async findOrUpdateLastInvitation(githubRecordDto: GithubRecordDto) {
    const record = await this.findInvitation(githubRecordDto);

    if (!record) {
      try {
        return {
          new: false,
          data: await this.githubRecordRepository.save(githubRecordDto),
        };
      } catch (err) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else if (
      githubRecordDto.id.toString() !== '0' &&
      record.id.toString() < githubRecordDto.id.toString()
    ) {
      try {
        const newRecord = await this.githubRecordRepository.update(
          {
            id: record.id,
          },
          { ...githubRecordDto },
        );

        if (!newRecord) {
          throw new NotFoundException(`Record does not exist`);
        }

        return {
          new: true,
          data: await this.findInvitation(githubRecordDto),
        };
      } catch (err) {
        console.error(err);
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else {
      return { new: false, data: record };
    }
  }

  public async findInvitation(githubRecordDto: GithubRecordDto): Promise<GithubRecordEntity> {
    try {
      const records = await this.githubRecordRepository.findOneBy({
        owner: githubRecordDto.owner,
        repo: githubRecordDto.repo,
        category: 'invitation',
      });

      if (!records) {
        return undefined;
      }

      return records;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  // --- CONTRIBUTOR ---
  public async checkContributor(accessToken: string, params: { name: string; content: string }[]) {
    let owner = '';
    try {
      owner = params.find((param) => param.name === 'owner').content;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
    let repo = '';
    try {
      repo = params.find((param) => param.name === 'repo').content;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }

    try {
      const contributor = await this.githubService.getContributor(accessToken, {
        owner: owner,
        repo: repo,
      });

      const record = new GithubRecordEntity();
      record.owner = owner;
      record.repo = repo;
      record.category = 'contributor';
      record.id = contributor;
      return (await this.findOrUpdateLastContributor(record)).new;
    } catch (error) {
      console.error(error);
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  public async findOrUpdateLastContributor(githubRecordDto: GithubRecordDto) {
    const record = await this.findContributor(githubRecordDto);

    if (!record) {
      try {
        return {
          new: false,
          data: await this.githubRecordRepository.save(githubRecordDto),
        };
      } catch (err) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else if (
      githubRecordDto.id.toString() !== '0' &&
      record.id.toString() < githubRecordDto.id.toString()
    ) {
      try {
        const newRecord = await this.githubRecordRepository.update(
          {
            id: record.id,
          },
          { ...githubRecordDto },
        );

        if (!newRecord) {
          throw new NotFoundException(`Record does not exist`);
        }

        return {
          new: true,
          data: await this.findContributor(githubRecordDto),
        };
      } catch (err) {
        console.error(err);
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else {
      return { new: false, data: record };
    }
  }

  public async findContributor(githubRecordDto: GithubRecordDto): Promise<GithubRecordEntity> {
    try {
      const records = await this.githubRecordRepository.findOneBy({
        owner: githubRecordDto.owner,
        repo: githubRecordDto.repo,
        category: 'contributor',
      });

      if (!records) {
        return undefined;
      }

      return records;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  // --- REVIEW COMMENT ---
  public async checkReviewComment(
    accessToken: string,
    params: { name: string; content: string }[],
  ) {
    let owner = '';
    try {
      owner = params.find((param) => param.name === 'owner').content;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
    let repo = '';
    try {
      repo = params.find((param) => param.name === 'repo').content;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }

    try {
      const issue = await this.githubService.getReviewComment(accessToken, {
        owner: owner,
        repo: repo,
      });

      const record = new GithubRecordEntity();
      record.owner = owner;
      record.repo = repo;
      record.category = 'review-comment';
      record.id = issue;
      return (await this.findOrUpdateLastReviewComment(record)).new;
    } catch (error) {
      console.error(error);
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  public async findOrUpdateLastReviewComment(githubRecordDto: GithubRecordDto) {
    const record = await this.findReviewComment(githubRecordDto);

    if (!record) {
      try {
        return {
          new: false,
          data: await this.githubRecordRepository.save(githubRecordDto),
        };
      } catch (err) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else if (
      githubRecordDto.id.toString() !== '0' &&
      record.id.toString() < githubRecordDto.id.toString()
    ) {
      try {
        const newRecord = await this.githubRecordRepository.update(
          {
            id: record.id,
          },
          { ...githubRecordDto },
        );

        if (!newRecord) {
          throw new NotFoundException(`Record does not exist`);
        }

        return {
          new: true,
          data: await this.findReviewComment(githubRecordDto),
        };
      } catch (err) {
        console.error(err);
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else {
      return { new: false, data: record };
    }
  }

  public async findReviewComment(githubRecordDto: GithubRecordDto): Promise<GithubRecordEntity> {
    try {
      const records = await this.githubRecordRepository.findOneBy({
        owner: githubRecordDto.owner,
        repo: githubRecordDto.repo,
        category: 'review-comment',
      });

      if (!records) {
        return undefined;
      }

      return records;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  // --- FORK ---
  public async checkFork(accessToken: string, params: { name: string; content: string }[]) {
    let owner = '';
    try {
      owner = params.find((param) => param.name === 'owner').content;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
    let repo = '';
    try {
      repo = params.find((param) => param.name === 'repo').content;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }

    try {
      const fork = await this.githubService.getFork(accessToken, {
        owner: owner,
        repo: repo,
      });

      const record = new GithubRecordEntity();
      record.owner = owner;
      record.repo = repo;
      record.category = 'fork';
      record.id = fork;
      return (await this.findOrUpdateLastFork(record)).new;
    } catch (error) {
      console.error(error);
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  public async findOrUpdateLastFork(githubRecordDto: GithubRecordDto) {
    const record = await this.findFork(githubRecordDto);

    if (!record) {
      try {
        return {
          new: false,
          data: await this.githubRecordRepository.save(githubRecordDto),
        };
      } catch (err) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else if (
      githubRecordDto.id.toString() !== '0' &&
      record.id.toString() < githubRecordDto.id.toString()
    ) {
      try {
        const newRecord = await this.githubRecordRepository.update(
          {
            id: record.id,
          },
          { ...githubRecordDto },
        );

        if (!newRecord) {
          throw new NotFoundException(`Record does not exist`);
        }

        return {
          new: true,
          data: await this.findFork(githubRecordDto),
        };
      } catch (err) {
        console.error(err);
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else {
      return { new: false, data: record };
    }
  }

  public async findFork(githubRecordDto: GithubRecordDto): Promise<GithubRecordEntity> {
    try {
      const records = await this.githubRecordRepository.findOneBy({
        owner: githubRecordDto.owner,
        repo: githubRecordDto.repo,
        category: 'fork',
      });

      if (!records) {
        return undefined;
      }

      return records;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}
