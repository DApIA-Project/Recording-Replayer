export type Recording = {
  name: string
  content: string
}

export type MessageCallback = (message: string) => Promise<any>
