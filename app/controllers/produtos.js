module.exports.produtos = function (app, req, res) {
    var connection = app.config.dbConnection();
    var produtosModel = new app.app.models.produtosDAO(connection);
    produtosModel.getTodosProdutos(function(error, result){
        res.render("produtos/produtos", { JProdutos : result , flagAdmin: req.session.autorizado ,codLogado: req.session.codLogado});
    })
}

module.exports.deletar_produto = function (app, req, res) {
    var produto = req.query;
    console.log(produto)

    var connection = app.config.dbConnection();
    var produtosModel = new app.app.models.produtosDAO(connection);
    produtosModel.deletarProduto(produto, function (error, result) {
        produtosModel.getTodosProdutos(function(error, result){
            res.render("produtos/produtos", { JProdutos : result , flagAdmin: req.session.autorizado ,codLogado: req.session.codLogado});
        });
        
    });
}

module.exports.form_editar_produto = function(app,req,res){
    var produto = req.query;
    console.log(produto)
    var connection = app.config.dbConnection();
    var produtosModel = new app.app.models.produtosDAO(connection);
        produtosModel.getProdutos(produto, function(error, result){
            console.log(result)
            res.render("admin/editar_produto", { JProdutos : result , flagAdmin: req.session.autorizado ,codLogado: req.session.codLogado});
        });
}

module.exports.salvar_edicao_produto = function(app,req,res){
    var produtos = req.body;

    var connection = app.config.dbConnection();    
    var produtosModel = new app.app.models.produtosDAO(connection);
    produtosModel.salvarEdicaoProduto(produtos, function(error,result){
        produtosModel.getTodosProdutos(function(error, result){
            console.log(result)
            res.render("produtos/produtos", { JProdutos : result , flagAdmin: req.session.autorizado ,codLogado: req.session.codLogado});
        });
    });
}

