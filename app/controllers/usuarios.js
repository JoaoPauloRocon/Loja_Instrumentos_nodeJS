module.exports.salvar_usuario = function (app, req, res) {
    var usuario = req.body;

    req.assert('nome', 'Nome  é Obrigatório').notEmpty();
    req.assert('sobrenome', 'Sobrenome é Obrigatório').notEmpty();
    req.assert('email', 'Email é Obrigatório').notEmpty();
    req.assert('senha', 'Senha é Obrigatória').notEmpty()

    
    console.log('-----------------------------------')
    console.log(usuario)


    var erros = req.validationErrors();
    console.log(erros);

    if (erros) {
        console.log(erros);
        res.render('form_login/form_add_usuario', {validacao: erros, flagAdmin: req.session.autorizado, codLogado: req.session.codLogado });
        return;
    }

    var connection = app.config.dbConnection();
    var salvarUsuarioModel = new app.app.models.produtosDAO(connection);
    salvarUsuarioModel.salvarUsuario(usuario, function (error, result) {
        res.redirect('/produtos')
    });
}