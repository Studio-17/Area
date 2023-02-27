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
    ['github/check-pull-request/', this.checkPullRequest.bind(this)],
    ['github/check-issue/', this.checkIssue.bind(this)],
    // ['github/get-repository/', this.githubService.addRepositoryCron.bind(this.githubService)],
  ]);

  public async checkPullRequest(accessToken: string, params: { name: string; content: string }[]) {
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

  public async findOrUpdateLastPullRequest(githubRecordDto: GithubRecordDto) {
    const record = await this.findPullRequest(githubRecordDto);

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
      record.id.toString() !== githubRecordDto.id.toString()
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
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else {
      return { new: false, data: record };
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
    } else if (record.id.toString() !== githubRecordDto.id.toString()) {
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
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else {
      return { new: false, data: record };
    }
  }
}
