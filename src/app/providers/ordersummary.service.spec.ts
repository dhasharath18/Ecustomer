import { TestBed } from '@angular/core/testing';

import { OrdersummaryService } from './ordersummary.service';

describe('OrdersummaryService', () => {
  let service: OrdersummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
