module.exports = function (app) {
    app.get('/produtos', function(req, res){
        app.app.controllers.produtos.produtos(app, req, res);
    });

    app.get('/produtos/deletar',function(req,res){
        app.app.controllers.produtos.deletar_produto(app,req,res);
    });
};


