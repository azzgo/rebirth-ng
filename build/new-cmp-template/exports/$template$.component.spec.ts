/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { <%= componentName %>Component } from './<%= componentSelector %>.component';

describe('<%= componentName %>', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        <%= componentName %>Module
      ],
    });
    TestBed.compileComponents();
  });

  it('mcok test', async(() => {
    expect(true).toBeTruthy();
  }));

});
