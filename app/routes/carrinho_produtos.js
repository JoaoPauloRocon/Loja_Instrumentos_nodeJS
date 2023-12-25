module.exports = function(app){
    app.post('/carrinho_produtos', function(req, res){
        app.app.controllers.carrinho.salvar_carrinho(app, req, res);
    });

    app.get('/carrinho', function(req, res){
        app.app.controllers.carrinho.mostrar_carrinho(app, req, res);
    });

    app.post('/deletar_produto_carrinho', function(req, res){
        app.app.controllers.carrinho.deletar_produto_carrinho(app, req, res);
    });

    app.post('/editar_quantidade_carrinho', function(req, res){
        app.app.controllers.carrinho.editar_quantidade_carrinho(app, req, res);
    });

    app.post('/pedidos', function(req, res){
        app.app.controllers.carrinho.salvarPedido(app, req, res);
    });
}
