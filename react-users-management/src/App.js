import './App.css';
import Users from './Pages/Users';
import './css/custom.css'
import { Provider } from "react-redux";

import store from './Store/store';


function App() {
  return ( < Provider store = { store } >
            <Users/> 
            </Provider>
         );
}

export default App;