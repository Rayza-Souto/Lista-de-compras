import { useState } from "react";

let nextId = 0;

export default function List() {
  const [nome, setNome] = useState("");
  const [produtos, setProdutos] = useState([]);

  return (
    <>
      <h1>Lista de compras</h1>
      <input value={nome} onChange={(e) => setNome(e.target.value)} />
      <button
        onClick={() => {
          setProdutos([...produtos, { id: nextId++, nome: nome }]);
        }}
      >
        Adicionar
      </button>
      <ul>
        {produtos.map((produtos) => (
          <li key={produtos.id}>{produtos.nome}</li>
        ))}
      </ul>
    </>
  );
}
