import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { getData } from "./utils";
import { SearchForm } from "./components/search-form";
import { PostsTable } from "./components/posts-table";
import { ControlButtons } from "./components/control-buttons";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { loadPosts } from "./store/posts-slice";
import { sortArrayByType } from "./utils";

import "./App.css";
import { Post } from "./ts";

function App() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);

  const navigate = useNavigate();

  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<Post[]>([]);
  const [pagesNumber, setPagesNumber] = useState<number>(10);

  useEffect(() => {
    async function loadData() {
      const posts: Post[] = await getData(
        "https://jsonplaceholder.typicode.com/posts"
      );
      dispatch(loadPosts(posts));
      setData(posts);
    }

    loadData();
  }, []);

  useEffect(() => {
    navigate(`/${page}`);
  }, [page]);

  function searchPosts(searchText: string): void {
    const searchTextLowered = searchText.toLowerCase();
    const searchedPosts = posts.filter((post) => {
      const { id, title, body } = post;
      if (
        id.toString().startsWith(searchTextLowered) ||
        title.startsWith(searchTextLowered) ||
        body.startsWith(searchTextLowered)
      )
        return post;
    });

    setPage(1);
    setData(searchedPosts);
    setPagesNumber(Math.ceil(searchedPosts.length / 10));
  }

  function sortPosts(sortType: string) {
    switch (sortType) {
      case "id": {
        setData([...data.sort((a, b) => a.id - b.id)]);
        break;
      }
      case "title": {
        setData(sortArrayByType(data, "title"));
        break;
      }
      case "body": {
        setData(sortArrayByType(data, "body"));
        break;
      }
    }

    setPage(1);
  }

  return (
    <>
      <Routes>
        <Route
          path="/:page"
          element={
            <>
              <SearchForm onSearch={(value) => searchPosts(value)} />
              <PostsTable
                data={data.slice((page - 1) * 10, page * 10)}
                onSort={(type: string) => sortPosts(type)}
              />
              <ControlButtons
                pagesNumber={pagesNumber}
                activePage={page}
                choosenPage={(page: number) => setPage(page)}
              />
            </>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
