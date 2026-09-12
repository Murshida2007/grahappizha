// playful "counter" that ticks up like a doom-clicker
const el = document.getElementById('liveCount');
let count = 42910;
setInterval(() => {
  count += Math.floor(Math.random() * 3);
  el.innerHTML = count.toLocaleString('en-IN') + ' <span>പേർ</span>';
}, 2500);

const messages = [
  "🔱 കവടി വീണു... ശനി ദോഷം കണ്ടെത്തി!",
  "🔱 രാഹു കാലം തുടങ്ങി, ജാഗ്രത!",
  "🔱 നിങ്ങളുടെ ഭാഗ്യസംഖ്യ: 7 (അല്ലെങ്കിൽ 9)",
  "🔱 സ്വാമി പുഞ്ചിരിക്കുന്നു... അപകടം!",
  "🔱 ജ്യോതിഷം പറയുന്നു: നാളെ ചായ കുടിക്കും."
];
document.getElementById('ctaBtn').addEventListener('click', () => {
  alert(messages[Math.floor(Math.random() * messages.length)]);
  count += Math.floor(Math.random() * 40) + 5;
  el.innerHTML = count.toLocaleString('en-IN') + ' <span>പേർ</span>';
});