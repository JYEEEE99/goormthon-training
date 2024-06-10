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
import getRelevantBtns from "../../utils/getRelevantBtns";
import { readNote, setPinnedNotes } from "../../store/notesList/notesListSlice";
import parse from "html-react-parser";
import ReadNoteModal from "../Modal/ReadNoteModal/ReadNoteModal";
import { useAppDispatch } from "../../hooks/redux";

interface NoteCardProps {
  note: Note;
  type: string;
}

const NoteCard = ({ note, type }: NoteCardProps) => {
  const { title, content, tags, color, priority, date, isPinned, isRead, id } =
    note;
  const func = () => {
    const imgContent = content.includes("img");
    if (imgContent) {
      return content;
    } else {
      return content.length > 75 ? content.slice(0, 75) + "..." : content;
    }
  };

  const dispatch = useAppDispatch();
  return (
    <>
      <Card style={{ backgroundColor: color }}>
        {isRead && <ReadNoteModal note={note} type={type} />}
        <TopBox>
          <div className="noteoCard__title">
            {title.length > 10 ? title.slice(0, 10) + "..." : title}
          </div>
          <div className="noteCard__top-options">
            <span className="noteCard__priority">{priority}</span>
          </div>
          {type !== "archive" && type !== "trash" && (
            <NotesIconBox
              className="noteCard__pin"
              // onClick={() => dispatch(setPinnedNotes({ id }))}
            >
              <BsPin style={{ color: isPinned ? "red" : "" }} />
            </NotesIconBox>
          )}
        </TopBox>
        <ContentBox onClick={() => dispatch(readNote({ type, id }))}>
          {parse(func())}
        </ContentBox>
        <TagsBox>
          {tags?.map(({ tag, id }) => (
            <span key={id}>{tag}</span>
          ))}
        </TagsBox>
        <FooterBox>
          <div className="noteCard__date">{date}</div>
          {/* <div>{getRelevantBtns(type, note, dispatch)}</div> */}
        </FooterBox>
      </Card>
    </>
  );
};

export default NoteCard;
