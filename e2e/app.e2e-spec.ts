import { SmartSurveyWebPage } from './app.po';

describe('smart-survey-web App', () => {
  let page: SmartSurveyWebPage;

  beforeEach(() => {
    page = new SmartSurveyWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
