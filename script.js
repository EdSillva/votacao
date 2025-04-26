const SUPABASE_URL = "https://zddudgzylqjtvanqkonv.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkZHVkZ3p5bHFqdHZhbnFrb252Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2ODU5NTEsImV4cCI6MjA2MTI2MTk1MX0.X9j_jIRI2iBfmFYs0gBwndmrhd4pyn6ZsKvubq69POc";
const TABLE_NAME = "votos";

// Exemplo: função para mostrar o popup
function mostrarPopup(mensagem) {
  // Cria um elemento div
  const popup = document.createElement("div");
  popup.innerText = mensagem;

  // Estiliza o popup
  popup.style.position = "fixed";
  popup.style.top = "20px";
  popup.style.left = "50%";
  popup.style.transform = "translateX(-50%)";
  popup.style.backgroundColor = "#4CAF50"; // verde sucesso
  popup.style.color = "white";
  popup.style.padding = "15px 30px";
  popup.style.borderRadius = "10px";
  popup.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.25)";
  popup.style.zIndex = "1000";
  popup.style.fontSize = "18px";
  popup.style.opacity = "0";
  popup.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    popup.style.opacity = "1";
  }, 100); // para garantir o efeito depois de renderizar

  setTimeout(() => {
    popup.style.opacity = "0";
    setTimeout(() => {
      popup.remove();
    }, 500); // espera a animação terminar
  }, 3000);

  document.body.appendChild(popup);

  // Remove o popup depois de 3 segundos
  setTimeout(() => {
    popup.remove();
  }, 3000);
}

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
        apikey: SUPABASE_API_KEY,
        Authorization: `Bearer ${SUPABASE_API_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ numero: parseInt(numero) }),
    });

    if (response.ok) {
      mostrarPopup("Voto enviado com sucesso! Obrigado!");
      document.getElementById("numeroInput").value = "";
    } else {
      const errorData = await response.json();
      alert("Erro ao enviar: " + (errorData.message || "Erro desconhecido"));
    }
  } catch (error) {
    alert("Erro de conexão: " + error.message);
  }
}
