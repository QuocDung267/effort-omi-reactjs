import SignIn from "./pages/login/SignIn";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import { history } from "./utils/BrowserHistory";
import { useEffect } from "react";
import Header from "./components/header/Header";
import { PrivateRoute } from "./PrivateRoute ";
import { BrowserRouter } from "react-router-dom";

function App() {
  // const token = getAuthToken();
  useEffect(() => {
    document.title = "Ominicites's System";
  }, []);
  return (
    <BrowserRouter>
      <Router history={history}>
        <Switch>
          <PrivateRoute path="/dashboard" component={Header} />
          <Route exact path="/login" component={SignIn} />
          <Route
            path="/"
            render={() => {
              return <Redirect to="/login" />;
            }}
          />
        </Switch>
      </Router>
    </BrowserRouter>
  );
}

export default App;
