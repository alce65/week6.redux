# React-Redux-TypeScrip

## Desde un proyecto previo react-typescript

```shell
mpm i react-redux @reduxjs/toolkit
```

## Desde 0

```shell
npx create-react-app <my-app> --template redux-typescript
```

Resultado de un proyecto iniciado (bootstrapped) con [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Estructura del proyecto

### Features

    - Home -> componente Auth para el login/logout del usuario basado en Auth0
    - About -> página sin contenido
    - Todo -> Demo del funcionamiento de React-redux con una TODO List

### Infrastructure

    - Componentes
        - Layout, que consume Header, Footer y Menu
        - App -> proporciona Provider de Auth0 y Layout al componente Routes
        - Routes -> Rutas publicas y privadas a las diferentes páginas usando Lazy Loading
        - PrivateRoute -> wrapper para crear las rutas privadas
    - Store Redux

## TODO List

### Data

-   Data Model
-   Server (Json-server): EndPoint http://localhost:3500/tasks (from .env)
-   Data Repository

#### Data Repository

-   Abstract repository interface -> use of TS generict
-   TaskRepository -> class implementing the interface

##### Testing

### Uso de redux - TODO List

-   action.types -> object / enum

-   action.creators -> createAction (RTK)
-   reducer -> createReducer (RTK)
-   (ALT) -> slice (RTK)

-   test del reducer

-   modelo de datos -> type / interface / class
-   store -> configureStore (RTK) + types
-   provider -> Provider (react-redux)

-   componente (view)

    -   useSelector() (react-redux)
        useSelector((state: rootState ) => state.<branch>)
    -   useDispatch() (react-redux)

    -   ¿Integramos servicioAPI?
        -   como servicio externo
        -   como thunk

#### Testing

#### Developer Tools
