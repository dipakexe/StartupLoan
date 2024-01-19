import React from "react";

import Typewriter from "typewriter-effect";

const ProcessingLoanLabel = () => (
  <>
    <Typewriter
      options={{
        strings: ["Processing loan application..."],
        autoStart: true,
        loop: true,
        delay: 50,
        cursor: "",
      }}
    />
  </>
);

export default ProcessingLoanLabel;
