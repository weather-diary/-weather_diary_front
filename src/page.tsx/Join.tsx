import React, { useState, FormEvent } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { createMember } from "../api/MemberApi";

const Join = () => {
  const navigate = useNavigate();

  const [joinData, setJoinData] = useState({
    userId: "",
    password: "",
    phNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJoinData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await createMember(joinData);
      console.log(result);
      alert("회원가입이 성공했습니다.");
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <JoinContainer>
      <JoinForm onSubmit={handleSubmit}>
        <Title>회원가입</Title>
        <Input
          type="text"
          name="userId"
          placeholder="ID"
          value={joinData.userId}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={joinData.password}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="phNumber"
          placeholder="Phone Number"
          value={joinData.phNumber}
          onChange={handleChange}
          required
        />
        <ButtonBox>
          <Button type="submit">회원가입</Button>
          <Button type="button" onClick={handleCancel}>
            취소
          </Button>
        </ButtonBox>
      </JoinForm>
    </JoinContainer>
  );
};

export default Join;

const JoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f4f8;
`;

const JoinForm = styled.form`
  background-color: #ffffff;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 380px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
`;

const Title = styled.h1`
  color: #2d3748;
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  gap: 4px;
`;
