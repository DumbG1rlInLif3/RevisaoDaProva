import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { use } from 'react'

function App() {

  const [destino, setDestino] = useState("");
  const [data, setData] = useState("");
  const [gasto, setGasto] = useState("");
  const [km, setKm] = useState("");
  const [reembolso, setReembolso] = useState("");
  const [viagens, setViagens] = useState([]);

  //se algum campo estiver vazio, a viagem não é add. Usa-se o ! para verificação
  const addViagem = () => {
    if (!destino || !data || !gasto || !km || !reembolso) return;
  }

  const saldo = float(reembolso) - float(gasto);

//bloco para guardar todas as informações de uma viagem antes de add na lista
  const novaViagem = {
    id: Date.now(),
    destino,
    data,
    gasto: float(gasto),
    km: float(km),
    reembolso: float(reembolso),
    saldo,
  };

  serViagens([...viagens, novaViagem]);

  //limpa os campos
  setDestino("");
  setData("");
  setGasto("");
  setKm("");
  setReembolso("");

  //excluir viagem
  const excluirViagem = (id) => {
    setViagens(viagens.filter((v) => v.id !== id));
  };

  //cálculos gerais

  let totalGasto = 0;
  let totalKm = 0;
  let totalReembolso = 0;

  for (const v of viagens) {
    totalGasto += v.gasto;
    totalKm += v.km;
    totalReembolso += v.reembolso;

  }

  const saldoFinal = totalReembolso - totalGasto;
  const mediKm = viagens.lenght ? totalKm / viagens.lenght : 0;

  return (
    <div className="container">
      <h1>Controle de Viagens ✅</h1>

      <div className="form">
        <div className="linha">
        <input
          type="text"
          placeholder="Digite aqui"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        />

        <button>Adicionar</button>
        </div>
      </div>

      <ul>

        <li>
          Tarefa
          <div>
            <button className="complete-btn" >✔</button>
            <button className="delete-btn" >❌</button>
          </div>
        </li>

      </ul>
    </div>
  );
}

export default App
