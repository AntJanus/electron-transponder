import { mainTransponder } from '../src/mainTransponder';

const ipcMainMock = {
  on: (message, func) => {}
};

describe('mainTransponder', () => {
  test('should bootstrap routes', () => {
    const transponder = new mainTransponder(ipcMainMock);

    expect(transponder.routes).toStrictEqual({
      GET: {},
      POST: {},
      DELETE: {},
      PATCH: {},
      PUT: {}
    });
  });
});
