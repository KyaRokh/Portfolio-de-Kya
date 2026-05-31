document.addEventListener('DOMContentLoaded', function() {
    const onglets = document.querySelectorAll(".intercalaire");
    const fiches = document.querySelectorAll(".fiche-dossier");

    onglets.forEach(onglet => {
        onglet.addEventListener("click", function() {
            onglets.forEach(o => o.classList.remove("active"));
            fiches.forEach(f => f.classList.remove("active"));
            onglet.classList.add("active");
            const cible = onglet.getAttribute("data-tab");
            const ficheCible = document.getElementById(cible);
            if (ficheCible) {
                ficheCible.classList.add("active");
            }
        });
    });
});