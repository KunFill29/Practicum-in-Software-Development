<template>
  <div class="container mt-5">
    <!-- Header -->
    <header class="bg-gradient-primary text-white text-center py-5 mb-5 rounded-lg shadow">
      <h1 class="display-4 font-weight-bold">Welcome to the Student Information App</h1>
      <p class="lead">This app helps you manage and view student and course information with ease.</p>
    </header>

    <!-- Student Information Section -->
    <section v-if="student" class="card mb-5 border-0 shadow-lg rounded-lg">
      <div class="card-body p-5">
        <h2 class="card-title mb-4 text-primary font-weight-bold">Your Information</h2>
        <div class="row align-items-center">
          <div class="col-md-4 text-center">
            <!-- First Image (Me.jpg) -->
            <img
              :src="getImageUrl('Me.jpg')"
              alt="Student Photo 1"
              class="img-fluid rounded-circle mb-4 shadow-lg"
              style="width: 180px; height: 180px; object-fit: cover; border: 5px solid #fff;"
            />
            <!-- Second Image (Me2.jpg) -->
            <img
              :src="getImageUrl('Me2.jpg')"
              alt="Student Photo 2"
              class="img-fluid rounded-circle mb-4 shadow-lg"
              style="width: 180px; height: 180px; object-fit: cover; border: 5px solid #fff;"
            />
          </div>
          <div class="col-md-8">
            <div class="student-info">
              <p class="mb-3"><strong>Name:</strong> {{ student.name }}</p>
              <p class="mb-3"><strong>ID:</strong> {{ student.id }}</p>
              <p class="mb-3"><strong>Major:</strong> {{ student.major }}</p>
              <p class="mb-3"><strong>Previous School:</strong> {{ student.previousSchool }}</p>
              <button class="btn btn-primary btn-lg mt-3 shadow-sm" @click="goToStudentInfo">
                Edit Your Information
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Navigation Section -->
    <section class="card border-0 shadow-lg rounded-lg">
      <div class="card-body p-5">
        <h3 class="card-title mb-4 text-primary font-weight-bold">What would you like to do next?</h3>
        <div class="d-flex justify-content-center">
          <router-link to="/student-info" class="btn btn-success btn-lg me-3 shadow-lg">
            Go to Student Info
          </router-link>
          <router-link to="/course-info" class="btn btn-info btn-lg shadow-lg">
            Go to Course Info
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import db from '@/data/db.json';

export default {
  name: 'HomePage',
  data() {
    return {
      student: {},
    };
  },
  mounted() {
    this.fetchStudent();
  },
  methods: {
    fetchStudent() {
      // Try to load from local storage first
      const savedStudent = localStorage.getItem('student');
      if (savedStudent) {
        this.student = JSON.parse(savedStudent);
      } else {
        this.student = db.student; // Fallback to db.json
      }
    },
    goToStudentInfo() {
      this.$router.push('/student-info');
    },
    getImageUrl(photo) {
      // Return the full path to the image file
      return photo ? `/images/${photo}` : '/images/placeholder.jpg';
    },
  },
};
</script>

<style scoped>
/* Custom Styles */
.bg-gradient-primary {
  background: linear-gradient(135deg, #007bff, #0056b3);
}

.card {
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.student-info p {
  font-size: 1.1rem;
  line-height: 1.6;
}

.btn {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  padding: 12px 24px;
  font-size: 1.1rem;
  border-radius: 6px;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.shadow {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.text-primary {
  color: #007bff !important;
}

.font-weight-bold {
  font-weight: 700;
}

.rounded-lg {
  border-radius: 12px;
}

.card-body {
  background-color: #f9f9f9;
}

img.shadow-lg {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-info {
  background-color: #17a2b8;
  border-color: #17a2b8;
}
</style>
