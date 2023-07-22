import { Box, InputBase, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";

interface SearchFormProps {
  onSearch: (value: string) => void;
}

export const SearchForm = ({ onSearch }: SearchFormProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#5A5C66",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Поиск"
        onChange={(e) => onSearch(e.target.value)}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <Search />
      </IconButton>
    </Box>
  );
};
