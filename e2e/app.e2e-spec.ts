import { TestVisePage } from './app.po';

describe('test-vise App', () => {
  let page: TestVisePage;

  beforeEach(() => {
    page = new TestVisePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
