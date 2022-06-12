import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Login from './components/Login';


function App() {
  return (
    <div className="App">
      <AppBar position="static" style={{ background: "teal"}}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            CarList
          </Typography>
        </Toolbar>
      </AppBar>
      <Login />
    </div>
  );
}

export default App;
