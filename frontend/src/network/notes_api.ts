import {Note} from "../models/note";

const fetchData = async (input: RequestInfo, init?: RequestInit)=>{
    const response =  await fetch(input, init);
    if(response.ok) return response;

    const errorBody = await response.json();
    const errorMessage =  errorBody.error;
    throw Error(errorMessage);
}

export const fetchNotes = async ():Promise<Note[]> => {
    const response = await fetchData("/api/notes", {method: "GET"});
   return response.json()
}

export interface NoteInput {
    title: string,
    text?: string,
}

export const createNote = async (note: NoteInput):Promise<Note> => {
    const response = await fetchData("/api/notes", {method: "POST", headers: {
        "Content-type": "application/json"
        }, body: JSON.stringify(note)});

    return response.json();
}