import React from "react";

function Welcome() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center px-6 space-y-4">
      <img
        src="https://manavrachna.edu.in/wp-content/uploads/2022/09/newmrlogo-scaled.jpg"
        className="w-60"
      />
      <h1 className="text-lg font-semibold">
        Welcome to Manav Rachna Museum <br />
        <span className="text-sm">
          Please Scan the QR against an item from your camera app or Manav
          Rachna Museum App on your phone to continue.
        </span>
      </h1>
    </div>
  );
}

export default Welcome;
