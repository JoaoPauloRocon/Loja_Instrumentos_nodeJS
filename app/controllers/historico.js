module.exports.mostrar_historico = function (app, req, res) {
    var historico = req.query;
    console.log("chegou controller")
    console.log(historico)


    var connection = app.config.dbConnection();
    var historicoModel = new app.app.models.produtosDAO(connection);
    historicoModel.getHistoricoPedidos(historico, function(error, result){
        console.log(result)
        res.render("Pedidos/historico", { JHistorico: result, flagAdmin: req.session.autorizado, codLogado: req.session.codLogado});
    });
}

module.exports.detalhamento_pedido = function (app, req, res) {
    var historico = req.query;
    console.log("chegou controller")
    console.log(historico)

    var connection = app.config.dbConnection();
    var historicoModel = new app.app.models.produtosDAO(connection);
    historicoModel.getDetalheProduto(historico, function(error, result){
        
        result.forEach(function (item) {
            item.subtotal = (item.Preco * item.quantidade).toFixed(2);
        });

        console.log(result)

        res.render("Pedidos/detalhe_pedido", { JHistorico: result, flagAdmin: req.session.autorizado, codLogado: req.session.codLogado});
    });
}