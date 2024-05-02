import cron from 'node-cron';
import axios from 'axios';
import { randomTime } from './random-time'

const funcionarioId = 186;
const authorization = "Basic NjU0OkNhc3NpMzIx";

cron.schedule('0 0 * * *', () => {
  // Clear all tasks
  for (const [name,task] of cron.getTasks()) {
    if (name === 'ponto') {
      task.stop()
    }
  }

  cron.schedule(`${randomTime()} 8,12 * * 1-6`, 
    async () => {
      try {
        await realizarRequisicao();
      } catch (error) {
        console.error('Erro na requisição:');
      }
    }, {
      name: 'ponto',
    }
  );
}, {
  runOnInit: true
})


async function realizarRequisicao(): Promise<void> {
  const requestBody = {
    justificativa: "Resgistrando ponto",
    latitude: -5.0888704,
    longitude: -42.8048384,
    precisao: 3342.836687001363,
    endereco: "Rua Desembargador Pires de Castro, Teresina, Piauí, Brasil",
    marcacaoOffline: false,
    viaCentralWeb: true,
    identificacaoDispositivo: "187.19.169.96",
    foraDoPerimetro: false,
    utilizaLocalizacaoFicticia: false,
    horaFoiModificada: false,
    foto:"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",
    atividadeId: null
  };

  const queryParams = {
    funcionarioId,
  };

  try {
    const response = await axios.post('https://pontowebapp.secullum.com.br/27322/IncluirPonto', requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authorization
      },
      params: queryParams
    });

    console.log('Resposta da requisição:', response.data);
  } catch (error) {
    console.error('Erro na requisição:');
  }
}
console.log('Aplicação iniciada: '+ new Date());
// realizarRequisicao()
