function ProdutosDAO(connection) {
    this._connection = connection;
}

ProdutosDAO.prototype.getTodosProdutos = function (callback) {
    this._connection.query('SELECT * FROM produtos', callback)
};

ProdutosDAO.prototype.getProdutos = function (id_produto, callback) {
    console.log(id_produto)
    this._connection.query("SELECT IDProduto, nomeProduto, tipoInstrumento, marca, preco, quantidadeEstoque, img FROM produtos WHERE IDProduto = " + id_produto.id_produto, callback)
}
ProdutosDAO.prototype.salvarProdutos = function (produtos, callback) {
    this._connection.query("INSERT INTO produtos SET ? ", produtos, callback)
};

ProdutosDAO.prototype.salvarUsuario = function (usuario, callback) {
    console.log(usuario)
    this._connection.query("INSERT INTO clientes SET ? ", usuario, callback)
};

ProdutosDAO.prototype.getLogin = function (campusDeUsuario, callback) {
    this._connection.query("SELECT IDCliente FROM clientes WHERE email = '" + campusDeUsuario.email + "'AND senha ='" + campusDeUsuario.senha + "'", callback)
};

ProdutosDAO.prototype.getLoginAdm = function (campusDeUsuario, callback) {
    this._connection.query("SELECT IDAdm FROM adm WHERE email = '" + campusDeUsuario.email + "'AND senha ='" + campusDeUsuario.senha + "'", callback)
};

ProdutosDAO.prototype.getProdutosCarrinho = function (carrinho, callback) {
    console.log(carrinho)
    console.log("chegou no model")
    this._connection.query("SELECT * FROM Produtos p JOIN carrinho c ON p.IDProduto  = c.IDProduto WHERE IDCliente = " + carrinho.codLogado, callback)
};

// ProdutosDAO

ProdutosDAO.prototype.verificarProdutoNoCarrinho = function (carrinho, callback) {
    this._connection.query(
        "SELECT * FROM carrinho WHERE IDProduto = ? AND IDCliente = ?",
        [carrinho.IDProduto, carrinho.IDCliente],
        callback
    );
};

ProdutosDAO.prototype.salvarProdutoCarrinho = function (carrinho, callback) {
    this.verificarProdutoNoCarrinho(carrinho, (err, result) => {
        if (err) {
            return callback(err);
        }

        if (result.length > 0) {
            // O produto já está no carrinho, você pode tratar isso de acordo (por exemplo, enviar uma mensagem de erro)
            return callback(new Error("Produto já está no carrinho"));
        }

        // O produto não está no carrinho, então você pode adicionar
        this._connection.query("INSERT INTO carrinho SET ?", carrinho, callback);
    });
};

ProdutosDAO.prototype.deletarProdutoCarrinho = function (carrinho, callback) {
    this._connection.query(
        "DELETE FROM carrinho WHERE IDCliente = ? AND IDProduto = ?",
        [carrinho.IDCliente, carrinho.IDProduto],
        callback
    );
};

ProdutosDAO.prototype.editarQuantidadeProdutoCarrinho = function (carrinho, callback) {
    console.log(carrinho)
    this._connection.query(
        "UPDATE carrinho SET quantidade = ? WHERE IDCliente = ? AND IDProduto = ?",
        [carrinho.quantidade, carrinho.IDCliente, carrinho.IDProduto],
        callback
    );
};

ProdutosDAO.prototype.salvarPedido = function (pedido, callback) {
    console.log(pedido)
    this._connection.query("INSERT INTO pedidos (IDCliente, data_pedido, valor_total) VALUES (?, ?, ?)", [pedido.IDCliente, pedido.data_pedido, pedido.valor_total], callback);
};

ProdutosDAO.prototype.deletarCarrinho = function (pedido, callback) {
    this._connection.query(
        "DELETE FROM carrinho WHERE IDCliente = ?",
        [pedido.IDCliente],
        callback
    );
}

ProdutosDAO.prototype.getUltimoIDPedido = function (pedido, callback) {
    console.log(pedido)
    this._connection.query("SELECT IDPedido FROM pedidos WHERE IDCliente = '" + pedido.IDCliente + "' ORDER BY IDPedido DESC LIMIT 1", callback);
};

ProdutosDAO.prototype.salvarItensPedidos = async function (id_pedido, pedido, callback) {
    console.log(id_pedido);

    for (let i = 0; i < pedido.IDProduto.length; i++) {
        console.log(id_pedido);
        console.log(pedido.IDProduto[i]);

        await new Promise((resolve, reject) => {
            this._connection.query(
                "INSERT INTO itenspedidos(IDPedido, IDProduto, quantidade) VALUES (?, ?, ?)",
                [id_pedido[0].IDPedido, pedido.IDProduto[i], pedido.quantidade[i]],
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    callback(null, 'Itens pedidos salvos com sucesso');
};


ProdutosDAO.prototype.getHistoricoPedidos = function (historico, callback) {
    console.log("chegou model")
    console.log(historico)
    console.log(historico.codLogado)
    this._connection.query("SELECT DISTINCT i.IDPedido, valor_total,data_pedido From produtos p join itenspedidos i ON p.IDProduto = i.IDProduto JOIN pedidos pd ON pd.IDPedido = i.IDPedido WHERE IDCliente = " + historico.codLogado, callback);
};


ProdutosDAO.prototype.getDetalheProduto = function (historico, callback) {
    console.log("chegou model")
    console.log(historico)
    console.log(historico.codLogado)
    console.log(historico.codPedido)
    this._connection.query("SELECT NomeProduto, Preco, p.IDProduto, i.IDPedido, quantidade, valor_total,data_pedido From produtos p join itenspedidos i ON p.IDProduto = i.IDProduto JOIN pedidos pd ON pd.IDPedido = i.IDPedido WHERE IDCliente = '" + historico.codLogado + "' AND i.IDPedido = " + historico.codPedido , callback);
};

ProdutosDAO.prototype.deletarProduto = function (produto, callback) {
    this._connection.query(
        "DELETE FROM produtos WHERE IDProduto = ?",
        [produto.id_produto],
        callback
    );
}
ProdutosDAO.prototype.salvarEdicaoProduto = function (produtos, callback) {
    console.log("model")
    console.log(produtos)
    this._connection.query(
        "UPDATE produtos SET nomeProduto = ?, tipoInstrumento = ?, marca = ?, preco = ?, quantidadeEstoque = ?, img = ? WHERE IDProduto = ?",
        [produtos.nomeProduto, produtos.tipoInstrumento, produtos.marca, produtos.preco, produtos.quantidadeEstoque, produtos.img, produtos.id],
        callback
    );
};

module.exports = function () {
    return ProdutosDAO;
}