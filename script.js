const SUPABASE_URL = "https://zddudgzylqjtvanqkonv.supabase.co";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkZHVkZ3p5bHFqdHZhbnFrb252Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2ODU5NTEsImV4cCI6MjA2MTI2MTk1MX0.X9j_jIRI2iBfmFYs0gBwndmrhd4pyn6ZsKvubq69POc";
const TABLE_NAME = "votos"; 

async function enviar() {
  const numero = document.getElementById("numeroInput").value;

  if (!numero || numero < 1 || numero > 4) {
    alert("Por favor, insira um número entre 1 e 4.");
    return;
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_API_KEY,
        "Authorization": `Bearer ${SUPABASE_API_KEY}`,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({ numero: parseInt(numero) }),
    });

    if (response.ok) {
      alert("Voto enviado com sucesso!");
      document.getElementById("numeroInput").value = "";
    } else {
      const errorData = await response.json();
      alert("Erro ao enviar: " + (errorData.message || "Erro desconhecido"));
    }
  } catch (error) {
    alert("Erro de conexão: " + error.message);
  }
}
