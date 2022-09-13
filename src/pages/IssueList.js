import React from "react";
import styled from "styled-components";

import IssueItem from "../components/IssueItem";

// github actions
import { Octokit } from "@octokit/core";
import { githubToken } from "../shared/global_variables";

const IssueList = () => {
  const octokit = new Octokit({ auth: githubToken });
  const repoList = JSON.parse(localStorage.getItem("myRepository"));
  const [datalist, setDatalist] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);

  const getIssue = async (repoList) => {
    if (isLoading) {
      setPage(1)
      const response = [];
      for (let i = 0; i < repoList.length; i++) {
        await octokit
          .request(`GET /repos/${repoList[i]}/issues`, {
            owner: repoList[i].split("/")[0],
            repo: repoList[i].split("/")[1],
            per_page: 1000,
          })
          .then((res) => response.push(...res.data));
      }

      setDatalist(response);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getIssue(repoList);
  }, [isLoading]);

  return (
    <Wrapper>
      <TableLabel>
        <div id="repoName"> 레포지토리명 </div>
        <div id="type"> 타입 </div>
        <div id="title"> 이슈 제목 </div>
        <div id="createdAt"> 생성일 </div>
      </TableLabel>

      {isLoading ? <p id="loading"> 로딩중... </p> : null}

      {datalist.map((item, idx) => (idx < page * 15 ? <IssueItem key={item.id} data={item} /> : null))}

      {datalist.length >= page * 15 ? (
        <SeeMore onClick={() => setPage(() => page + 1)}>
          더 보기 {`( ${page} / ${Math.ceil(datalist.length / 15)} )`}{" "}
        </SeeMore>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  #loading {
    margin: 100px auto;
    color: #ccc;
    font-size: 24px;
  }
`;

const TableLabel = styled.div`
  display: flex;
  width: 90%;
  padding: 10px;
  margin: 10px auto;

  div {
    text-align: center;
    font-weight: bold;
    padding: 0px 10px;
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
`;

const SeeMore = styled.button`
  width: 90%;
  margin: 20px auto;
  padding: 10px;
  border: none;
  cursor: pointer;
`;

export default IssueList;
