import should from 'should';
import 'jsdom-global/register';
import Banner from '../dist/storm-banner.standalone';

const html = `<div class="js-cookie-banner">
              <button class="js-banner__close"></div>
            </div>
            <div class="js-sessionStorage-banner">
              <button class="js-banner__close"></div>
            </div>`;

document.body.innerHTML = html;

//storage shim
window.localStorage = window.sessionStorage = {
  getItem: function (key) {
      return this[key];
  },
  setItem: function (key, value) {
      this[key] = value;
  }
};
  
let cookieBanner = Banner.init('.js-cookie-banner', {
      callback(){
        return document.body.classList.add('foo');
      }
    }),
    sessionStorageBanner = Banner.init('.js-sessionStorage-banner', { type: 'sessionStorage'});


describe('Initialisation', () => {

  it('should return an Object with one property, a \'dismiss\' function', () => {

    cookieBanner.should.be.an.instanceOf(Object);
    cookieBanner.should.have.property('dismiss');

  });

});



describe('Component API', () => {

  it('should expose dismiss as an executable function that removes the banner from the DOM', () => {
    cookieBanner.dismiss();
    should(document.querySelector('.js-cookie-banner')).equal(null);
  });


});


describe('Cookie', () => {
  it('should set a cookie once dismissed', () => {
    let cookieParts = document.cookie.split('=');

    cookieParts[0].should.equal('__STORMID_MSG__');
    cookieParts[1].should.equal('acknowledged');
  });
});

describe('sessionStorage', () => {
  it('should set a sessionStorage variable once dismissed', () => {
    (window.sessionStorage.getItem('__STORMID_MSG__') == undefined).should.be.true();
    sessionStorageBanner.dismiss();
    window.sessionStorage.getItem('__STORMID_MSG__').should.equal('acknowledged');
  });
});

describe('Options', () => {
  it('should accept a callback that is executed after dismissal', () => {
    //callback assigned an initialisation time...
    //dismiss called in the test above...
    document.body.classList.contains('foo').should.be.true;
    
  });

});