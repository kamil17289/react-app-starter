import logo from './react.svg';
import './app.scss';


function App() {
    return (
        <div className="app">
            <img src={logo} alt={'React App'}/>

            This is the brand new React App! <br/>
            <strong>Fast, functional, no cra-shit included</strong>
        </div>
    );
}

export default App;