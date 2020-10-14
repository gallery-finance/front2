import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import {Web3ReactProvider} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import './App.css';
import {Home} from "./home";
import {Header} from './components/header/Header'
import {Pools} from "./pages/pools/Pools";
import {WalletConnect} from "./components/account/WalletConnect";
import {ContextProvider} from './reducer';


function getLibrary(provider) {
    const library = new Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
}

function App() {
    return (
        <ContextProvider>
            <Web3ReactProvider getLibrary={getLibrary}>
                <div className="App modal-show">
                    <Router>
                        <Header/>
                        <Switch>
                            <Route exact path='/index'>
                                <Home/>
                            </Route>

                            <Route exact path='/pools'>
                                <WalletConnect/>
                                <Pools/>
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </Web3ReactProvider>
        </ContextProvider>
    );
}

export default App;
