import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, fallback, isAuthorized: isAuthorized, ...rest }) =>
    <Route
        {...rest}
        render={
            () => {
                if (isAuthorized) {
                    return <Component {...rest} />

                }
                else {
                    return (
                        <Redirect to={fallback} />
                    )
                }
            }
        }
    />
    ;
export default ProtectedRoute;