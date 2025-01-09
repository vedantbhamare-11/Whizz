"use client";

import "../styles/globals.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Provider } from "react-redux";
import  store  from "../redux/store";

interface RootLayoutProps {
  children: React.ReactNode; // Type for the `children` prop
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body >
        
          <Provider store={store}>
            {children}
          </Provider>
        
      </body>
    </html>
  );
}
