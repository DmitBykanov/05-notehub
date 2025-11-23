import axios from "axios";
import type { Note, NewNote } from "../types/note";

const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const notesInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    "Content-Type": "application/json",
  },
});

const noteService = {
  fetchNotes: async (
    params: FetchNotesParams = {}
  ): Promise<FetchNotesResponse> => {
    const { page = 1, perPage = 10, search } = params;

    const response = await notesInstance.get<FetchNotesResponse>("/notes", {
      params: {
        page,
        perPage,
        ...(search ? { search } : {}),
      },
    });

    return response.data;
  },

  createNote: async (newNote: NewNote): Promise<Note> => {
    const response = await notesInstance.post<Note>("/notes", newNote);
    return response.data;
  },

  deleteNote: async (id: string): Promise<Note> => {
    const response = await notesInstance.delete<Note>(`/notes/${id}`);
    return response.data;
  },
};

export default noteService;
