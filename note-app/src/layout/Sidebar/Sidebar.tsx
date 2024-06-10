import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Container, MainBox, StyledLogo, ItemsBox } from "./Sidebar.styles";
import { FaArchive, FaLightbulb, FaTag, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { v4 } from "uuid";
import { NavLink, useLocation } from "react-router-dom";
import { toggleMenu, toggleTagsModal } from "../../store";

// sidebar items
const items = [
  { icon: <FaArchive />, title: "Archive", id: v4() },
  { icon: <FaTrash />, title: "Trash", id: v4() },
];

const Sidebar: FC = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.menu);

  const location = useLocation();
  const { pathname } = location;
  if (pathname === "/404") return null;

  const { tagsList } = useAppSelector((state) => state.tags);

  return (
    <Container openMenu={isOpen ? "open" : ""}>
      <MainBox openMenu={isOpen ? "open" : ""}>
        <StyledLogo>
          <h1>Keep</h1>
        </StyledLogo>
        <ItemsBox>
          {/* note item */}
          <li onClick={() => dispatch(toggleMenu(false))}>
            <NavLink
              to={`/`}
              state={`notes`}
              className={({ isActive }) =>
                isActive ? "active-item" : "inactive-item"
              }
            >
              <span>
                <FaLightbulb />
              </span>
              <span>Notes</span>
            </NavLink>
          </li>
          {/* edit tag item */}
          <li
            className="sidebar__edit-item"
            onClick={() =>
              dispatch(toggleTagsModal({ type: "edit", view: true }))
            }
          >
            <span>
              <MdEdit />
            </span>
            <span>Edit Tags</span>
          </li>
          {/* other items */}
          {items.map(({ icon, title, id }) => (
            <li key={id} onClick={() => dispatch(toggleMenu(false))}>
              <NavLink
                to={`/${title.toLowerCase()}`}
                state={`${title}`}
                className={({ isActive }) =>
                  isActive ? "active-item" : "inactive-item"
                }
              >
                <span>{icon}</span>
                <span>{title}</span>
              </NavLink>
            </li>
          ))}
        </ItemsBox>
      </MainBox>
    </Container>
  );
};

export default Sidebar;
