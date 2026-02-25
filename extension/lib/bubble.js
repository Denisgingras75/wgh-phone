/**
 * Notification bubble + mini chat window UI.
 * Renders the spending vibe check bubble and expandable chat.
 */
const BubbleUI = (() => {
  const VIBE_CONFIG = {
    green: {
      icon: '\u{1F436}',
      message: "You're chillin, go for it.",
      className: 'vibe-green',
    },
    yellow: {
      icon: '\u{1F436}',
      message: 'Ehhh you got bills coming up tho.',
      className: 'vibe-yellow',
    },
    red: {
      icon: '\u{1F6D1}',
      message: "Dog. Don't do it.",
      className: 'vibe-red',
    },
  };

  const QUICK_ACTIONS = [
    'Can I afford this?',
    'What did I spend this week?',
    'What bills are coming up?',
  ];

  let container = null;
  let chatOpen = false;
  let currentVibe = 'green';

  function create(vibeLevel) {
    if (container) remove();
    currentVibe = vibeLevel || 'green';
    const vibe = VIBE_CONFIG[currentVibe];

    container = document.createElement('div');
    container.id = 'dddi-bubble-container';
    container.innerHTML = buildBubbleHTML(vibe) + buildChatHTML(vibe);
    document.body.appendChild(container);

    bindEvents();
  }

  function buildBubbleHTML(vibe) {
    return `
      <div id="dddi-bubble" class="${vibe.className}">
        <span id="dddi-bubble-icon">${vibe.icon}</span>
        <span id="dddi-bubble-text">${vibe.message}</span>
        <button id="dddi-bubble-close" title="Dismiss">&times;</button>
      </div>
    `;
  }

  function buildChatHTML(vibe) {
    const chipsHTML = QUICK_ACTIONS.map(
      (q) => `<button class="dddi-quick-chip">${q}</button>`
    ).join('');

    return `
      <div id="dddi-chat">
        <div id="dddi-chat-header" class="${vibe.className}">
          <span id="dddi-chat-header-title">
            <span>\u{1F436}</span>
            <span>Dog Don't Do It</span>
          </span>
          <button id="dddi-chat-close">&times;</button>
        </div>
        <div id="dddi-chat-messages">
          <div class="dddi-msg bot">${vibe.message} Click here or type a question to ask about your spending.</div>
        </div>
        <div id="dddi-chat-quick-actions">${chipsHTML}</div>
        <div id="dddi-chat-input-area">
          <input id="dddi-chat-input" type="text" placeholder="Ask about your spending..." />
          <button id="dddi-chat-send">\u2191</button>
        </div>
      </div>
    `;
  }

  function bindEvents() {
    // Bubble click → open chat
    const bubble = document.getElementById('dddi-bubble');
    bubble.addEventListener('click', (e) => {
      if (e.target.id === 'dddi-bubble-close') return;
      openChat();
    });

    // Close bubble
    document.getElementById('dddi-bubble-close').addEventListener('click', (e) => {
      e.stopPropagation();
      remove();
    });

    // Close chat
    document.getElementById('dddi-chat-close').addEventListener('click', () => {
      closeChat();
    });

    // Send message
    document.getElementById('dddi-chat-send').addEventListener('click', () => {
      sendMessage();
    });

    // Enter key
    document.getElementById('dddi-chat-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendMessage();
    });

    // Quick action chips
    document.querySelectorAll('.dddi-quick-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const text = chip.textContent;
        appendMessage(text, 'user');
        handleUserMessage(text);
      });
    });
  }

  function openChat() {
    const bubble = document.getElementById('dddi-bubble');
    const chat = document.getElementById('dddi-chat');
    bubble.style.display = 'none';
    chat.classList.add('open');
    chatOpen = true;
    document.getElementById('dddi-chat-input').focus();
  }

  function closeChat() {
    const bubble = document.getElementById('dddi-bubble');
    const chat = document.getElementById('dddi-chat');
    chat.classList.remove('open');
    bubble.style.display = 'flex';
    chatOpen = false;
  }

  function sendMessage() {
    const input = document.getElementById('dddi-chat-input');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    appendMessage(text, 'user');
    handleUserMessage(text);
  }

  function appendMessage(text, sender) {
    const messages = document.getElementById('dddi-chat-messages');
    const msg = document.createElement('div');
    msg.className = `dddi-msg ${sender}`;
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  /**
   * Placeholder handler — returns canned responses.
   * Will be replaced with Claude API calls via the backend.
   */
  function handleUserMessage(text) {
    const lower = text.toLowerCase();
    let reply;

    if (lower.includes('afford')) {
      reply =
        "Hmm, based on your balance you're looking okay — but you've been spending a lot this week. Maybe sleep on it? \u{1F634}";
    } else if (lower.includes('spend') || lower.includes('spent')) {
      reply =
        "You've dropped about $247 this week so far — mostly food and subscriptions. Not wild, but it adds up. \u{1F4B8}";
    } else if (lower.includes('bill') || lower.includes('recurring')) {
      reply =
        "You've got rent ($1,200) hitting on the 1st and Netflix ($15.99) on the 3rd. Keep that in mind! \u{1F4C5}";
    } else {
      reply =
        "I hear you! Once Plaid is connected I'll be able to give you real numbers. For now, just vibes. \u{1F436}";
    }

    setTimeout(() => appendMessage(reply, 'bot'), 600);
  }

  function remove() {
    if (container) {
      container.remove();
      container = null;
      chatOpen = false;
    }
  }

  function updateVibe(vibeLevel) {
    if (!container) return;
    remove();
    create(vibeLevel);
  }

  return { create, remove, updateVibe, openChat, closeChat };
})();
