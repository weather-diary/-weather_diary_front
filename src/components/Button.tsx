import React from "react";
import styled from "styled-components";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  children,
  onClick,
}) => {
  return (
    <StyledButton type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(49, 130, 206, 0.3);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #296db1;
  }
`;
