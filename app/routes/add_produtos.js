
module.exports = function(app){
    app.get('/admin', function(req,res){
        
        app.app.controllers.admin.add_produtos(app, req, res);
    });

    app.get('/produtos/editar_produto',function(req,res){
        app.app.controllers.produtos.form_editar_produto(app,req,res);
    });

    app.post('/produtos/salvar_edicao_produto',app.upload.single("file"),function(req,res){
        app.app.controllers.produtos.salvar_edicao_produto(app,req,res);
    });

    app.post('/produtos/salvar',app.upload.single("file"), function(req, res){
        app.app.controllers.admin.produtos_salvar(app, req, res);
    })
    app.post('/autenticar', function(req, res){
        app.app.controllers.admin.login_autenticar(app, req, res);
    })
    app.get('/login', function(req, res){
        app.app.controllers.admin.form_login(app, req, res);
    })
    app.get('/sair', function(req, res){
        app.app.controllers.admin.sair(app, req, res);
    });
}
