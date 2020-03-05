import React from 'react';
import { Switch, Route } from 'react-router-dom'; 

import Watershed from '~/pages/Watershed';

export default function Routes() {
    return(
        <Switch>
            <Route exact path="/" component={Watershed}/>
        </Switch>
    );
}