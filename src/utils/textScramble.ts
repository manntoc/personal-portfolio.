// src/utils/textScramble.ts
// Text scramble / glitch effect utility
const CHARS = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export class TextScramble {
  el: HTMLElement
  chars: string
  private queue: { from: string; to: string; start: number; end: number; char?: string }[]
  private frame: number
  private frameRequest: number
  private resolve!: () => void

  constructor(el: HTMLElement) {
    this.el = el
    this.chars = CHARS
    this.queue = []
    this.frame = 0
    this.frameRequest = 0
    this.update = this.update.bind(this)
  }

  setText(newText: string): Promise<void> {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise<void>((resolve) => { this.resolve = resolve })
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 24)
      const end = start + Math.floor(Math.random() * 24)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }

  private update() {
    let output = ''
    let complete = 0
    for (let i = 0; i < this.queue.length; i++) {
      const { from, to, start, end } = this.queue[i]
      let { char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)]
          this.queue[i].char = char
        }
        output += `<span class="scramble-char" aria-hidden="true">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
}
