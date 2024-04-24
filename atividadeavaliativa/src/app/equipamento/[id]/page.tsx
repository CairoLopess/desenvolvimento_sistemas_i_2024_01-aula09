"use client";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../../services/api";


// Definição da interface IEquipamentosParams para tipagem dos parâmetros da rota
interface IEquipamentosParams extends Params {
  id: string;
}

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

export default function EquipamentoDetails() {
  const router = useRouter();
  // Captura dos parâmetros da rota
  const params: IEquipamentosParams = useParams();
  const { id } = params;
  // Estado para armazenar os dados do equipamento
  const [equipamento, setEquipamento] = useState<IEquipamentos | null>(null);

  // Efeito para buscar os dados do esquipamento ao carregar o componente
  useEffect(() => {
    const fetchEquipamento = async () => {
      try {
        const response = await api.get(`/equipamentos/${id}`);
        setEquipamento(response.data);
      } catch (error) {
        console.error("Erro ao buscar equipamento:", error);
      }
    };

    if (id) {
      fetchEquipamento();
    }
  }, [id]);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Detalhes do equipamento
      </h1>
      {equipamento ? (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10 p-6">
          <h2 className="font-bold text-xl text-black text-center uppercase mb-2">
            ID: {equipamento.id}
          </h2>
          <p className="font-bold text-xl text-black text-center uppercase mb-2">
            <strong>Tipo:</strong> {equipamento.tipo}
          </p>
          <p className="font-bold text-xl text-black text-center uppercase mb-2">
            <strong>Marca:</strong> {equipamento.marca}
          </p>
          <p className="font-bold text-xl text-black text-center uppercase mb-2">
            <strong>Modelo:</strong> {equipamento.modelo}
          </p>
          <p className="font-bold text-xl text-black text-center uppercase mb-2">
            <strong>Data de aquisição:</strong> {`${equipamento.data_aquisicao}`}
          </p>
          <p className="font-bold text-xl text-black text-center uppercase mb-2">
            <strong>Numero de Série:</strong> {equipamento.numero_serie}
          </p>
          <p className="font-bold text-xl text-black text-center uppercase mb-2">
            <strong>Status:</strong> {equipamento.status}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10 p-6">
          <p className="font-bold text-xl text-black text-center uppercase mb-2">
            Carregando...
          </p>
        </div>
      )}
      {/* Botão para voltar para a página anterior */}
      <div className="flex justify-center">
        <button
          onClick={handleGoBack}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
