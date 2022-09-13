import React from "react";

import styled from "styled-components";

import { GoSearch } from 'react-icons/go';

const SearchBar = ( props ) => {
  const searchAction = props?.searchAction
  const searchRef = React.useRef();

  const enterEvent = (code) => {
    if (code === "Enter") {
      searchAction(searchRef?.current?.value)
    }
  }

  return (
      <Wrapper>
        <input type={"text"} ref={searchRef} onKeyDown={(e) => enterEvent(e.code)}/>
        <GoSearch id="searchIcon" onClick={ () => searchAction(searchRef?.current?.value)}/>
      </Wrapper>
    );
};

const Wrapper = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  input {
    width: 80%;
    height: 20px;
    padding: 10px 25px;
    border-radius: 30px;
    border: 1px solid #094e50;
    outline: none;
    font-size: 18px;

    &:focus {
      border: 2px solid #094e50;
    }
  }

  #searchIcon {
    font-size: 26px;
    color: #094e50;
    cursor: pointer;
  }

`

export default SearchBar;
