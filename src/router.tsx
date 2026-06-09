import {
    BrowserRouter,
    Switch,
    Route,
} from 'react-router-dom';

import Test from './pages/DiscTest';

import Result from './pages/DiscTest/Result';

import CandidateRegister from "./pages/CandidateRegister";

export default function Router(){

    return(

        <BrowserRouter>

            <Switch>

                <Route

                    exact

                    path="/"

                    render={()=>

                        <CandidateRegister/>

                    }

                />

                <Route

                    exact

                    path="/test"

                    render={()=>

                        <Test/>

                    }

                />

                <Route

                    exact

                    path="/result"

                    render={()=>

                        <Result/>

                    }

                />

            </Switch>

        </BrowserRouter>

    );

}