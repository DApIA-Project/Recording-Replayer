import { Recording } from "../types";
import { JsonMessage } from "@dapia-project/data-converter";

export function groupMessagesByIcaoAndTimestamp(messages: JsonMessage[]): JsonMessage[][] {
  const messagesGrouped: Map<number, Map<string, JsonMessage[]>> = new Map<number, Map<string, JsonMessage[]>>();

  // Parcours chaque message
  messages.forEach((message) => {
    if(message["icao24"] != undefined && message["timestamp"] != undefined){


    const icao = message["icao24"] as string;
    const timestamp = message["timestamp"] as number;

    // Vérifie si le Timestamp est déjà dans la carte
    if (messagesGrouped.has(timestamp)) {
      const icaoMap = messagesGrouped.get(timestamp) as Map<string, JsonMessage[]>;

      // Vérifie si l'ICAO est déjà dans la carte interne
      if (icaoMap.has(icao)) {
        const icaoGroup = icaoMap.get(icao) as JsonMessage[];
        icaoGroup.push(message);
      } else {
        // Si l'ICAO n'existe pas encore, crée une nouvelle entrée
        icaoMap.set(icao, [message]);
      }
    } else {
      // Si le Timestamp n'existe pas encore, crée une nouvelle entrée avec l'ICAO et le message
      const icaoMap = new Map<string, JsonMessage[]>();
      icaoMap.set(icao, [message]);
      messagesGrouped.set(timestamp, icaoMap);
    }
    }
  });

  // Convertit la carte en un tableau ordonné avec la structure demandée
  const result: JsonMessage[][] = [];

  // Trie les timestamps
  const sortedTimestamps = Array.from(messagesGrouped.keys()).sort();
  sortedTimestamps.forEach((timestamp) => {
    const icaoMap = messagesGrouped.get(timestamp) as Map<string, JsonMessage[]>;

    // Trie les messages à l'intérieur de chaque timestamp par ICAO
    const icaoGroups: JsonMessage[][] = [];
    const sortedIcaos = Array.from(icaoMap.keys()).sort().reverse();
    sortedIcaos.forEach((icao) => {
      icaoGroups.push(icaoMap.get(icao) as JsonMessage[]);
    });

    result.push(...icaoGroups);  // Utilisation de l'opérateur de spread (...) pour aplatir les tableaux
  });

  return result;
}