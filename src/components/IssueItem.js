import React from "react";

import styled from "styled-components";

const IssueItem = (props) => {
  const data = props.data

  return (
    <ItemWrap onClick={() => window.open(data.html_url , '_blank')}>
      <div id="repoName"> {data.html_url.split('/')[4]} </div>
      <div id="type"> {data.html_url.split('/')[5]} </div>
      <div id="title"> {data.title} </div>
      <div id="createdAt"> {data.created_at.split('T')[0]} </div>
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
  cursor: pointer;

  &:hover{
    box-shadow: 3px 3px 5px #ccc; 
  }

  div {
    padding: 0px 10px;
    border-right: 1px solid #333;
  }

  #repoName {
    width: 120px;
  }

  #type {
    width: 50px;
  }

  #title {
    width: 400px;
  }

  #createdAt {
    width: 100px;
    border: none;
  }
`

export default IssueItem;
