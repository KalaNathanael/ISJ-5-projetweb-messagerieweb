import { TestBed } from '@angular/core/testing';

import { ContactsServicesService } from './contacts-services.service';

describe('ContactsServicesService', () => {
  let service: ContactsServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
