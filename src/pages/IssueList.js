import React from "react";
import styled from "styled-components";

import IssueItem from "../components/IssueItem";

// github actions
import { Octokit } from "@octokit/core";
import { githubToken } from "../shared/global_variables";

const IssueList = () => {
  const octokit = new Octokit({ auth: githubToken });
  const repoList = JSON.parse(localStorage.getItem("myRepository"));
  const [issues, setIssues] = React.useState([]);

  const getIssue = async (repoName) => {
    await octokit
      .request(`GET /repos/${repoName}/issues`, {
        owner: repoName.split("/")[0],
        repo: repoName.split("/")[1],
      })
      .then((res) => {
        if (res.data.length) {
          setIssues([...issues, ...res.data]);
        }
      });
  };

  React.useEffect(() => {
    getIssue(repoList[0]);
  }, []);

  return (
    <Wrapper>
      
      <TableLabel>
        <div id="repoName"> 레포지토리명 </div>
        <div id="type"> 타입 </div>
        <div id="title"> 이슈 제목 </div>
        <div id="createdAt"> 생성일 </div>
      </TableLabel>

      {issues.map((item) => (
        <IssueItem key={item.id} data={item} />
      ))}

    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
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
export default IssueList;
