require('dotenv').config();

describe('test', () => {
  it('should run a test', () => {
    console.log(process.env.TEST_DATABASE_URL);
  });
});
