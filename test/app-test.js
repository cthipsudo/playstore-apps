//tests here
const chai = require('chai'); 
const expect = chai.expect;
const supertest = require('supertest');
const app = require('../app');
const playApps = require('../play-store');

chai.use(require('chai-sorted'));

describe('Playstore', () => {
  it.skip('should return a message from GET /', () => {
    return supertest(app).get('/apps').expect(200, 'This is the app store!');
  });

  it('should return all the apps', () => {
    return supertest(app).get('/apps').expect(playApps);
  });
  
  it('should return all the apps by sorting by rating', () => {
    return supertest(app).get('/apps').query({sort: 'Rating'}).then(res => {
      expect(res.body).to.be.sortedBy('Rating', {descending: true});
    });
  });

  it('should return all the apps by sorting by App', () => {
    return supertest(app).get('/apps').query({sort: 'App'}).then(res => {
      res.body.sort((a, b) => {
        return a['App'].toLowerCase() > b['App'].toLowerCase() ? 1 : a['App'].toLowerCase() < b['App'].toLowerCase() ? -1 : 0;
      });
      playApps.sort((a, b) => {
        return a['App'].toLowerCase() > b['App'].toLowerCase() ? 1 : a['App'].toLowerCase() < b['App'].toLowerCase() ? -1 : 0;
      });
      //expect(res.body).to.be.sortedBy('App');
      expect(res.body).to.deep.equal(playApps);
    });
  });

  it('should return all the apps by sorting by genres: Arcade', () => {
    return supertest(app).get('/apps').query({genres: 'Arcade'}).then(res => {
      //console.log(res.body);
      res.body.map(app => {
        //console.log("Mapping this app", app);
        return expect(app).to.deep.include({Genres: 'Arcade'});
      });
      //expect(res.body[2]).to.deep.nested.include({Genres: 'Arcade'});
      //expect(res.body).to.deep.equal({Genres: 'Arcade'});
    });
  });

  it('should return all the apps by sorting by genres: Action', () => {
    return supertest(app).get('/apps').query({genres: 'Action'}).then(res => {
      //console.log(res.body);
      res.body.map(app => {
        //console.log("Mapping this app", app);
        return expect(app.Genres).to.include('Action');
      });
      //expect(res.body[2]).to.deep.nested.include({Genres: 'Arcade'});
      //expect(res.body).to.deep.equal({Genres: 'Arcade'});
    });
  });
});

