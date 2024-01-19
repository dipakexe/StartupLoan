import React from "react";
import Header from "./components/Header";

import "./style.css";
import Footer from "./components/Footer";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationSection from "./components/ApplicationSection";
const App = () => {
  return (
    <div>
      <Header />
      <ApplicationSection>
        <ApplicationForm />
      </ApplicationSection>
      <Footer />
    </div>
  );
};

export default App;
