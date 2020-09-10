describe('Google Search', () => {
 it('Google Search - BrowserStack', () => {
      browser.url('https://www.google.com/');
      $('[name="q"]').setValue('BrowserStack');
      //browser.pause(200000);
      //browser.getTitle().should.match("Google Search - BrowserStack");
  });
})