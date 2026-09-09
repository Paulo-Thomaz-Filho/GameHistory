// Validação do Formulário de Contato
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
    const formFeedback = document.getElementById("form-feedback");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Exibe mensagem de sucesso
            formFeedback.className = "form-feedback success";

            // Exibe a alerta de sucesso
            alert("Mensagem enviada com sucesso! Agradecemos o feedback.");
            
            // Limpa os campos
            contactForm.reset();
            
            // Limpa a mensagem após 5 segundos
            setTimeout(() => {
                formFeedback.textContent = "";
            }, 5000);
        });
    }
});