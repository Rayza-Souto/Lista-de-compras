import React, { useState, useEffect } from "react";

let nextId = 0;

export default function List() {
  const [nome, setNome] = useState("");
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    ordenarProdutos(); // Ordenar os produtos sempre que a lista de produtos for atualizada
  }, [produtos]); // Executar o efeito sempre que a lista de produtos for atualizada

  const adicionarProduto = () => {
    setProdutos([...produtos, { id: nextId++, nome: nome }]);
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

  return (
    <>
      <h1>Lista de compras</h1>
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={adicionarProduto}>Adicionar</button>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>{produto.nome}</li>
        ))}
      </ul>
    </>
  );
}
