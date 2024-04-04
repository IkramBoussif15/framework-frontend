import { TestBed } from '@angular/core/testing';

import { UpdateContexDtoService } from './update-contex-dto.service';

describe('UpdateContexDtoService', () => {
  let service: UpdateContexDtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateContexDtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
