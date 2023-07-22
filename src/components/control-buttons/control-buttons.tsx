import { Box, Button } from "@mui/material";

interface ControlButtonsProps {
  pagesNumber: number;
  activePage: number;
  choosenPage: (page: number) => void;
}
export const ControlButtons = ({
  activePage,
  pagesNumber,
  choosenPage,
}: ControlButtonsProps) => {
  const pagesList = [];

  for (let i = 1; i <= pagesNumber; i++) {
    if (i !== activePage) {
      pagesList.push(<span style={{ color: "#474955" }}>{i}</span>);
    } else {
      pagesList.push(<span style={{ color: "#7EBC3C" }}>{i}</span>);
    }
  }

  function setPage(page: number) {
    const newPageNumber = activePage + page;

    if (newPageNumber < 1 || newPageNumber > pagesNumber) {
      return;
    }

    choosenPage(newPageNumber);
  }

  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between", marginTop: 1 }}
    >
      <Button onClick={() => setPage(-1)}>Назад</Button>
      <Box
        sx={{
          width: 150,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {pagesList}
      </Box>
      <Button onClick={() => setPage(1)}>Далее</Button>
    </Box>
  );
};
