(function() {
  const scriptTag = document.currentScript;
  const siteKey = scriptTag.getAttribute('data-site-key');
  
  if (!siteKey) {
    console.warn('[Lueur Analytique] data-site-key manquant sur le script de tracking.');
    return;
  }

  // Déterminer l'URL de l'API à partir de la source du script
  const scriptUrl = new URL(scriptTag.src);
  const API_BASE = scriptUrl.origin;

  function sendEvent(type) {
    const data = {
      site_key: siteKey,
      url: window.location.href,
      event_type: type
    };

    // Utiliser sendBeacon si disponible pour plus de fiabilité lors de la fermeture de page
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      navigator.sendBeacon(`${API_BASE}/api/event`, blob);
    } else {
      fetch(`${API_BASE}/api/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        keepalive: true
      }).catch(() => {});
    }
  }

  // Enregistrer la vue immédiatement
  sendEvent('view');

  // Suivi des clics
  document.addEventListener('click', function(e) {
    // On ne suit que les clics significatifs (liens, boutons, ou éléments avec classe 'track-click')
    const target = e.target.closest('a, button, .track-click');
    if (target) {
      sendEvent('click');
    }
  }, true);

  console.log('[Lueur Analytique] Tracker activé pour la clé:', siteKey);
})();
