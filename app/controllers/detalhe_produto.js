module.exports.detalhe_produto = function (app, req, res) {
    var connection = app.config.dbConnection();
    var produtosModel = new app.app.models.produtosDAO(connection);
    var id_produto = req.query;
    console.log(id_produto)
    produtosModel.getProdutos(id_produto,function(error, result){
        console.log(result)
        res.render("./detalhe_produto/detalhe_produto", { JProdutos : result , flagAdmin: req.session.autorizado, codLogado: req.session.codLogado});
    })
}

