(() => {
  'use strict';

  const counterId = 114206470;
  const languagesByPath = { '/': 'ru', '/uz/': 'uz', '/tg/': 'tg' };
  const language = languagesByPath[location.pathname];
  if (location.origin !== 'https://www.vectorecovery.uz' || !language) return;

  const campaignFields = {
    utm_source: /^(?:instagram|facebook|meta|telegram|youtube|vk|yandex|google)$/,
    utm_medium: /^(?:social|paid_social|organic_social|video|referral|cpc|cpm)$/,
    utm_campaign: /^(?:first_contact|family_help|(?:vid|campaign)[_-]\d{1,6}(?:[_-](?:ru|uz|tg))?(?:[_-]v\d{1,2})?)$/,
    utm_content: /^(?:(?:ad|creative|variant)[_-]\d{1,6}|(?:ru|uz|tg)[_-]v\d{1,2})$/
  };
  const incoming = new URLSearchParams(location.search);
  const page = new URL(location.pathname, location.origin);
  for (const [key, allowed] of Object.entries(campaignFields)) {
    const values = incoming.getAll(key);
    if (values.length === 1 && allowed.test(values[0])) page.searchParams.set(key, values[0]);
  }

  // The provider also reads the current URL when recording goals.
  const browserUrl = new URL(page);
  if (incoming.getAll('_ym_debug').join(',') === '2') browserUrl.searchParams.set('_ym_debug', '2');
  if (/^#[a-zA-Z][a-zA-Z0-9_-]*$/.test(location.hash) &&
      document.getElementById(location.hash.slice(1))) browserUrl.hash = location.hash;
  if (browserUrl.search !== location.search || browserUrl.hash !== location.hash) {
    try {
      history.replaceState(history.state, '', browserUrl);
    } catch {
      return;
    }
  }

  // Preserve the provider's queue until its async script has loaded.
  window.ym = window.ym || function () {
    (window.ym.a ||= []).push(arguments);
  };
  window.ym.l = Date.now();

  window.ym(counterId, 'init', {
    defer: true,
    webvisor: false,
    clickmap: false,
    trackLinks: false,
    accurateTrackBounce: false,
    ecommerce: false,
    disableYtm: true,
    sendTitle: false
  });
  const referrerOrigin = document.referrer ? new URL(document.referrer).origin : '';
  window.ym(counterId, 'hit', page.href, {
    title: 'Vector Recovery',
    referer: referrerOrigin
  });

  const goals = new Set(['click_phone', 'click_telegram']);
  window.vectorMetrikaGoal = (name) => {
    if (goals.has(name)) window.ym(counterId, 'reachGoal', name, { site_language: language });
  };

  const tag = document.createElement('script');
  tag.src = `https://mc.yandex.ru/metrika/tag.js?id=${counterId}`;
  tag.async = true;
  tag.referrerPolicy = 'no-referrer';
  document.head.append(tag);
})();
