document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
    const formFeedback = document.getElementById("form-feedback");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const nome = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const assunto = document.getElementById("subject").value;
            const mensagem = document.getElementById("message").value.trim();
            
            if (!nome || !email || !assunto || !mensagem) {
                if (formFeedback) {
                    formFeedback.className = "form-feedback error";
                    formFeedback.textContent = "Por favor, preencha todos os campos.";
                }
                return;
            }

            const novaMensagem = {
                id: Date.now(),
                nome: nome,
                email: email,
                assunto: assunto,
                mensagem: mensagem,
                dataHora: new Date().toLocaleString('pt-BR')
            };

            let mensagensSalvas = JSON.parse(localStorage.getItem("gameHistoryMensagens")) || [];

            mensagensSalvas.push(novaMensagem);

            localStorage.setItem("gameHistoryMensagens", JSON.stringify(mensagensSalvas));

            if (formFeedback) {
                formFeedback.className = "form-feedback success";
                formFeedback.textContent = "Mensagem enviada com sucesso! Agradecemos o feedback.";
            }

            alert("Mensagem enviada com sucesso! Agradecemos o feedback.");
        
            contactForm.reset();
            
            setTimeout(() => {
                if (formFeedback) {
                    formFeedback.textContent = "";
                }
            }, 5000);
        });
    }
});