import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CommentList from './components/CommentList/CommentList';

function App() {
  return (
    <div className="App">
        <div className="row">
           <h1>Overview comments</h1>

           <CommentList />
        </div>
    </div>
  );
}

export default App;
