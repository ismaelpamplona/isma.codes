<div class="logo-container">
  <div class="line left-line"></div>
  <svg class="terminal-symbol" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="20"
      width="70"
      height="60"
      rx="8"
      ry="8"
      fill="none"
      stroke="#adff2f"
      stroke-width="6"
    />
    <rect x="20" y="40" width="20" height="4" fill="#adff2f" stroke-width="2" />
    <line x1="20" y1="70" x2="70" y2="70" stroke="#adff2f" stroke-width="4" />
  </svg>
  <span class="terminal-prompt">isma.codes</span>
</div>

<style lang="scss">
  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: 100;

    .line {
      position: absolute;
      height: 80%;
      width: 7px;
    }

    .left-line {
      left: 0;
      border-radius: 0 5px 5px 0;
    }

    .terminal-symbol {
      width: 40px;
      height: 100%;
      margin-left: 20px;
    }

    .terminal-prompt {
      display: flex;
      align-items: center;
      font-weight: 400;
      &::after {
        content: '_';
        font-weight: 400;
        animation: blink 1s step-start 0s infinite;
      }
    }
  }
</style>
