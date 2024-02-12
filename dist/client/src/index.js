"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = __importDefault(require("react-dom/client"));
const App_1 = __importDefault(require("./App"));
// import { BrowserRouter as Router} from 'react-router-dom';
const react_redux_1 = require("react-redux");
const store_1 = __importDefault(require("./store/store")); // Redux 스토어 가져오기
const react_router_dom_1 = require("react-router-dom");
// ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement, (
//   <Provider store={store}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>
// ));
const root = client_1.default.createRoot(document.getElementById('root'));
root.render((0, jsx_runtime_1.jsx)(react_redux_1.Provider, { store: store_1.default, children: (0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsx)(App_1.default, {}) }) }));
