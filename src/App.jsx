import { useState } from 'react'
import './App.css'

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
        <label>Destino</label>
        <input
          type="text"
          placeholder="Digite aqui"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        />

        <label>Data</label>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          />

        </div>

        <div className="linha">
          <label>Valor Gasto (R$)</label>
          <input
            type="number"
            value={gasto}
            onChange={(e) => setGasto(e.target.value)}
            />

          <label>KM Rodados</label>
          <input
            type="number"
            value={km}
            onChange={(e) => setReembolso (e.target.value)}
          />

        <button onClick={addViagem} className='btn-add'>
          + Adicionar Viagem ✔
        </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Destino</th>
            <th>Gasto</th>
            <th>KM</th>
            <th>Reembolso</th>
            <th>Saldo</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {viagens.map((v) => (
            <tr key={v.id}>
              <td>{new Date(v.data).toLocaleDateString()}</td>
              <td>{v.destino}</td>
              <td>{v.gasto.toFixed(2)}</td>
              <td>{v.km}</td>
              <td>{v.reembolso.toFixed(2)}</td>
              <td style={{ color : v.saldo >= 0 ? "green" : "red"}}>
                {v.saldo >= 0 ? "+" : ""}
                {v.saldo.toFixed(2)}
              </td>
              <td>
                <button onClick={() => excluirViagem(v.id)} classname="btn-del">X</button>
              </td>
            </tr>
        ))}
        </tbody>
      </table>

      {viagens.lenght > 0 && (
        <div className="resumo">
          <p>total gasto: R$ {totalGasto.toFixed(2)}</p>
          <p>Total KM: {totalKm} Km</p>
          <p>Total Reembolso: R$ {totalReembolso.toFixed(2)}</p>
          <p style={{ color: saldoFinal >= 0 ? "green" : "red"}}>
            Saldo Final: {saldoFinal >= 0 ? "+" : ""}
            {saldoFinal.toFixed(2)}
          </p>
          <p>Média de KM/Viagem : {MediaKeyMessageEvent.toFixed(0)} km</p>
          </div>
      )}
    </div>
  );
}

export default App
