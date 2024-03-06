import React, { useState, useEffect } from "react";

let nextId = 0;

export default function List() {
  const [nome, setNome] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);

  useEffect(() => {
    ordenarProdutos(); // Ordenar os produtos sempre que a lista de produtos for atualizada
  }, [produtos]); // Executar o efeito sempre que a lista de produtos for atualizada

  //verificar se é possível ordenar a lista de produtos sem usar o useEffect

  const adicionarProduto = () => {
    setProdutos([...produtos, { id: nextId++, nome: nome, qtde: '1'}]); // adiciona os itens na lista
    setNome(""); // Limpa o campo de entrada depois de adicionar o produto
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      adicionarProduto();
    }
  };

  const ordenarProdutos = () => {
    const produtosOrdenados = [...produtos].sort((a, b) => { //cria uma cópia da lista de produtos e ordena os produtos pelo nome
      return a.nome.localeCompare(b.nome);  //comparação
    });
    setProdutos(produtosOrdenados);
  };

  const handleCheckboxChange = (id) => {
    if (produtosSelecionados.includes(id)) { //verifica se o produto já está selecionado
      setProdutosSelecionados(produtosSelecionados.filter((item) => item !== id)); //remove o produto da lista de produtos selecionados
    } else {
      setProdutosSelecionados([...produtosSelecionados, id]);//mantem o produto na lista
    }
  };

  const deletarProdutosSelecionados = () => {
    const novosProdutos = produtos.filter((produto) => !produtosSelecionados.includes(produto.id)); //cria um novo array com os produtos que não foram selecionados
    setProdutos(novosProdutos); //atualzia a lista de produtos
    setProdutosSelecionados([]); //limpa a lista de produtos selecionados
  };

  const selecionarTodos = () => {
    if (produtosSelecionados.length === produtos.length) { //se todos os produtos estiverem selecionados
      setProdutosSelecionados([]);//limpa a lista de produtos selecionados
    } else {
      setProdutosSelecionados(produtos.map((produto) => produto.id)); //seleciona todos os produtos
    }
  };


  return (
    <>
      <h1>Lista de compras</h1>
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)} //(parameter) e: React.ChangeEvent<HTMLInputElement>
        onKeyDown={handleKeyDown}
      />
      <br></br>
      <button onClick={adicionarProduto}>Adicionar</button>
      <button onClick={deletarProdutosSelecionados}>Deletar</button>
      <button onClick={selecionarTodos}>Selecionar Todos</button>
      <ul>
  {produtos.map((produto) => (
    <li key={produto.id}>
      <input
        type="checkbox"
        checked={produtosSelecionados.includes(produto.id)}
        onChange={() => handleCheckboxChange(produto.id)}
      />
      <span style={{ textDecoration: produtosSelecionados.includes(produto.id) ? 'line-through' : 'none' }}>
            {produto.nome}
          </span>
    </li>
  ))}
</ul>
    </>
  );
}
