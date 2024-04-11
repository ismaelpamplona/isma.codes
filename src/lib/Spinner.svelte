<div class="container">
  <div class="typing-animation">loading...</div>
</div>

<style lang="scss">
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    @keyframes typing {
      from {
        width: 0;
      }
      to {
        width: 7.2em;
      }
    }

    @keyframes blink-cursor {
      from,
      to {
        border-color: transparent;
      }
      50% {
        border-color: inherit;
      }
    }

    .typing-animation {
      font-size: 20px;
      white-space: nowrap;
      overflow: hidden;
      border-right: 0.15em solid black; /* Cursor */
      animation:
        typing 4s steps(10, end) 0.6s forwards,
        blink-cursor 500ms steps(12, end) infinite;
    }
  }
</style>
