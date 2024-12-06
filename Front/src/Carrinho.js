import React, { useState } from "react";
import "./Carrinho.css";
import increment from "./imgs/incremento.png";
import decrement from "./imgs/decremento.png";
import trash from "./imgs/lixo.png";
import Footer from "./componentes/Footer";
import capa from "./imgs/capaPadrao.jpeg";
import setabaixo from "./imgs/setabaixo.png";
import { useCarrinho } from "./CarrinhoContext";
import { useAuth } from "./AuthContext";
import Header from "./componentes/Header";

const Carrinho = ({
  onVoltar,
  onFinalizarRedirect,
  onLoginRedirect,
  onCadastroRedirect,
  onAdicionarLivrosRedirect,
  onCarrinhoRedirect,
  onPerfilRedirect,
  handleVoltarPaginaInicial,
}) => {
  const {
    carrinho,
    aumentarQuantidade,
    diminuirQuantidade,
    removerProduto,
    totalCarrinho,
  } = useCarrinho();
  const { isAuthenticated, isAdmin } = useAuth();

  const [expanded, setExpanded] = useState({});

  const toggleDescription = (id) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="carrinho">
      <Header
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        onLoginRedirect={onLoginRedirect}
        onCadastroRedirect={onCadastroRedirect}
        onAdicionarLivrosRedirect={onAdicionarLivrosRedirect}
        onCarrinhoRedirect={onCarrinhoRedirect}
        onPerfilRedirect={onPerfilRedirect}
        onVoltar={handleVoltarPaginaInicial}
      />
      <h1>Meu carrinho</h1>
      <div className="carrinhoPrincipal">
        <div className="produtosCarrinho">
          {carrinho.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : (
            carrinho.map((item) => (
              <div key={item.id} className="produtoCarrinho">
                <img
                  src={item.capa ? item.capa : capa}
                  alt={`Capa do livro: ${item.titulo}`}
                  className="imagemProduto"
                  onError={(e) => (e.target.src = capa)}
                />
                <div className="informacoesCarrinho">
                  <div className="superior">
                    <h2>{item.titulo}</h2>
                    <p>{item.autor}</p>
                    <p>{item.genero}</p>
                    <p>{item.ano}</p>
                    <p>
                      {expanded[item.id]
                        ? item.descricao
                        : `${item.descricao.slice(0, 100)}...`}
                    </p>
                    <button
                      onClick={() => toggleDescription(item.id)}
                      className="leiaMais"
                    >
                      {expanded[item.id] ? "Leia Menos" : "Leia Mais"}
                      <img src={setabaixo} alt="icone de seta para baixo"></img>
                    </button>
                  </div>
                  <div className="inferior">
                    <p className="valor">Preço: R$ {item.preco.toFixed(2)}</p>
                    <div className="botoes">
                      <button
                        onClick={() => diminuirQuantidade(item.id)}
                        className="diminuir"
                      >
                        <img src={decrement} alt="Decrementar" />
                      </button>
                      <p className="quantidade">{item.quantidade}</p>
                      <button
                        onClick={() => aumentarQuantidade(item.id)}
                        className="aumentar"
                      >
                        <img src={increment} alt="Incrementar" />
                      </button>
                      <button
                        onClick={() => removerProduto(item.id)}
                        className="lixeira"
                      >
                        <img src={trash} alt="Remover produto" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="finalizacaoCarrinho">
          <div className="descontos">
            <input placeholder="Código do Cupom" />
            <input placeholder="CEP" />
          </div>
          <div className="descontoscalculados">
            <p>Frete: R$ </p>
            <p>Desconto: R$</p>
            <p>Subtotal: R$</p>
            <h2 className="total">Total: R$ {totalCarrinho.toFixed(2)}</h2>
            <div className="botaofinalizar">
              <button onClick={onFinalizarRedirect}>Finalizar compra</button>
              <button onClick={onVoltar} className="voltarprodutos">
                Voltar para produtos
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Carrinho;

