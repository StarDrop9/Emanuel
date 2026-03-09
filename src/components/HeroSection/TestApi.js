import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: red; /* Default color */
  color: white; /* Text color */
  padding: 10px 15px; /* Padding */
  border: none; /* No border */
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
  z-index: 10; /* Ensure it's on top */
  position: relative; /* Required for z-index to take effect */

  &:hover {
    background-color: white; /* Change background on hover */
    color: black; /* Change text color on hover */
  }
`;

const TestApi = () => {
  const testApiCall = async () => {
    try {
      const response = await fetch(
        "https://api.elevenlabs.io/v1/text-to-speech/CwhRBWXzGAHq8TQ4Fs17",
        {
          method: "POST",
          headers: {
            "xi-api-key": "sk_00ab632876e7d429247536a3178fdf102268e35cff061bca", // Your API key
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: "Hello, world!", // The text you want to convert
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle the response as a blob
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // Create a new audio object and play it
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h4>Test API Component</h4>
      <StyledButton onClick={testApiCall}>Test API</StyledButton>
    </div>
  );
};

export default TestApi;
