import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios/index';
import { RepositoriesList } from './interface/repositories-list.interface';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs';
import { CreateRepositoryDto } from './dto/repository/create-repository.dto';
import { RepositoryCreated } from './interface/repository-create.interface';
import { ForkRepositoryDto } from './dto/repository/fork-repository.dto';
import { ForkedRepository } from './interface/fork-repository.interface';

@Injectable()
export class GithubService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(GithubPullRequestEntity)
    private readonly githubPullRequestRepository: Repository<GithubPullRequestEntity>,
    @InjectRepository(GithubIssueEntity)
    private readonly githubIssueRepository: Repository<GithubIssueEntity>,
  ) {}

  public async getAuthenticatedUserRepositories(
    userId: string,
    accessToken: string,
  ): Promise<RepositoriesList> {
    const repositories = await firstValueFrom(
      this.httpService
        .get('https://api.github.com/user/repos', {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${accessToken}`,
            'X-GitHub-Api-Version': '2022-11-28',
          },
        })
        .pipe(
          map((value) => {
            return plainToInstance(RepositoriesList, value.data);
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return repositories;
  }

  public async createAuthenticatedUserRepositories(
    userId: string,
    accessToken: string,
    createRepositoryDto: CreateRepositoryDto,
  ): Promise<RepositoryCreated> {
    const repository = await firstValueFrom(
      this.httpService
        .post('https://api.github.com/user/repos', {
          data: createRepositoryDto,
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${accessToken}`,
            'X-GitHub-Api-Version': '2022-11-28',
          },
        })
        .pipe(
          map((value) => {
            return plainToInstance(RepositoryCreated, value.data);
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return repository;
  }

  public async forkRepository(
    userId: string,
    accessToken: string,
    forkRepositoryDto: ForkRepositoryDto,
  ): Promise<ForkedRepository> {
    const forkedRepository = await firstValueFrom(
      // Beware of the params in the route, they may be invalid
      this.httpService
        .post(
          `https://api.github.com/repos/${forkRepositoryDto.owner}/${forkRepositoryDto.repo}/forks`,
          {
            data: forkRepositoryDto,
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: `Bearer ${accessToken}`,
              'X-GitHub-Api-Version': '2022-11-28',
            },
          },
        )
        .pipe(
          map((value) => {
            return plainToInstance(ForkedRepository, value.data);
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return forkedRepository;
  }
}
