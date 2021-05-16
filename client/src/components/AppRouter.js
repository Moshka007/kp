import React, { useContext } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { Context } from '../index';
import {authRouters, publicRouters, adminRouters} from '../routes';
import { SHOP_ROUTE } from '../utils/consts';

const AppRouter = () => {
    const {user} = useContext(Context);

    return (
        <Switch>
            {user.isAuth && authRouters.map(({path, Component}) => 
                <Route key={path} path={path} component={Component} exact />
            )}

            {user.isAdmin &&  adminRouters.map(({path, Component}) => 
                <Route key={path} path={path} component={Component} exact />
            )}

            {publicRouters.map(({path, Component}) => 
                <Route key={path} path={path} component={Component} exact />
            )}

            <Redirect to={SHOP_ROUTE}/>
        </Switch>
    );
};

export default AppRouter;