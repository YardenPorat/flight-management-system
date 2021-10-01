const { shutDown } = require('./test-server');

after(function (done) {
    shutDown();
    done();
});
