import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import React from 'react';

import App from './library/App';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <p>Error!</p>,
        children: [

        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);