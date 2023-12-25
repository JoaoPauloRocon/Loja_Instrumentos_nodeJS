module.exports = function(app){
    app.get('/historico', function(req, res){
        console.log("chegou routes")
        app.app.controllers.historico.mostrar_historico(app, req, res);
    });

    app.get('/detalhe_pedido', function(req, res){
        console.log("chegou routes")
        app.app.controllers.historico.detalhamento_pedido(app, req, res);
    });
}