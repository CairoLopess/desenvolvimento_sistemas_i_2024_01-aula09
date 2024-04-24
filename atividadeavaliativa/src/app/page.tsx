"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "../services/api";


// Definição da interface Iequipamento para tipagem dos dados do usuário
interface IEquipamentos {
  id: number;
  tipo: string;
  marca: string;
  modelo: string;
  numero_serie: string;
  data_aquisicao: Date;
  status : string;
}

// Função assíncrona para buscar os usuários da API
async function fetchEquipamentos(): Promise<IEquipamentos[]> {
  const result = await api.get("/equipamentos");
  return result.data;
}

export default function Home() {
  // Estados para armazenar os equipamentos, o estado de carregamento e os equipamentos filtrados
  const [equipamentos, setEquipamentos] = useState<IEquipamentos[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredEquipamentos, setFilteredEquipamentos] = useState<IEquipamentos[]>([]);
  // Estado para armazenar o termo de busca do filtro por tipo
  const [searchTermT, setSearchTermT] = useState<string>("");
  // Estado para armazenar o termo de busca do filtro por marca
  const [searchTermM, setSearchTermM] = useState<string>("");
  
  // Efeito para carregar os equipamentos quando o componente é montado
  useEffect(() => {
    const getEquipamentos = async () => {
      const equipamentosData = await fetchEquipamentos();
      setEquipamentos(equipamentosData)
      setFilteredEquipamentos(equipamentosData)
      setLoading(false);
    };
    getEquipamentos();
  }, []);

  const handleDeleteEquipamento = async (equipamentoId: number) => {
    try {
      
      await api.delete(`/equipamentos/${equipamentoId}`);
      // Atualiza a lista de equipamentos após a exclusão
      setEquipamentos(equipamentos.filter((equipamento) => equipamento.id !== equipamentoId));
      setFilteredEquipamentos(filteredEquipamentos.filter((equipamento) => equipamento.id !== equipamentoId));
    } catch (error) {
      console.error("Erro ao excluir equipamento:", error);
    }
    
  };

  // Função para filtrar por tipo
  const filtroTipo = () => {
    const filtered = equipamentos.filter((equipamento) =>
      equipamento.tipo.toLowerCase().includes(searchTermT.toLowerCase())
    );
    setFilteredEquipamentos(filtered);
  };
  // funcao para filtrar por marca
  const filtroMarca = () => {
    const filtered = equipamentos.filter((equipamento) =>
      equipamento.marca.toLowerCase().includes(searchTermM.toLowerCase())
    );
    setFilteredEquipamentos(filtered);
  };
 
  if (loading) {
    return (
      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Carregando...</h1>
      </main>
    );
  }
  // Renderização da página 
  return (
    <main className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Equipamentos</h1>
      {/* Formulário de filtro por tipo */}
      <div className="flex mb-8 mt-8 justify-center items-center">
        <input
          type="text"
          placeholder="Filtrar por tipo"
          value={searchTermT}
          onChange={(e) => setSearchTermT(e.target.value)}
          className="border border-gray-300 text-black rounded-md px-3 py-2 mr-2"
        />
        <button
          onClick={filtroTipo}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Filtrar
        </button>
        {/* formularios para filtrar por marcas */}
        <input
          type="text"
          placeholder="Filtrar por marca"
          value={searchTermM}
          onChange={(e) => setSearchTermM(e.target.value)}
          className="border border-gray-300 text-black rounded-md px-3 py-2 mr-2"
        />
        <button
          onClick={filtroMarca}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Filtrar
        </button>
      </div>
      {/* Lista de usuários renderizada */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Verificação se existem usuários a serem exibidos */}
        {filteredEquipamentos.length > 0 ? (
          // Mapeamento e renderização dos usuários filtrados
          filteredEquipamentos.map((equipamento: IEquipamentos) => {
            return (
              <div
                key={equipamento.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10"
              >
                <div className="px-6 py-4 flex-grow flex flex-col justify-between">
                  {/* Nome do usuário */}
                  <h2 className="font-bold text-xl text-black text-center uppercase mb-2 h-auto overflow-hidden">
                    tipo = {equipamento.tipo}
                    <br />
                    marca = {equipamento.marca}
                  </h2>
                  
                </div>

                <div className="px-6 pt-4 pb-4 flex items-center justify-center text-center">
                  {/* Informações adicionais do usuário */}
                  <span className="inline-block w-[30%] bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    ID: {equipamento.id}
                  </span>
                  <span className="inline-block w-[30%] bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {equipamento.status}
                  </span>
                </div>
                <div className="px-6 pt-4 pb-4 flex items-center justify-center text-center">
                  {/* Botões de ação para exclusão, edição e detalhes */}
                  <button
                    onClick={() => handleDeleteEquipamento(equipamento.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Excluir
                  </button>
                  <Link href={`/editequi/${equipamento.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
                      Editar
                    </button>
                  </Link>
                  <Link href={`/equipamento/${equipamento.id}`}>
                    <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                      Detalhes
                    </button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
        
          <h1>Nenhum equipamento encontrado!</h1>
        )}
      </section>
    </main>
  );
}