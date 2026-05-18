import React from "react";
import styled from "styled-components";

const Loading: React.FC = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div className="loader-text">Loading...</div>
        <div className="loader-bar" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 89vh;

  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .loader-text {
    font-size: 18px;
    color: rgb(0, 0, 0);
    margin-bottom: 12px;
    text-align: center;
  }

  .loader-bar {
    width: 30%;
    height: 10px;
    border-radius: 5px;
    background-color: rgb(0, 0, 0);
    animation: loader-bar-animation 2s ease-in-out infinite;
  }

  @keyframes loader-bar-animation {
    0% {
      transform: translateX(-100%);
    }

    50% {
      transform: translateX(100%);
    }

    100% {
      transform: translateX(-100%);
    }
  }
`;

export default Loading;
