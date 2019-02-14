import { MockPipe } from 'ng-mocks';

import { SafePipe } from './safe.pipe';

export const spy = jasmine.createSpy();
export const mock = MockPipe(SafePipe, spy);
