import { TestBed } from '@angular/core/testing';

import { AtivExtraService } from './ativ-extra.service';

describe('AtivExtraService', () => {
  let service: AtivExtraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtivExtraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
