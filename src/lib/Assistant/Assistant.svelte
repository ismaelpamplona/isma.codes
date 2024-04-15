<script lang="ts">
  import { beforeUpdate, afterUpdate, onMount } from 'svelte'
  import type { ChatCompletion, Message } from '$lib/openai/types'
  import { marked } from 'marked'

  export let data: ChatCompletion

  let chat: Message[] = []
  let userInput = ''
  let autoscroll = false
  let div: HTMLElement
  let loaddingMsg = false
  let show = false
  let lastCount = 0
  let newsCount = 0
  let outOfService = false
  let lastMessageTime = 0
  const MESSAGE_INTERVAL = 3000

  function canSendMessage() {
    const now = Date.now()
    if (now - lastMessageTime > MESSAGE_INTERVAL) {
      lastMessageTime = now
      return true
    }
    return false
  }

  function minimizeMaximize() {
    show = !show
    if (show) {
      lastCount = chat.length
      newsCount = 0
    } else if (lastCount < chat.length) {
      newsCount = chat.length - lastCount
    } else {
      newsCount = 0
    }
  }

  async function updateChat() {
    try {
      const greetingData: Message = await data.choices[0].message
      chat.push(greetingData)
      lastCount = chat.length
      newsCount = chat.length
      // localStorage.setItem('chatData', JSON.stringify(chat))
      outOfService = false
    } catch (error) {
      console.error('Error updating chat:', error)
      outOfService = true
    }
  }

  async function sendMessage(e: KeyboardEvent) {
    if (e.key !== 'Enter' || e.shiftKey || userInput.trim() === '') return

    setTimeout(() => {
      loaddingMsg = true
    }, 500)

    try {
      chat = [
        ...chat,
        {
          role: 'user',
          content: userInput
        }
      ]

      const messagesForApi = chat.map((msg) => ({
        role: msg.role.toLowerCase(),
        content: msg.content
      }))

      userInput = ''
      const response = await fetch('/api/openai', {
        method: 'POST',
        body: JSON.stringify(chat),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let completion: ChatCompletion = await response.json()
      const messageData: Message = await completion.choices[0].message
      setTimeout(() => {
        chat = [...chat, messageData]
        localStorage.setItem('chatData', JSON.stringify(chat))
        loaddingMsg = false
      }, 1000)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  beforeUpdate(() => {
    if (div) {
      const scrollableDistance = div.scrollHeight - div.offsetHeight
      autoscroll = div.scrollTop > scrollableDistance - 20
    }
  })

  afterUpdate(() => autoscroll && div.scrollTo(0, div.scrollHeight))

  // onMount(() => {
  //     const storedChat = localStorage.getItem('chatData')

  //     if (storedChat) {
  //         try {
  //             chat = JSON.parse(storedChat)
  //         } catch (e) {
  //             console.error('Error parsing chat data from local storage:', e)
  //         }
  //     }
  // })
</script>

{#if !outOfService}
  <div class="container assistant-container {show ? 'show-chat' : 'hide-chat'}">
    <div class="header">
      {#if newsCount > 0 && !show}
        <span class="news-count">{newsCount}</span>
      {/if}
      <button on:click={minimizeMaximize}>
        <iconify-icon icon={show ? 'solar:minimize-square-broken' : 'bi:chat'} />
      </button>
    </div>
    <div class="content" bind:this={div}>
      {#await updateChat() then}
        {#each chat as msg}
          <div class="message-container">
            <div class="message {msg.role === 'assistant' ? 'assistant-msg' : 'user-msg'}">
              <span>{@html marked(msg.content)}</span>
            </div>
          </div>
        {/each}
      {/await}
      {#if loaddingMsg}
        <span class="loading-msg">Ismael is typing...</span>
      {/if}
    </div>
    <textarea on:keydown={sendMessage} bind:value={userInput} id="userInput"></textarea>
  </div>
{/if}

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    right: 10px;
    bottom: 10px;
    max-height: 100%;
    border-radius: 10px;
    gap: 5px;
    padding: 10px;
    opacity: 0.98;

    .header {
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: flex-end;
      align-items: flex-end;
      font-size: 25px;

      button {
        padding: 0 5px;
      }

      .news-count {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        background: green;
        color: white;
        padding: 3px 5px;
        border-radius: 10px;
        font-size: 10px;
        font-weight: bold;
        z-index: 2;
        width: fit-content;
        top: 3px;
        right: 3px;
      }

      &:hover {
        opacity: 0.8;
        cursor: pointer;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 0 7px;
      border-radius: 10px;
      gap: 10px;
      overflow-y: auto;

      .loading-msg {
        width: 100%;
        font-style: italic;
      }

      .message-container {
        display: flex;
        flex-direction: column;
        width: 100%;

        .message {
          padding: 15px;
          width: fit-content;
          max-width: 90%;
          border-radius: 25px;
          font-size: 12px;
        }

        .assistant-msg {
          align-self: flex-start;
          border-top-left-radius: 0;
        }

        .user-msg {
          align-self: flex-end;
          border-top-right-radius: 0;
        }
      }
    }

    textarea {
      height: 80px;
      width: calc(100% - 3px);
      padding: 10px 20px;
      border-radius: 25px;
      outline: none;
    }
  }

  .show-chat,
  .hide-chat {
    max-width: 95vw;
  }
  .show-chat {
    .content {
      height: 500px;
      width: 500px;
      max-width: 100%;
    }
  }
  .hide-chat {
    .content {
      display: none;
    }

    textarea {
      display: none;
    }
  }
</style>
