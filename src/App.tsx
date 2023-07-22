import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { getData } from "./utils";
import { SearchForm } from "./components/search-form";
import { PostsTable } from "./components/posts-table";
import { ControlButtons } from "./components/control-buttons";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { loadPosts } from "./store/posts-slice";

import "./App.css";
import { Post } from "./ts";

function App() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);

  const navigate = useNavigate();

  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    async function loadData() {
      const posts: Post[] = await getData(
        "https://jsonplaceholder.typicode.com/posts"
      );
      dispatch(loadPosts(posts));
      setData(posts.slice((page - 1) * 10, page * 10));
    }

    loadData();
  }, []);

  useEffect(() => {
    setData(posts.slice((page - 1) * 10, page * 10));
    navigate(`/${page}`);
  }, [page]);

  useEffect(() => {
    setData(posts.slice((1 - 1) * 10, 1 * 10));
    setPage(1);
  }, [posts]);

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

    setData(searchedPosts);
  }

  return (
    <>
      <Routes>
        <Route
          path="/:page"
          element={
            <>
              <SearchForm onSearch={(value) => searchPosts(value)} />
              <PostsTable data={data} />
              <ControlButtons
                pagesNumber={Math.ceil(posts.length / 10)}
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
