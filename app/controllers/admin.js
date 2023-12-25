module.exports.add_produtos = function (app, req, res) {
    if (req.session.autorizado) {
        res.render('admin/add_produtos', { validacao: {}, produtos: {}, flagAdmin: req.session.autorizado, codLogado: req.session.codLogado });
    } else {
        var erro = [];
        erro.push = ({ msg: 'Usuário precisa fazer login!' });
        res.render('admin/add_produtos', { validacao: {}, flagAdmin: req.session.autorizado, codLogado: req.session.codLogado });
    }
}

module.exports.form_login = function (app, req, res) {
    res.render('form_login/form_login', { validacao: {}, flagAdmin: req.session.autorizado, codLogado: req.session.codLogado });
}

module.exports.produtos_salvar = function (app, req, res) {
    var produtos = req.body;

    if(req.file != undefined){
        produtos.img = req.file.filename;
    }
    req.assert('nomeProduto', 'Nome do Produto é Obrigatório').notEmpty();
    req.assert('tipoInstrumento', 'Tipo do Instrumento é Obrigatório').notEmpty();
    req.assert('marca', 'Marca é Obrigatória').notEmpty();
    req.assert('preco', 'Preço é Obrigatório').notEmpty()
    req.assert('quantidadeEstoque', 'A Quantidade em Estoque é Obrigatória').notEmpty();


    console.log('-----------------------------------')
    console.log(produtos)

    var erros = req.validationErrors();
    console.log(erros);

    if (erros) {
        res.render('admin/add_produtos', { validacao: erros, produtos: produtos, flagAdmin: req.session.autorizado, codLogado: req.session.codLogado });
        return;
    }

    var connection = app.config.dbConnection();
    var salvarProdutosModel = new app.app.models.produtosDAO(connection);
    salvarProdutosModel.salvarProdutos(produtos, function (error, result) {
        res.redirect('/produtos')
    });
}

module.exports.login_autenticar = function (app, req, res) {
    var campusDeUsuario = req.body;
    req.assert('email','Usuário é obrigatório').notEmpty();
    req.assert('senha','Senha é obrigatória').notEmpty();
    var erros = req.validationErrors();
    console.log(erros)
    if(erros){
        res.render("form_login/form_login",{validacao : erros, flagAdmin : req.session.autorizado, codLogado: req.session.codLogado });
        return;
    }
    
    var connection = app.config.dbConnection();
    var autentificacao = new app.app.models.produtosDAO(connection);
    console.log(campusDeUsuario)

    autentificacao.getLogin(campusDeUsuario, function (error, result) {
        if (result.length != 0) {
            req.session.autorizado = 'usuario';
            req.session.codLogado = result[0].IDCliente;
            res.redirect('/produtos');
            return;
        } else {
            autentificacao.getLoginAdm(campusDeUsuario, function (error, result) {
                if (result.length != 0) {
                    req.session.autorizado = 'adm';
                    req.session.codLogado = result[0].IDAdm;
                    res.redirect('/produtos');
                    console.log(result)
                    return;
                }
                var erro = [];
                erro.push({ msg: "Usuario ou Senha Incorretos!" })
                res.render('form_login/form_login', { validacao: erro, flagAdmin: req.session.autorizado, codLogado: req.session.codLogado });
                return;
            });
        }

    });
}

module.exports.sair = function (app, req, res) {
    req.session.destroy(function (error) {
        res.redirect('/login')
    })
}
