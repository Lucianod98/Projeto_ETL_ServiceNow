// import { info } from './config/info.ts';
// import axios from 'axios';

// async function getServiceNowData() {
//     try {
//         const response = await axios.get(info.url, {
//         headers: { 'Accept': 'application/json' },
//         auth: { username: info.user, password: info.password } // Basic Auth simplificado
//         });

//         console.log(response.data.result); // registros do Incident
//     } catch (error: any) {
//         console.error(error.response?.data || error.message);
//     }
// }

// getServiceNowData();
import { runETL } from "./config/etl.js";
import cron from "node-cron";

console.log("⏱️ CRON iniciado. Rodando ETL a cada 2 minutos...");

cron.schedule("*/2 * * * *", async () => {
  console.log("🚀 Executando ETL:", new Date().toLocaleString());
  try {
    await runETL();
    console.log("✅ ETL executado com sucesso!\n");
  } catch (error) {
    console.error("❌ Erro ao executar ETL:", error);
  }
});