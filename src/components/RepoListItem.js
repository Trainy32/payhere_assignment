import React from "react";

import styled from "styled-components";

const RepoListItem = (props) => {
  const data = props.data

  const saveRepo = () => {
    const repoList = JSON.parse(localStorage.getItem("myRepository"))

    if (!repoList) {
      localStorage.setItem("myRepository", JSON.stringify([props.data.full_name]))
      window.alert('저장에 성공했습니다.')
    } else if (repoList.length >= 4 ) {
      window.alert('최대 4개까지 저장 가능합니다. 기존에 저장된 Repository를 삭제후 시도해주세요')
    } else {
      repoList.push(props.data.full_name)
      const newList = [...new Set(repoList)]
      localStorage.setItem("myRepository", JSON.stringify(newList))
      window.alert('저장에 성공했습니다.')
    }
  };

  return (
    <ItemWrap>
      <div id="owner"> { data.owner.login } </div>
      <div id="repoName" onClick={() => window.open(data.html_url , '_blank')}> { data.name } </div>
      <div id="description"> { data.description }  </div>
      <div id="createdAt"> { data.created_at.split('T')[0] } </div>
      <div id="add"> <button onClick={ ()=> saveRepo() }> Add+ </button> </div>
    </ItemWrap>
  );
};

const ItemWrap = styled.div`
  width: 90%;
  margin: 10px auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px 0px;
  display: flex;
  box-shadow: 2px 2px 3px #ddd;

  div {
    padding: 0px 10px;
    border-right: 1px solid #333;
    word-break: break-all;
  }

  #owner {
    width: 120px;
  }

  #repoName {
    width: 120px;
    text-decoration: underline;

    cursor: pointer;
  }

  #description {
    width: 230px;
    word-break: break-word;
  }

  #createdAt {
    width: 100px;
  }

  #add {
    width: 50px;
    border: none;
    button {
      width: 100%;
      height: 100%;
      font-weight: bold;
      color: #065b61;
      background: #bcfaff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  }

`;

export default RepoListItem;
