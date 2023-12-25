module.exports.salvar_pedido = function (app, req, res) {
    var pedido = req.body;
    console.log(pedido);
    console.log('-----------------------------------');
    console.log(pedido);

    var connection = app.config.dbConnection();
    var salvarPedidoModel = new app.app.models.produtosDAO(connection);

    salvarPedidoModel.deletarCarrinho(pedido, function (error, result) {

        salvarPedidoModel.salvarPedido(pedido, function (error, result) {
            salvarPedidoModel.getUltimoIDPedido(pedido, function (error, result) {

                var id_pedido = result;
                

                salvarPedidoModel.salvarItensPedidos(id_pedido, pedido, function (error, result) {
                    
                    salvarPedidoModel.getTodosProdutos(function(error, result){
                        res.render("home/index", { JProdutos : result , flagAdmin: req.session.autorizado ,codLogado: req.session.codLogado});
                    })

                });
            });
        });

    });

};