import { useMemo } from "react";

import { Note as NoteModel } from "../models/note";

import { Card } from "react-bootstrap";
import styles from "../styles/note.module.scss";

import { formatDate } from "../utils/formateDate";

interface NoteProps {
  note: NoteModel;
  className?: string;
}

const Note = ({ note, className }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  const createUpdatedText = useMemo(() => {
    console.log("useMemo");
    return updatedAt > createdAt
      ? `Updated: ${formatDate(updatedAt)}`
      : `Created: ${formatDate(createdAt)}`;
  }, [updatedAt, createdAt]);

  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{createUpdatedText}</Card.Footer>
    </Card>
  );
};

export default Note;
