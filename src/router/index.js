import { createRouter, createWebHistory } from 'vue-router';

// Import your components
import HomePage from '../view/HomePage.vue'; // Adjust path if necessary
import StudentInfo from '../components/StudentInfo.vue';
import CourseInfo from '../components/CourseInfo.vue';

// Define your routes
const routes = [
  {
    path: '/',
    name: 'Home', // Add a name for easier navigation
    component: HomePage,
  },
  {
    path: '/student-info',
    name: 'StudentInfo', // Add a name for easier navigation
    component: StudentInfo,
  },
  {
    path: '/course-info',
    name: 'CourseInfo', // Add a name for easier navigation
    component: CourseInfo,
  },
  {
    path: '/:pathMatch(.*)*', // Catch-all route for 404 errors
    redirect: '/', // Redirect to the home page or a custom 404 page
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(), // Use HTML5 history mode
  routes,
});

// Optional: Add global route guards (e.g., for authentication)
router.beforeEach((to, from, next) => {
  // Example: Check if the user is authenticated
  const isAuthenticated = /* Your authentication logic here */ true;

  if (to.name !== 'Home' && !isAuthenticated) {
    next({ name: 'Home' }); // Redirect to home if not authenticated
  } else {
    next(); // Proceed to the route
  }
});

// Export the router
export default router;
