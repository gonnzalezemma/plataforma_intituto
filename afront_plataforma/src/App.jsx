
import Routing from "./routes/Routing";
import {AuthContext} from "./context/AuthContext"
function App() {
  return(
    <>
<AuthContext>
    <NavBar />
     <Routing/>
    <Footer />
  </AuthContext>
    </>
  );
}

export default App;
