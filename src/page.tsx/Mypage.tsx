import { useState } from "react";
import styled from "styled-components";
import { DeleteMember } from "../api/MemberApi";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

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
      <Button onClick={openModal}>회원 탈퇴</Button>

      {showModal && (
        <ModalOverlay>
          <Modal>
            <h2>회원 탈퇴</h2>
            <Input
              type="text"
              name="userId"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <ModalActions>
              <Button onClick={handleDelete}>탈퇴</Button>
              <Button onClick={closeModal}>취소</Button>
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
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;
