// Lógica de Autenticação do Administrador
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const loginFeedback = document.getElementById("login-feedback");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const usuarioInput = document.getElementById("username").value.trim();
            const senhaInput = document.getElementById("password").value.trim();

            // Credenciais simuladas do Admin (pode alterar conforme preferir)
            const adminUser = "admin";
            const adminPass = "1234";

            if (usuarioInput === adminUser && senhaInput === adminPass) {
                // Define o status de autenticação no localStorage
                localStorage.setItem("gameHistoryAdminLogado", "true");

                if (loginFeedback) {
                    loginFeedback.className = "form-feedback success";
                    loginFeedback.textContent = "Login bem-sucedido! Redirecionando...";
                }

                // Redireciona para a página de mensagens/painel após 1 segundo
                setTimeout(() => {
                    window.location.href = "mensagem.html";
                }, 1000);

            } else {
                if (loginFeedback) {
                    loginFeedback.className = "form-feedback error";
                    loginFeedback.style.color = "var(--accent-red)";
                    loginFeedback.textContent = "Usuário ou senha incorretos!";
                }
            }
        });
    }
});