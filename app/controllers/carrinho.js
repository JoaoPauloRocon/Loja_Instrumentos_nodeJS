module.exports.salvar_carrinho = function (app, req, res) {
    var carrinho = req.body;

    // Movido a declaração para cima para evitar erros de referência
    var erros = req.validationErrors();

    console.log(erros);
    console.log('-----------------------------------');
    console.log(carrinho);

    if (erros) {
        res.render('produtos/produtos', { validacao: erros, produtos: produtos, flagAdmin: req.session.autorizado, codLogado: req.session.codLogado });
        return;
    }

    var connection = app.config.dbConnection();
    var salvarCarrinhoModel = new app.app.models.produtosDAO(connection);

    salvarCarrinhoModel.verificarProdutoNoCarrinho(carrinho, function (error, result) {
        if (error) {
            res.status(500).send("Erro ao verificar produto no carrinho");
            return;
        }

        salvarCarrinhoModel.salvarProdutoCarrinho(carrinho, function (error, result) {
            res.redirect('/carrinho?codLogado=' + req.session.codLogado);
        });
    });
};


module.exports.mostrar_carrinho = function (app, req, res) {
    var carrinho = req.query;
    console.log(carrinho)

    var connection = app.config.dbConnection();
    var carrinhoModel = new app.app.models.produtosDAO(connection);
    carrinhoModel.getProdutosCarrinho(carrinho, function(error, result){
       
        if (result.length === 0) {
            // Se o carrinho estiver vazio, renderize uma mensagem indicando nenhum item no carrinho
            res.render("carrinho/carrinho_vazio", { flagAdmin: req.session.autorizado, codLogado: req.session.codLogado });
            return;
        }

        result.forEach(function (item) {
            item.subtotal = (item.Preco * item.quantidade).toFixed(2);
        });

        var total = 0;
        result.forEach(function (item) {
            total += item.Preco * item.quantidade;
        });

        console.log(result)
        console.log(total)

        res.render("carrinho/carrinho", { JCarrinho: result, total: total, flagAdmin: req.session.autorizado, codLogado: req.session.codLogado});
    });
}

module.exports.deletar_produto_carrinho = function (app, req, res) {
    var carrinho = req.body;
    console.log(carrinho)

    var connection = app.config.dbConnection();
    var carrinhoModel = new app.app.models.produtosDAO(connection);

    carrinhoModel.deletarProdutoCarrinho(carrinho, function (error, result) {
        res.redirect('/carrinho?codLogado=' + req.session.codLogado);
    });
}

module.exports.editar_quantidade_carrinho = function (app, req, res) {
    var carrinho = req.body;
    console.log(carrinho)

    var connection = app.config.dbConnection();
    var carrinhoModel = new app.app.models.produtosDAO(connection);

    carrinhoModel.editarQuantidadeProdutoCarrinho(carrinho, function (error, result) {
        res.redirect('/carrinho?codLogado=' + req.session.codLogado);
    });
}