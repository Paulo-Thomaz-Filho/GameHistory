document.addEventListener("DOMContentLoaded", () => {
    const bgAudio = document.getElementById("bg-audio");
    const musicToggleBtn = document.getElementById("music-toggle");

    if (bgAudio && musicToggleBtn) {
        const musicIcon = musicToggleBtn.querySelector("i");
        bgAudio.volume = 0.1;

        musicToggleBtn.addEventListener("click", () => {
            if (bgAudio.paused) {
                bgAudio.play().then(() => {
                    musicToggleBtn.classList.add("playing");
                    musicIcon.className = "fa-solid fa-volume-high";
                }).catch(error => {
                    console.error("Erro ao reproduzir o áudio:", error);
                });
            } else {
                bgAudio.pause();
                musicToggleBtn.classList.remove("playing");
                musicIcon.className = "fa-solid fa-volume-xmark";
            }
        });
    }
});