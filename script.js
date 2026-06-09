document.addEventListener('DOMContentLoaded', () => {
   
    const tabs = Array.from(document.querySelectorAll('.intercalaire'));
    const panels = document.querySelectorAll('.fiche-dossier');
    const tabList = document.querySelector('.barre-intercalaires');

    // 1. GESTION DU CLIC
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const targetTabName = tab.getAttribute('data-tab');
            switchTab(tab, targetTabName);
        });
    });

    // Bascule des onglets et des fiches
    function switchTab(activeTab, targetName) {
        // Désactiver les onglets et masquer les fiches
        tabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
            t.setAttribute('tabindex', '-1');
        });

        panels.forEach(p => {
            p.classList.remove('active');
            p.setAttribute('hidden', 'true');
        });

        // Activer l'onglet au clavier
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

    // 2. ACCESSIBILITÉ : 
    tabList.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault(); 

      
            let currentFocus = tabs.indexOf(document.activeElement);

            if (e.key === 'ArrowRight') {
                currentFocus++;
             
                if (currentFocus >= tabs.length) currentFocus = 0;
            } else if (e.key === 'ArrowLeft') {
                currentFocus--;
              
                if (currentFocus < 0) currentFocus = tabs.length - 1;
            }

            const targetTabName = tabs[currentFocus].getAttribute('data-tab');
            switchTab(tabs[currentFocus], targetTabName);
        }
    });
});