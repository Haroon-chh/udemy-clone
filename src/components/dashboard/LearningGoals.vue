<template>
    <div class="container-fluid learning-goals-container">
      <!-- Row for Title Text Above the Goals -->
      <div class="row mb-3">
        <div class="col">
          <h2 class="text-left">Learning focused on your goals</h2>
        </div>
      </div>
  
      <!-- Main Row for Goals and Image Sections -->
      <div class="row">
        <!-- Left Column: List of Goals -->
        <div class="col-auto" style="width: 528px; margin-right: 50px;">
          <div
            v-for="(goal, index) in goals"
            :key="index"
            @click="selectGoal(index)"
            :class="['goal-item', 'mb-3', 'p-3', { 'selected': selectedGoalIndex === index, 'hovered': hoveredGoalIndex === index }]"
            @mouseover="hoveredGoalIndex = index"
            @mouseleave="hoveredGoalIndex = null"
            style="height: 154px; cursor: pointer; transition: all 0.3s ease; border-radius: 10px; position: relative;"
          >
            <div class="d-flex">
              <!-- Icon Aligned on the Left Side of Heading and Text, starting 53px from the top of the card -->
              <div class="goal-icon me-3" style="width: 100px; margin-top: 25px;">
                <img :src="goal.icon" alt="goal icon" class="img-fluid" style="width: 53px; height: 53px;" />
              </div>
              <!-- Text Content Stacked Vertically -->
              <div class="goal-text">
                <div class="d-flex align-items-center" style="margin-top: 25px">
                  <h3 class="mb-1 goal-title">{{ goal.title }}</h3>
                  <!-- Enterprise Plan Box for the Last Two Goals Positioned 18px to the Right of the Heading -->
                  <span v-if="index === 2 || index === 3" class="enterprise-plan-box ms-3" style="margin-left: 18px;">Enterprise Plan</span>
                </div>
                <p class="mb-1 goal-description">{{ goal.description }}</p>
                <!-- Find out more Link with Arrow for the Last Two Goals -->
                <a v-if="index === 2 || index === 3" href="#" class="find-out-more d-inline-block">
                  Find out more
                  <span class="arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Right Column: Display Selected Goal Image -->
        <div class="col">
          <img :src="goals[selectedGoalIndex].image" alt="goal image" class="goal-image" style="width: 530px; height: 630px;" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "LearningGoals",
    data() {
      return {
        selectedGoalIndex: 0,
        hoveredGoalIndex: null,
        goals: [
          {
            title: "Hands-on training",
            description: "Upskill effectively with AI-powered coding exercises, practice tests, and quizzes.",
            icon: require('@/assets/hands-on-practice.png'),
            image: require('@/assets/desktop-hands-on-learning-2x.png'),
          },
          {
            title: "Certification prep",
            description: "Prep for industry-recognized certifications by solving real-world challenges and earn badges along the way.",
            icon: require('@/assets/certificate.png'),
            image: require('@/assets/desktop-certification-prep-2x.png'),
          },
          {
            title: "Insights and analytics",
            description: "Fast-track goals with advanced insights plus a dedicated customer success team to help drive effective learning.",
            icon: require('@/assets/empty-state-1.png'),
            image: require('@/assets/desktop-insights-and-analytics-2x.png'),
          },
          {
            title: "Customizable content",
            description: "Create tailored learning paths for team and organization goals and even host your own content and resources.",
            icon: require('@/assets/organizations-2.png'),
            image: require('@/assets/desktop-customizable-2x.png'),
          },
        ],
      };
    },
    methods: {
      selectGoal(index) {
        this.selectedGoalIndex = index;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Main Container Styling */
  .learning-goals-container {
    padding: 20px;
  }
  
  /* Goal Item Styling */
  .goal-item {
    border: 1px solid #d3d3d3;
    overflow: hidden; /* Prevent overflow */
  }
  
  .goal-item.selected {
    border: 1px solid #9b51e0; /* Regular purple border for sides */
    border-left-width: 5px; /* Thicker left border */
    background-color: #f9f4ff;
  }
  
  .goal-item.hovered {
    background-color: #f0f0f0; /* Light grey color on hover */
  }
  
  .goal-item.hovered.selected {
    /* Remove selection effect on hover */
    border-color: #d3d3d3;
    background-color: #f0f0f0;
  }
  
  /* Goal Title Styling */
  .goal-title {
    font-size: 19px;
    line-height: 23px;
    font-weight: 700;
    color: rgb(33, 37, 41);
  }
  
  /* Goal Description Styling */
  .goal-description {
    font-size: 16px;
    line-height: 22px;
    font-weight: 200;
    color: rgb(33, 37, 41);
  }
  
  /* Enterprise Plan Box */
  .enterprise-plan-box {
    display: inline-block;
    padding: 0px 8px;
    background-color: #fff;
    color: rgb(155, 81, 224);
    border: 1px solid rgb(155, 81, 224);
    border-radius: 4px;
    font-size: 14px;
    line-height: 22px;
    font-weight: 400;
  }
  
  /* Find out more Link */
  .find-out-more {
    font-weight: 400;
    color: #9b51e0;
    text-decoration: none;
  }
  
  .find-out-more:hover {
    color: black;
  }
  
  /* Arrow Styling */
  .find-out-more .arrow {
    margin-left: 5px;
  }
  
  /* Right Image Styling */
  .goal-image {
    display: block;
    margin: 0; /* Remove any extra spacing */
  }
  </style>
  