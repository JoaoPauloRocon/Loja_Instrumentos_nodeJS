module.exports = function (app) {
    app.get('/produtos/detalhe_produto', function(req, res){
        app.app.controllers.detalhe_produto.detalhe_produto(app, req, res);
    });
};