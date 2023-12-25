module.exports.index = function (app,req,res) {
  var connection = app.config.dbConnection();
    var homeModel = new app.app.models.produtosDAO(connection);
    homeModel.getTodosProdutos(function(error, result){
      console.log('home')
      console.log(result)
        res.render("home/index", { JProdutos : result , flagAdmin: req.session.autorizado ,codLogado: req.session.codLogado});
    })
};