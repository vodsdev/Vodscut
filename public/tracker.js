/**
 * Lueur Analytique - Script de Tracking
 * Légèreté et performance pour vos statistiques web.
 */
(function() {
  const scriptTag = document.currentScript;
  const siteKey = scriptTag.getAttribute('data-site-key');
  
  if (!siteKey) {
    console.warn('[Vodscut] data-site-key manquant. Le tracking est désactivé.');
    return;
  }

  // Détermination automatique de l'URL de l'API
  const scriptUrl = new URL(scriptTag.src);
  const API_BASE = scriptUrl.origin;

  /**
   * Envoie un événement à l'API
   * @param {string} type - 'view' ou 'click'
   */
  function sendEvent(type) {
    const payload = {
      site_key: siteKey,
      url: window.location.href,
      event_type: type
    };

    // Utilisation prioritaire de sendBeacon pour garantir l'envoi lors de la fermeture de page
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      navigator.sendBeacon(`${API_BASE}/api/event`, blob);
    } else {
      // Fallback pour les navigateurs anciens
      fetch(`${API_BASE}/api/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true // Permet de continuer la requête même si la page est fermée
      }).catch(() => {});
    }
  }

  // Enregistrement de la vue de page au chargement
  if (document.readyState === 'complete') {
    sendEvent('view');
  } else {
    window.addEventListener('load', () => sendEvent('view'));
  }

  // Suivi intelligent des clics
  document.addEventListener('click', function(e) {
    // On capture les clics sur les liens, boutons ou éléments avec la classe 'track-me'
    const target = e.target.closest('a, button, .track-me, input[type="submit"]');
    if (target) {
      sendEvent('click');
    }
  }, true);

  console.log('[Vodscut] Tracking activé pour:', siteKey);
})();
