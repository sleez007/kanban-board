import { TestBed } from '@angular/core/testing';

import { BoardService } from './board.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { firstValueFrom, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('BoardService', () => {
  let service: BoardService;
  let httpMock: HttpTestingController;
  let client: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BoardService],
    });
    service = TestBed.inject(BoardService);
    httpMock = TestBed.inject(HttpTestingController);
    client = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Check if the actual network request was made', async () => {
    service.getBoards().subscribe((d) => {
      //console.log(d, d.length);
      expect(d.length).toEqual(8);
    });

    const request = httpMock.expectOne('/assets/images/data.json');
    expect(request.request.method).toBe('GET');
    request.flush(['', '', '']);
  });

  it('ensure we call the http client get method', async () => {
    jest.spyOn(client, 'get').mockReturnValue(of(['', '', '']));
    const data = service.getBoards();
    const json = await firstValueFrom(data);
    expect(json.length).toBe(3);
  });
});
