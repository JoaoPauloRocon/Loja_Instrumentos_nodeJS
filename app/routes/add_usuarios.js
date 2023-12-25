module.exports = function(app){
    app.get('/form_add_usuario', function(req, res){
    var erros = req.validationErrors();

    if (erros) {
        console.log(erros);
        res.render('form_login/form_add_usuario', {validacao: erros, flagAdmin: req.session.autorizado, codLogado: req.session.codLogado });
        return;
    }
        res.render("form_login/form_add_usuario", {validacao: erros});
    });

    app.post('/cadastro_usuario', function(req, res){
        console.log('chego aq')
        app.app.controllers.usuarios.salvar_usuario(app, req, res);
    });
}