export type Recording = {
  name: string
  content: string
}

export type AxiosCallback = (message: string) => Promise<{data : {message : string, prediction : string}}>
export type ConsoleCallback = (message: string) => Promise<void>
