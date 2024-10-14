import { useState } from "react";
import styled from "styled-components";
import { DeleteMember } from "../api/MemberApi";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDelete = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const result = await DeleteMember(userId, password, token);
      alert(result);
      setUserId("");
      setPassword("");
      closeModal();
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <Container>
      <DeleteButton onClick={openModal}>회원 탈퇴</DeleteButton>

      {showModal && (
        <ModalOverlay>
          <Modal>
            <h2>회원 탈퇴</h2>
            <Input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <ModalActions>
              <ConfirmButton onClick={handleDelete}>탈퇴</ConfirmButton>
              <CancelButton onClick={closeModal}>취소</CancelButton>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Mypage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const DeleteButton = styled.button`
  background-color: #ff4b4b;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff2b2b;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 300px;
  text-align: center;

  h2 {
    margin-bottom: 20px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ConfirmButton = styled.button`
  background-color: #ff4b4b;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  flex: 1;
  margin-right: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff2b2b;
  }
`;

const CancelButton = styled.button`
  background-color: #ccc;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  flex: 1;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #999;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;
