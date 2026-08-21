/**
 * Web Vitals reporting (valid metrics only, one payload per metric,
 * consent-aware). LCP final candidate, CLS flushed on page hide, and an
 * INP proxy from first-input processing delay.
 */
(function () {
  'use strict';

  if (window.getConsent() !== 'true' || !('PerformanceObserver' in window)) return;

  var sent = {};
  function send(metric, value, rating) {
    if (sent[metric]) return;
    sent[metric] = true;
    if (typeof window.plausible === 'function') {
      window.plausible('web_vital', {
        props: { metric: metric, value: Math.round(value * 100) / 100, rating: rating },
      });
    }
  }

  var clsTotal = 0;
  try {
    // LCP: report the final candidate once
    new PerformanceObserver(function (list) {
      var entries = list.getEntries();
      var last = entries[entries.length - 1];
      if (last) {
        var t = last.startTime;
        send('LCP', t, t <= 2500 ? 'good' : t <= 4000 ? 'needs-improvement' : 'poor');
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });

    // CLS: sum layout shifts not caused by recent input; flush once on page hide
    new PerformanceObserver(function (list) {
      list.getEntries().forEach(function (entry) {
        if (!entry.hadRecentInput) clsTotal += entry.value;
      });
    }).observe({ type: 'layout-shift', buffered: true });

    // Input latency from the first discrete interaction (processing delay)
    new PerformanceObserver(function (list) {
      var entry = list.getEntries()[0];
      if (entry && typeof entry.processingStart === 'number') {
        var d = entry.processingStart - entry.startTime;
        send('INP-proxy', d, d <= 100 ? 'good' : d <= 300 ? 'needs-improvement' : 'poor');
      }
    }).observe({ type: 'first-input', buffered: true });

    function flushCls() {
      send(
        'CLS',
        clsTotal,
        clsTotal <= 0.1 ? 'good' : clsTotal <= 0.25 ? 'needs-improvement' : 'poor'
      );
    }
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') flushCls();
    });
    window.addEventListener('pagehide', flushCls);
  } catch (e) {
    console.warn('Web Vitals observation failed:', e);
  }
})();
