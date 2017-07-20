import { TestBed, inject } from '@angular/core/testing';

import { FormDialogService } from './form-dialog.service';

describe('FormDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormDialogService]
    });
  });

  it('should be created', inject([FormDialogService], (service: FormDialogService) => {
    expect(service).toBeTruthy();
  }));
});
