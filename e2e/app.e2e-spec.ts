import { ManagerAppPage } from './app.po';

describe('manager-app App', () => {
  let page: ManagerAppPage;

  beforeEach(() => {
    page = new ManagerAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
