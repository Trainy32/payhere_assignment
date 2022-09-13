import React from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import github_logo from "../styles/github_logo.png";

const TopMenu = () => {
  const navigate = useNavigate()

  return (
    <Wrapper>
      <GithubLogo src={github_logo} alt="github_logo" onClick={() => window.open('https://github.com/' , '_blank')}/>
      <span onClick={()=> navigate('/')}> 등록된 저장소 </span>
      <span onClick={()=> navigate('/search')}> 저장소 찾기</span>
      <span onClick={()=> navigate('/issue')}> 이슈 모아보기 </span>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  background: #094e50;
  padding: 10px;

  display: flex;
  align-items: center;
  gap: 30px;
  color: #ddd;
  font-weight: bold;

  span {
    cursor: pointer;
  }
`

const GithubLogo = styled.img`
  width: 100px;
  cursor: pointer;
`


export default TopMenu