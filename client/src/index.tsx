import ReactDOM from 'react-dom/client';
import App from './App';
// import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store'; // Redux 스토어 가져오기
import { BrowserRouter } from 'react-router-dom';


// ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement, (
//   <Provider store={store}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>
// ));

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
