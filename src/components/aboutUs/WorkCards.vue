<template>
    <div class="container my-5">
      <div class="row text-center">
       
        <div class="col-md-4 ">
          <div class="p-3">
            <div class="underline-purple mb-3"></div>
            <h4 class="fw-bold">Work with us</h4>
            <p>At Udemy, we're all learners and instructors. We live out our values every day to create a culture that is diverse, inclusive, and committed to helping employees thrive.</p>
            <div class="p-3">
            <a href="#" class="text-purple">Join our team &rarr;</a>
        </div>
          </div>
        </div>
  
        <!-- See our research -->
        <div class="col-md-4">
          <div class="p-3">
            <div class="underline-purple mb-3"></div>
            <h4 class="fw-bold">See our research</h4>
            <p>We're committed to improving lives through learning. Dig into our original research to learn about the forces that are shaping the modern workplace.</p>
             <div class="p-3">
            <a href="#" class="text-purple">Learn more &rarr;</a>
        </div>
          </div>
        </div>
  
        <!-- Read our blog -->
        <div class="col-md-4">
          <div class="p-3">
            <div class="underline-teal mb-3"></div>
            <h4 class="fw-bold">Read our blog</h4>
            <p>Want to know what we've been up to lately? Check out the Udemy blog to get the <br>scoop on the latest news, ideas, and projects.</p>
            <div class="p-3">
            <a href="#" class="text-teal">Read now &rarr;</a>
        </div>
          </div>
        </div>
      </div>
      
    </div>
  </template>
  
  <script>
  export default {
    name: "InfoComponent",
  };
  </script>
  
  <style>
  .underline-purple {
    height: 6px;
    background-color: #7a1ba2;
    margin: 0 auto;
    width: max;
  }
  
  .underline-teal {
    height: 6px;
    background-color: #008080;
    width: max;
    margin: 0 auto;
  }
  
  .text-purple {
    color: #7a1ba2;
    text-align: left;
  }
  
  .text-teal {
    color: #008080;
    text-align: left;

  }
  
  h4 {
    font-weight: 700;
    margin-bottom: 30%;
    text-align: left;
  }
  
  p {
    font-size: 1.2rem;
    text-align: left;
  }

 
  </style>
  