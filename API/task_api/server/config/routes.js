var require_1 = require('../controllers/api_control.js')
module.exports = function(app){
    app.get('/tasks', function(request, response) {
        require_1.index(request, response);
    })
    app.get('/tasks/:id', function(request, response){
        require_1.find(request, response);
    })
    app.post('/tasks', function (request, response){
        require_1.create(request, response);     
    })
    app.put('/tasks/:id', function(request, response){
        require_1.update(request, response);
    })
    app.delete('/tasks/:id', function (request, response){
        require_1.remove(request, response);
    })

}