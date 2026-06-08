document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.intercalaire');
    const panels = document.querySelectorAll('.fiche-dossier');
    const tabList = document.querySelector('.barre-intercalaires');

    let tabFocus = 0;

    // 1. GESTION DU CLIC
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            const targetTabName = tab.getAttribute('data-tab');
            tabFocus = index; 
            switchTab(tab, targetTabName);
        });
    });

    // LA FONCTION COEUR : Basculer les onglets et les fiches
    function switchTab(activeTab, targetName) {
        // Désactiver tous les onglets et masquer toutes les fiches
        tabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
            t.setAttribute('tabindex', '-1');
        });

        panels.forEach(p => {
            p.classList.remove('active');
            p.setAttribute('hidden', 'true');
        });

        // Activer l'onglet cliqué ou ciblé au clavier
        activeTab.classList.add('active');
        activeTab.setAttribute('aria-selected', 'true');
        activeTab.setAttribute('tabindex', '0');
        activeTab.focus(); 

        // Afficher la fiche correspondante
        const targetPanel = document.getElementById(targetName);
        if (targetPanel) {
            targetPanel.classList.add('active');
            targetPanel.removeAttribute('hidden');
        }
    }

    // 2. ACCESSIBILITÉ : navigation au clavier
    tabList.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault(); 

            if (e.key === 'ArrowRight') {
                tabFocus++;
                if (tabFocus >= tabs.length) tabFocus = 0;
            } else if (e.key === 'ArrowLeft') {
                tabFocus--;
                if (tabFocus < 0) tabFocus = tabs.length - 1;
            }

            // Déclenche automatiquement le changement d'onglet au clavier
            const targetTabName = tabs[tabFocus].getAttribute('data-tab');
            switchTab(tabs[tabFocus], targetTabName);
        }
    });
});