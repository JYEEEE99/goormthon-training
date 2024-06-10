import React from "react";
import { Container, StyledNav } from "./Navbar.styles";
import { ButtonFill } from "../../styles/styles";
import { FiMenu } from "react-icons/fi";
import { useAppDispatch } from "../../hooks/redux";
import { useLocation } from "react-router-dom";
import { toggleMenu } from "../../store/menu/menuSlice";
import getStandardName from "../../utils/getStandardName";
import { toggleCreateNoteModal } from "../../store";
const Navbar = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { pathname, state } = location;
  if (pathname === "/404") return null;

  return (
    <StyledNav>
      <div className="nav__menu">
        <FiMenu onClick={() => dispatch(toggleMenu(true))}></FiMenu>
      </div>
      <Container>
        <div className="nav__page-titls">{getStandardName(state)}</div>
        {state !== "Trash" && state !== "Archive" && (
          <ButtonFill
            onClick={() => dispatch(toggleCreateNoteModal(true))}
            className="nav__btn"
          >
            <span>+</span>
          </ButtonFill>
        )}
      </Container>
    </StyledNav>
  );
};

export default Navbar;
