import axios from "axios";
import cron from "node-cron";

const funcionarioId: number = 188;
const authorization: string = "Basic OUE2OklORkFURUNAMjAyNDow";

const fs = require("fs");
const schedules = fs.readFileSync("data/schedules.json", "utf8");

const schedules_json = JSON.parse(schedules);

const odd_days_schedules = schedules_json["odd_days"];
const even_days_schedules = schedules_json["even_days"];
const schedules_saturday = schedules_json["saturdays"];

const odd_schedule_choose =
  odd_days_schedules[Math.floor(Math.random() * odd_days_schedules.length)];
const even_schedule_choose =
  even_days_schedules[Math.floor(Math.random() * even_days_schedules.length)];
const schedule_saturday_choose =
  schedules_saturday[Math.floor(Math.random() * schedules_saturday.length)];

cron.schedule(
  `${odd_schedule_choose.ini.minute} ${odd_schedule_choose.ini.hour} * * 3,5`,
  async () => {
    try {
      await realizarRequisicao();
    } catch (error) {
      console.error("Erro na requisição:");
    }
  }
);

cron.schedule(
  `${odd_schedule_choose.end.minute} ${odd_schedule_choose.end.hour} * * 3,5`,
  async () => {
    try {
      await realizarRequisicao();
    } catch (error) {
      console.error("Erro na requisição:");
    }
  }
);

cron.schedule(
  `${even_schedule_choose.ini.minute} ${even_schedule_choose.ini.hour} * * 2,4`,
  async () => {
    try {
      await realizarRequisicao();
    } catch (error) {
      console.error("Erro na requisição:");
    }
  }
);

cron.schedule(
  `${even_schedule_choose.end.minute} ${even_schedule_choose.end.hour} * * 2,4`,
  async () => {
    try {
      await realizarRequisicao();
    } catch (error) {
      console.error("Erro na requisição:");
    }
  }
);

// Adicionando agendamento para os sábados
cron.schedule(
  `${schedule_saturday_choose.ini.minute} ${schedule_saturday_choose.ini.hour} * * 6`,
  async () => {
    try {
      await realizarRequisicao();
    } catch (error) {
      console.error("Erro na requisição:");
    }
  }
);

cron.schedule(
  `${schedule_saturday_choose.end.minute} ${schedule_saturday_choose.end.hour} * * 6`,
  async () => {
    try {
      await realizarRequisicao();
    } catch (error) {
      console.error("Erro na requisição:");
    }
  }
);

async function realizarRequisicao(): Promise<void> {
  const requestBody = {
    justificativa: "Registrar ponto",
    latitude: -5.062059,
    longitude: -42.8345309,
    precisao: 20,
    endereco: "Rua São Felix, Teresina, Piauí, Brasil",
    marcacaoOffline: false,
    viaCentralWeb: true,
    identificacaoDispositivo: "201.131.165.134",
    foraDoPerimetro: false,
    utilizaLocalizacaoFicticia: false,
    horaFoiModificada: false,
    foto: "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",
    atividadeId: null,
  };

  const queryParams = {
    funcionarioId: funcionarioId,
  };

  try {
    const response = await axios.post(
      "https://pontowebapp.secullum.com.br/27322/IncluirPonto",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization,
        },
        params: queryParams,
      }
    );

    console.log("Resposta da requisição:", response.data);
  } catch (error) {
    console.error("Erro na requisição:");
  }
}
console.log("Aplicação iniciada: " + new Date());
// realizarRequisicao();
