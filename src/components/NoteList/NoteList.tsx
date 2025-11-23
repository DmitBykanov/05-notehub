import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  onDelete?: (id: string) => void;
  deletingIds?: string[];
}

function NoteList({ notes, onDelete, deletingIds = [] }: NoteListProps) {
  if (!notes.length) return <p>No notes found.</p>;

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            {onDelete && (
              <button
                className={css.button}
                onClick={() => onDelete(note.id)}
                disabled={deletingIds.includes(note.id)}
              >
                Delete
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
