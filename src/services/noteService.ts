import axios from "axios";
import type { Note, NewNote } from "../types/note";

const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

export interface FetchNotesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const notesInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

const noteService = {
  fetchNotes: async (
    params: FetchNotesParams = {}
  ): Promise<FetchNotesResponse> => {
    const response = await notesInstance.get<FetchNotesResponse>("/notes", {
      params: {
        page: params.page ?? 1,
        perPage: params.limit ?? 10,
        ...(params.search ? { search: params.search } : {}),
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
