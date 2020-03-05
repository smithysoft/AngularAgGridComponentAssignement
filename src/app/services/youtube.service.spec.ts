import { fakeAsync, TestBed } from '@angular/core/testing';

import { YoutubeService } from './youtube.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('YoutubeService', () => {
  const url = environment.youtubeApiLink;
  let httpMock: HttpTestingController;

  let service: YoutubeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(YoutubeService);

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterAll(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return Observable of youtube api', () => {
    service.get().subscribe();

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
  });
});
