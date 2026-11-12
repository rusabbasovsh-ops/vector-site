(() => {
  'use strict';

  const counterId = 114206470;
  const languagesByPath = { '/': 'ru', '/uz/': 'uz', '/tg/': 'tg' };
  const language = languagesByPath[location.pathname];
  const hasUnreviewedQuery = location.search && location.search !== '?_ym_debug=2';
  if (location.origin !== 'https://www.vectorecovery.uz' || !language || hasUnreviewedQuery) return;

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
  window.ym(counterId, 'hit', location.origin + location.pathname, {
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
