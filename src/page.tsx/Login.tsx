import React, { useState, FormEvent } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { LoginProps } from "../types/MemberTypes";
import { login } from "../api/MemberApi";

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<LoginProps>({
    userId: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await login(loginData);
      sessionStorage.setItem("token", result);
      navigate("diarylist");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Weather</Title>
        <Input
          type="text"
          name="userId"
          placeholder="ID"
          value={loginData.userId}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          required
        />
        <ButtonBox>
          <Button type="submit">로그인</Button>
          <Button type="button" onClick={() => navigate("/join")}>
            회원가입
          </Button>
        </ButtonBox>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f4f8;
`;

const LoginForm = styled.form`
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
