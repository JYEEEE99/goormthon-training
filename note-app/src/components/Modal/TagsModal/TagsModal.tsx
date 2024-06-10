import React, { FC, useState } from "react";
import { Tag } from "../../../types/tag";
import { DeleteBox, FixedContainer } from "../Modal.styles";
import { Box, StyledInput, TagsBox } from "./TagModal.styles";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { toggleTagsModal } from "../../../store";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import getStandardName from "../../../utils/getStandardName";
import { v4 } from "uuid";
import { addTags, deleteTags } from "../../../store/tags/tagsSlice";
import { removeTags } from "../../../store/notesList/notesListSlice";
import { AddedTagsBox } from "../CreateNoteModal/CreateNoteModal.styles";

interface TagsModalProps {
  type: string;
  addedTags?: Tag[];
  handleTags?: (tag: string, type: string) => void;
}

const TagsModal: FC<TagsModalProps> = ({
  type,
  addedTags,
  handleTags,
}: TagsModalProps) => {
  const dispatch = useAppDispatch();
  const { tagsList } = useAppSelector((state) => state.tags);
  const [inputText, setInputText] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputText) return;

    dispatch(addTags({ tag: inputText.toLowerCase(), id: v4() }));
    setInputText("");
  };

  const deleteTagsHandler = (tag: string, id: string) => {
    dispatch(deleteTags(id));
    dispatch(removeTags({ tag }));
  };

  return (
    <FixedContainer>
      <Box>
        <div className="editTags__header">
          <div className="editTags++title">
            {type === "add" ? "Add" : "Edit"} Tags
          </div>
          <DeleteBox
            className="editTags__clsoe"
            onClick={() => dispatch(toggleTagsModal({ type, view: false }))}
          >
            <FaTimes />
          </DeleteBox>
        </div>
        <form onSubmit={submitHandler}>
          <StyledInput
            type="text"
            value={inputText}
            placeholder="New Tag .."
            onChange={(e) => setInputText(e.target.value)}
          />
        </form>
        <TagsBox>
          {tagsList.map(({ tag, id }) => (
            <li key={id}>
              <div className="editTags__tag">{getStandardName(tag)}</div>
              {type === "deit" ? (
                <DeleteBox onClick={() => deleteTagsHandler(tag, id)}>
                  <FaTimes />
                </DeleteBox>
              ) : (
                <DeleteBox>
                  {addedTags?.find(
                    (addedTag: Tag) => addedTag.tag === tag.toLowerCase()
                  ) ? (
                    <FaMinus onClick={() => handleTags!(tag, "remove")} />
                  ) : (
                    <FaPlus onClick={() => handleTags!(tag, "add")} />
                  )}
                </DeleteBox>
              )}
            </li>
          ))}
        </TagsBox>
      </Box>
    </FixedContainer>
  );
};

export default TagsModal;
