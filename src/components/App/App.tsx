import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { FetchNotesResponse } from "../../services/noteService";
import noteService from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import useDebounce from "../../hooks/useDebounce";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import css from "./App.module.css";

function App() {
  const perPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", currentPage, debouncedSearch],
    queryFn: () =>
      noteService.fetchNotes({
        page: currentPage,
        limit: perPage,
        search: debouncedSearch,
      }),
    placeholderData: { notes: [], totalPages: 0 },
    staleTime: 5000,
  });

  const deleteMutation = useMutation({
    mutationFn: noteService.deleteNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
        {totalPages > 1 && (
          <Pagination pageCount={totalPages} onPageChange={setCurrentPage} />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading ? (
        <p>Loading notes...</p>
      ) : (
        <NoteList notes={notes} onDelete={(id) => deleteMutation.mutate(id)} />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSuccess={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
export default App;
