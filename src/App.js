import Header from "./components/Header";
import "./app.css";
import UserInput from "./components/UserInput";

function App() {
  return (
    <div className="App">
      <div className="wrap" align="center">
        <Header/>
        <UserInput />
      </div>
    </div>
  );
}

export default App;
