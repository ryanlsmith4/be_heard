// test-blogs.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
const should = chai.should();
const Blog = require('../models/blog');
const sampleReview =     {
    "title": "Super Sweet Review",
    "movie-title": "La La Land",
    "description": "A great review of a lovely movie."
}

chai.use(chaiHttp);


describe('Blogs', () => {

    after(() => {
    Blog.deleteMany({title: 'Super Sweet Review'}).exec((err, blogs) => {
      console.log(blogs)
      blogs.remove();
    })
  });
// TEST INDEX
it('should index ALL blogs on / GET', (done) => {
  chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
});
// TEST NEW
it('should display new form on /blogs/new GET', (done) => {
  chai.request(server)
    .get(`/blogs/new`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
});
// TEST CREATE
it('should create a SINGLE blog on /blogs POST', (done) => {
  chai.request(server)
      .post('/blogs/view')
      .send(sampleReview)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
});
// TEST SHOW
it('should show a SINGLE blog on /blogs/view/<id> GET', (done) => {
  var review = new Blog(sampleReview);
  review.save((err, data) => {
    chai.request(server)
      .get(`/blogs/view/${data._id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
  });
});
// TEST EDIT
it('should edit a SINGLE blog on /blogs/view/<id>/edit GET', (done) => {
var review = new Blog(sampleReview);
 review.save((err, data) => {
   chai.request(server)
     .get(`/blogs/view/${data._id}/edit`)
     .end((err, res) => {
       res.should.have.status(200);
       res.should.be.html
       done();
     });
 });
});
// TEST UPDATE
it('should update a SINGLE blog on /blogs/view/<id> PUT', (done) => {
  var review = new Blog(sampleReview);
  review.save((err, data)  => {
   chai.request(server)
    .put(`/blogs/view/${data._id}?_method=PUT`)
    .send({'title': 'Updating the title'})
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.html
      done();
    });
  });
})
// TEST DELETE
it('should delete a SINGLE blog on /blogs/view/<id> DELETE', (done) => {
  var review = new Blog(sampleReview);
  review.save((err, data)  => {
   chai.request(server)
    .delete(`/blogs/view/${data._id}?_method=DELETE`)
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.html
      done();
    });
  });
});
});
