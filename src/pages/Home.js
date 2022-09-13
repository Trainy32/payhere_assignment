import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// style
import styled from "styled-components";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";

const Home = () => {
  const navigate = useNavigate()
  const repoList = JSON.parse(localStorage.getItem("myRepository"));

  const [, updateState] = React.useState()
  const forceUpdate = useCallback(()=> updateState({}),[])

  const deleteRepository = (itemToDelete) => {
    if(window.confirm('정말 삭제합니까?')) {
      const newList = repoList.filter((item) => ( item !== itemToDelete))
      localStorage.setItem("myRepository", JSON.stringify(newList))
      forceUpdate()
      window.alert('삭제되었습니다')
    }
  }

  return (
    <Wrapper>
      <h3> 
        내가 저장한 Repository 
        <span id="addIcon" onClick={()=> navigate('/search')}><IoIosAddCircleOutline/></span> 
      </h3>
      {repoList ? (
        repoList.map((item) => (
          <div key={item} className="listItem">
            <li onClick={() => { window.open(`https://github.com/${item}`, "_blank"); }}> {item} </li>
            <AiOutlineDelete className="delete" onClick={() => deleteRepository(item)}/>
          </div>
        ))
      ) : (
        <div id="noResult">
          <p> 아직 저장한 Repository가 없어요!</p> 
          <button id="goToSearch" onClick={()=> navigate('/search')}> 찾으러 가기 </button>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 90%;
  padding: 20px;
  display: flex;
  flex-direction: column;

  #addIcon {
    font-size: 22px;
    margin-left: 5px;
    cursor: pointer;
  }

  .listItem {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .delete {
    font-size: 20px;
    color: darkred;
    cursor: pointer;
  }

  li {
    font-size: 18px;
    line-height: 36px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  #noResult {
    margin: 100px auto;
    color: #ccc;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  #goToSearch {
    margin: auto;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    color: #68b9bc;
    background: #e4feff;
    cursor: pointer;
  }
`;

export default Home;
