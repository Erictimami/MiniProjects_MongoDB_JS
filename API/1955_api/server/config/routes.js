var require_1 = require('../controllers/api_control.js')
module.exports = function(app){
    app.get('/', function(request, response) {
        require_1.index(request, response);
    })
    app.get('/new/:name', function (request, response){
        require_1.create(request, response);     
    })
    app.get('/remove/:name', function (request, response){
        require_1.remove(request, response);
    })
    app.get('/:name', function(request, response){
        require_1.find(request, response);
    })

}