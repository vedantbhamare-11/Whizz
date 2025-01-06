'use client';
import '../styles/globals.css';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Provider } from "react-redux";
import { store } from "../redux/store";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', margin: 0 }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Header />
          <Provider store={store}>
          {children}
        </Provider>
        </div>
      </body>
    </html>
  );
}
