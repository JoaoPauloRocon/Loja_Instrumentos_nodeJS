module.exports = function (app) {
    app.post('/pedido', function (req, res) {
        app.app.controllers.pedidos.salvar_pedido(app, req, res);
    });
}