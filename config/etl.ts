import axios from "axios";
import { db } from "../config/db.js";  // <-- Aqui importa o seu pool como db
import { info } from "../config/info.js";

async function runETL() {
  try {
    console.log("🔹 Extraindo dados do ServiceNow...");

    // 1. Extração - busca incidentes no ServiceNow
    const response = await axios.get(info.url, {
      headers: { "Accept": "application/json" },
      auth: {
        username: info.user,
        password: info.password
      }
    });

    const incidents = response.data.result;
    console.log(`✅ Total de incidentes encontrados: ${incidents.length}`);

    // 2. Load - insere no MySQL
    for (const incident of incidents) {
      await db.execute(
        `INSERT INTO incidentes (number, short_description, state, priority, created_at) 
         VALUES (?, ?, ?, ?, ?)`,
        [
          incident.number,
          incident.short_description,
          incident.state,
          incident.priority,
          new Date(incident.sys_created_on)
        ]
      );
    }

    console.log("✔ Dados inseridos no MySQL com sucesso!");
  } catch (error: any) {
    console.error("❌ Erro no ETL:", error.response?.data || error.message);
  }
}

export{runETL}
