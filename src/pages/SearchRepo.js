import React from "react";

import styled from "styled-components";
import SearchBar from "../elements/SearchBar";
import RepoListItem from "../components/RepoListItem";

// github actions
import { Octokit } from "@octokit/core";
import { githubToken } from "../shared/global_variables";

const SearchRepo = () => {
  const octokit = new Octokit({ auth: githubToken });
  const [searchResult, setSearchResult] = React.useState([]);

  const searchAction = async (searchWord) => {
    if (searchWord) {
      await octokit
        .request("GET /search/repositories", {
          q: searchWord,
        })
        .then((res) => setSearchResult(res.data.items));
    } else {
      window.alert("검색어를 입력해주세요!");
    }
  };

  return (
    <Wrapper>
      <Contents>
        <SearchBar searchAction={searchAction} />

        <TableLabel>
          <div id="owner"> 소유자 </div>
          <div id="repoName"> 레포지토리명 </div>
          <div id="description"> 설명 </div>
          <div id="createdAt"> 생성일 </div>
          <div id="add"> 등록 </div>
        </TableLabel>

        {searchResult.length ? (
          searchResult.map((item) => <RepoListItem key={item.id} data={item} />)
        ) : (
          <p id="noResult"> 검색결과가 없습니다 </p>
        )}
      </Contents>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;

  #noResult {
    margin: 100px auto;
    color: #ccc;
    font-size: 20px;
  }
`;

const TableLabel = styled.div`
  display: flex;
  width: 90%;
  padding: 10px;
  margin: 30px auto;

  div {
    text-align: center;
    font-weight: bold;
    padding: 0px 10px;
  }

  #owner {
    width: 120px;
  }

  #repoName {
    width: 120px;
  }

  #description {
    width: 230px;
  }

  #createdAt {
    width: 100px;
  }

  #add {
    width: 50px;
    border: none;
  }
`;

export default SearchRepo;
