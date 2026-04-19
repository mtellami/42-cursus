import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastProvider } from 'rc-toastr'
import "rc-toastr/dist/index.css" 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <ToastProvider config={{ position: 'top-right'  }} >
			<App />
</ToastProvider>
)

