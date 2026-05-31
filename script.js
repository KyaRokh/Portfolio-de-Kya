document.addEventListener('DOMContentLoaded', function() {
    const fiches = document.querySelectorAll(".fiche-dossier");
    const onglets = document.querySelectorAll(".intercalaire");

    onglets.forEach(onglet => {
        onglet.addEventListener("click", function() {
     
            fiches.forEach(f => f.classList.remove("active"));
            
            const ficheParente = onglet.parentElement;
            if (ficheParente) {
                ficheParente.classList.add("active");
            }
        });
    });
});