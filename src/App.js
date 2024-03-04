import React, { useState, useEffect } from "react";

let nextId = 0;

export default function List() {
  const [nome, setNome] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);

  useEffect(() => {
    ordenarProdutos(); // Ordenar os produtos sempre que a lista de produtos for atualizada
  }, [produtos]); // Executar o efeito sempre que a lista de produtos for atualizada

  const adicionarProduto = () => {
    setProdutos([...produtos, { id: nextId++, nome: nome }]); // adiciona os itens na lista
    setNome(""); // Limpa o campo de entrada depois de adicionar o produto
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      adicionarProduto();
    }
  };

  const ordenarProdutos = () => {
    const produtosOrdenados = [...produtos].sort((a, b) => {
      return a.nome.localeCompare(b.nome);
    });
    setProdutos(produtosOrdenados);
  };

  const handleCheckboxChange = (id) => {
    if (produtosSelecionados.includes(id)) {
      setProdutosSelecionados(produtosSelecionados.filter((item) => item !== id));
    } else {
      setProdutosSelecionados([...produtosSelecionados, id]);
    }
  };

  const deletarProdutosSelecionados = () => {
    const novosProdutos = produtos.filter((produto) => !produtosSelecionados.includes(produto.id)); //cria um novo array com os produtos que não foram selecionados
    setProdutos(novosProdutos); //atualzia a lista de produtos
    setProdutosSelecionados([]); //limpa a lista de produtos selecionados
  };


  return (
    <>
      <h1>Lista de compras</h1>
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)} //(parameter) e: React.ChangeEvent<HTMLInputElement>
        onKeyDown={handleKeyDown}
      />
      <button onClick={adicionarProduto}>Adicionar</button>
      <button onClick={deletarProdutosSelecionados}>Deletar</button>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
           <input
              type="checkbox"
              checked={produtosSelecionados.includes(produto.id)}
              onChange={() => handleCheckboxChange(produto.id)}
            />
            {produto.nome} 
            </li>
        ))}
      </ul>
    </>
  );
}
