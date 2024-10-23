<template>
    <div class="container-fluid d-flex p-5 align-items-center justify-content-center ">
      <div class="text-center">
        <h1 class="font-weight-bold">Become an instructor today</h1>
        <p>
          Join one of the world’s largest online learning<br />
          marketplaces.
        </p>
        <button class="btn btn-primary no-border-radius">Get Started</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "InstructorCallToAction",
  };
  </script>
  
  <style scoped>
  /* Styles for button without border radius */
  .no-border-radius {
    border-radius: 0 !important; /* Remove border radius */
  }
  
  * {
    background-color: #F7F9FA;
    margin: 0; /* Remove default margin */
    padding: 0; /* Remove default padding */
  }
  
  
  
  button {
    background-color: #3E4143;
    width: 40%;
  }
  
  h1 {
    font-weight: bold; /* Make the heading bold */
  }
  
  p {
    margin-bottom: 20px; /* Space between paragraph and button */
  }
  @media (max-width: 768px) {
  button{
    width: 200px;
  }
  }
  </style>
  