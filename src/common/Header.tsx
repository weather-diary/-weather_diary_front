import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #64c4ed;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PageTitle = styled.h1`
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.4rem 0.8rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  font-size: 0.9rem;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const Header = () => {
  const location = useLocation();

  const getPageName = () => {
    switch (location.pathname) {
      case "/diarylist":
        return "일기 목록";
      case "/mypage":
        return "마이페이지";
      default:
        return "";
    }
  };

  const logoutHandler = () => {
    sessionStorage.clear();
  };

  return (
    <HeaderContainer>
      <PageTitle>{getPageName()}</PageTitle>
      <NavLinks>
        <StyledLink to="/mypage">마이페이지</StyledLink>
        <StyledLink to="/" onClick={logoutHandler}>
          로그아웃
        </StyledLink>
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header;
