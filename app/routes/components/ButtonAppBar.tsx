import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
            Ping Pong All Stars Tournament
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
