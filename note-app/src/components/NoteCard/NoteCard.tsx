import { NotesIconBox } from "../../styles/styles";
import {
  Card,
  ContentBox,
  FooterBox,
  TagsBox,
  TopBox,
} from "./NoteCard.styles";
import { Note } from "../../types/note";
import { BsPin } from "react-icons/bs";

interface NoteCardProps {
  note: Note;
  type: string;
}

const NoteCard = ({ note, type }: NoteCardProps) => {
  const { title, content, tags, color, priority, date, isPinned, isRead, id } =
    note;

  return (
    <>
      <Card style={{ backgroundColor: color }}>
        <TopBox>
          <div className="noteoCard__title">
            {title.length > 10 ? title.slice(0, 10) + "..." : title}
          </div>
          <div className="noteCard__top-options">
            <span className="noteCard__priority">{priority}</span>
          </div>
          {type !== "archive" && type !== "trash" && (
            <NotesIconBox className="noteCard__pin">
              <BsPin style={{ color: isPinned ? "red" : "" }} />
            </NotesIconBox>
          )}
        </TopBox>
        <ContentBox>{content}</ContentBox>
        <TagsBox>
          {tags?.map(({ tag, id }) => (
            <span key={id}>{tag}</span>
          ))}
        </TagsBox>
        <FooterBox>
          <div className="noteCard__date">{date}</div>
        </FooterBox>
      </Card>
    </>
  );
};

export default NoteCard;
