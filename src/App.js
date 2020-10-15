import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import {Web3ReactProvider} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import './App.css';
import './assets/css/style.scss'
import {Home} from "./home";
import {Header} from './components/header/Header'
import {Pools} from "./pages/pools/Pools";
import {ContextProvider} from './reducer';
import {InitPage} from "./pages/InitPage";
import {StakingBOT} from "./pages/pools/StakingBOT";
import {StakingETH} from "./pages/pools/StakingETH";
import {StakingUSDT} from "./pages/pools/StakingUSDT";
import {StakingMEME} from "./pages/pools/StakingMEME";
import {StakingDEGO} from "./pages/pools/StakingDEGO";
import {StakingDONUT} from "./pages/pools/StakingDONUT";
import {Footer} from "./components/Footer";


function getLibrary(provider) {
    const library = new Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
}

function App() {
    return (
        <ContextProvider>
            <Web3ReactProvider getLibrary={getLibrary}>
                <div className="App wrapper modal-show">
                    <InitPage/>
                    <Router>
                        <Header/>
                        <Switch>
                            <Route path='/index'>
                                <Home/>
                            </Route>

                            <Route path='/pools' component={Pools}>
                            </Route>

                            <Route path='/staking-eth'>
                                <StakingETH/>
                            </Route>

                            <Route path='/staking-usdt'>
                                <StakingUSDT/>
                            </Route>

                            <Route path='/staking-bot'>
                                <StakingBOT/>
                            </Route>

                            <Route path='/staking-meme'>
                                <StakingMEME/>
                            </Route>

                            <Route path='/staking-dego'>
                                <StakingDEGO/>
                            </Route>

                            <Route path='/staking-donut'>
                                <StakingDONUT/>
                            </Route>

                        </Switch>
                        <Footer/>
                    </Router>
                    </div>
            </Web3ReactProvider>
        </ContextProvider>
    );
}

export default App;
