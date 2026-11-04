/* Browser-only event bridge: same origin and browser profile, no TikTok connection. */
(() => {
  const channel = 'studiolive-web-v1';
  const listeners = new Map();
  const bus = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel(channel) : null;
  function dispatch(type, data) {
    (listeners.get(type) || []).forEach(fn => { try { fn(data); } catch(e) { console.error(e); } });
  }
  if (bus) bus.onmessage = e => { if(e.data && e.data.type) dispatch(e.data.type,e.data.data); };
  window.io = () => ({
    on(type,fn) {
      if (!listeners.has(type)) listeners.set(type,[]);
      listeners.get(type).push(fn);
      if(type === 'connect') queueMicrotask(fn);
      if(type === 'config') queueMicrotask(() => fn(JSON.parse(localStorage.getItem('studiolive-config') || '{"mode":"chua"}')));
      if(type === 'stats') queueMicrotask(() => fn({viewers:0,likes:0,comments:0,gifts:0,diamonds:0}));
      return this;
    }
  });
})();