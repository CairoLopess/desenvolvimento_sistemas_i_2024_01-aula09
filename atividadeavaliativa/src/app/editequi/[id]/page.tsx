"use client";

import { useState, useEffect } from "react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams, useRouter } from "next/navigation";
import api from "../../../services/api";

interface IPostParams extends Params {
  id: number | string;
}

interface IEquipamento {
    tipo: string
    marca: string
    modelo: string
    numero_serie: string
    data_aquisicao: string
    status : string
}
  


export default function EditEquipamento() {
  const router = useRouter();
  const params: IPostParams = useParams();
  const { id } = params;
  const [equipamento, setEquipamento] = useState<IEquipamento>({
    tipo: "",
    marca: "",
    modelo: "",
    numero_serie: "",
    data_aquisicao: "",
    status: ""
  });

  useEffect(() => {
    const fetchEquipamento = async () => {
      try {
        const response = await api.get(`/equipamentos/${id}`);
        const equipamentoData: IEquipamento = response.data;
        setEquipamento({ ...equipamentoData,});
      } catch (error) {
        console.error("Erro ao buscar equipamento", error);
      }
    };

    if (id) {
      fetchEquipamento();
    }
  }, [id]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setEquipamento((prevEquipamento) => ({
        ...prevEquipamento,
        [name]: checked,
      }));
    } else {
      setEquipamento((prevEquipamento) => ({
        ...prevEquipamento,
        [name]: value,
      }));
    }
  };


  const handleUpdateEquipamentos = async () => {
    try {

      const response = await api.put(`/equipamentos/${id}`, {
        ...equipamento,
      });

      router.push("/");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

    return (
      
      <div className="min-h-screen flex flex-col items-center justify-center my-8">
        <form className="flex flex-col gap-3 p-12 items-center w-[50%] bg-teal-950 rounded-md border-white border-2 border-spacing-2">
          <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
            <label>Tipo</label>
            <input
              type="text"
              name="tipo"
              value={equipamento.tipo}
              onChange={handleChange}
              placeholder="tipo"
              className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
            />
          </div>
  
          <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
            <label>Marca</label>
            <input
              type="text"
              name="marca"
              value={equipamento.marca}
              onChange={handleChange}
              placeholder="marca"
              className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
            />
          </div>
  
          <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
            <label>Modelo</label>
            <input
              type="text"
              name="modelo"
              value={equipamento.modelo}
              onChange={handleChange}
              placeholder="Modelo"
              className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
            />
          </div>
  
          <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
            <label>Numero de Serie</label>
            <input
              type="text"
              name="numero_serie"
              value={equipamento.numero_serie}
              onChange={handleChange}
              placeholder="Numero de Serie"
              className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
            />
          </div>
          
          <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
            <label>Status</label>
            <input
              type="text"
              name="status"
              value={equipamento.status}
              onChange={handleChange}
              placeholder="Disponivel / Em uso"
              className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
            />
          </div>

          <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
            <label>Data de aquisição</label>
            <input
              type="date"
              name="data_aquisicao"
              value={equipamento.data_aquisicao}
              onChange={handleChange}
              placeholder="Data de aquisição"
              className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
            />
          </div>
  
          <div className="flex flex-row gap-6 items-center justify-center w-[97%]">
            <button
              type="button"
              onClick={handleUpdateEquipamentos}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Atualizar Equipamento
            </button>
  
            <button
              type="button"
              onClick={() => router.push("/")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  }