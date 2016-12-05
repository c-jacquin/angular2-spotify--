import { AngularTrainingCliPage } from './app.po';

describe('angular-training-cli App', function() {
  let page: AngularTrainingCliPage;

  beforeEach(() => {
    page = new AngularTrainingCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
