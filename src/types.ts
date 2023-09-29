import { JsonMessage } from '@dapia-project/data-converter'

export type Recording = {
  name: string
  messages: JsonMessage[]
}

export type ApiResponse = {
  data: { message: JsonMessage; prediction?: string; error?: string }
}

export type AxiosCallback = (message: JsonMessage) => Promise<ApiResponse>

export type ConsoleCallback = (message: JsonMessage) => Promise<void>

export type StreamCallback = AxiosCallback | ConsoleCallback
