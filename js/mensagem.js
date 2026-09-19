document.addEventListener("DOMContentLoaded", () => {
    // 1. Verificação de Segurança (Proteção da página)
    const isAdminLogado = localStorage.getItem("gameHistoryAdminLogado");
    
    if (!isAdminLogado || isAdminLogado !== "true") {
        alert("Acesso restrito! Por favor, faça login como administrador.");
        window.location.href = "login.html";
        return; // Interrompe a execução do script
    }

    // 2. Elementos da DOM
    const containerMensagens = document.getElementById("mensagens-container");
    const btnLimparTudo = document.getElementById("btn-limpar-tudo");
    const btnLogout = document.getElementById("btn-logout");

    // Função para carregar e renderizar as mensagens
    function renderizarMensagens() {
        const mensagensSalvas = JSON.parse(localStorage.getItem("gameHistoryMensagens")) || [];

        containerMensagens.innerHTML = "";

        if (mensagensSalvas.length === 0) {
            containerMensagens.innerHTML = `
                <div style="background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; padding: 3rem; text-align: center;">
                    <i class="fa-solid fa-inbox" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <p style="color: var(--text-secondary); font-size: 1.1rem;">Nenhuma mensagem recebida até o momento.</p>
                </div>
            `;
            return;
        }

        // Percorre as mensagens (da mais recente para a mais antiga) e monta os cards
        mensagensSalvas.reverse().forEach((item) => {
            const card = document.createElement("div");
            card.style.cssText = "background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; padding: 2rem; position: relative;";

            // Formata o assunto de forma legível
            let assuntoFormatado = item.assunto;
            if (item.assunto === "sugestao") assuntoFormatado = "Sugestão de Jogo";
            if (item.assunto === "correcao") assuntoFormatado = "Correção de Conteúdo";
            if (item.assunto === "outro") assuntoFormatado = "Outro";

            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.8rem;">
                    <div>
                        <h3 style="font-size: 1.2rem; color: var(--text-primary); margin-bottom: 0.2rem;">
                            <i class="fa-solid fa-user" style="color: var(--accent-red); margin-right: 0.5rem;"></i> ${escapeHtml(item.nome)}
                        </h3>
                        <span style="font-size: 0.85rem; color: var(--text-secondary);">
                            <i class="fa-solid fa-envelope" style="margin-right: 0.3rem;"></i> ${escapeHtml(item.email)}
                        </span>
                    </div>
                    <div style="text-align: right;">
                        <span class="badge red" style="display: inline-block; margin-bottom: 0.3rem;">${escapeHtml(assuntoFormatado)}</span>
                        <br>
                        <span style="font-size: 0.75rem; color: var(--text-secondary);">${escapeHtml(item.dataHora)}</span>
                    </div>
                </div>
                <p style="color: var(--text-primary); font-size: 0.95rem; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(item.mensagem)}</p>
            `;

            containerMensagens.appendChild(card);
        });
    }

    // Função de segurança auxiliar para evitar injeção de HTML (XSS básico no front-end)
    function escapeHtml(texto) {
        if (!texto) return "";
        return texto
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Executa a listagem inicial
    renderizarMensagens();

    // 3. Botão para limpar todas as mensagens
    if (btnLimparTudo) {
        btnLimparTudo.addEventListener("click", () => {
            if (confirm("Tem certeza que deseja apagar todas as mensagens armazenadas?")) {
                localStorage.removeItem("gameHistoryMensagens");
                renderizarMensagens();
            }
        });
    }

    // 4. Botão de Logout (Sair)
    if (btnLogout) {
        btnLogout.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("gameHistoryAdminLogado");
            window.location.href = "login.html";
        });
    }
});