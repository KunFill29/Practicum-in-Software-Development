<template>
  <div class="container mt-5">
    <!-- Header -->
    <header class="bg-gradient-primary text-white text-center py-5 mb-5 rounded-lg shadow">
      <h1 class="display-4 font-weight-bold">Welcome to the Student Information App</h1>
      <p class="lead">Manage and view student and course information with ease.</p>
    </header>

    <!-- Student Information Section -->
    <section v-if="student" class="card mb-5 border-0 shadow-lg rounded-lg">
      <div class="card-body p-5">
        <h2 class="card-title mb-5 text-primary font-weight-bold">My Information</h2>
        <div class="row">
          <div class="col-md-6 text-center">
            <div class="image-grid">
              <img :src="getImageUrl('Me1.jpeg')" alt="Student Photo 1" class="student-img" />
              <img :src="getImageUrl('Me2.jpg')" alt="Student Photo 2" class="student-img" />
              <img :src="getImageUrl('Me3.jpg')" alt="Student Photo 3" class="student-img" />
              <img :src="getImageUrl('Me4.jpg')" alt="Student Photo 4" class="student-img" />
            </div>
          </div>
          <div class="col-md-6 mt-5">
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

    <!-- Certificates Section -->
    <section class="card mb-5 border-0 shadow-lg rounded-lg">
      <div class="card-body p-5 text-center">
        <h3 class="card-title mb-4 text-primary font-weight-bold">My Certificates</h3>
        <div class="image-grid">
          <img :src="getImageUrl('cer2.jpg')" alt="Certificate 2" class="certificate-img" />
          <img :src="getImageUrl('cer1.jpg')" alt="Certificate 1" class="certificate-img" />
          <img :src="getImageUrl('cer3.jpg')" alt="Certificate 3" class="certificate-img" />
          <img :src="getImageUrl('cer4.jpg')" alt="Certificate 4" class="certificate-img" />
          <img :src="getImageUrl('cer5.jpg')" alt="Certificate 4" class="certificate-img" />
        </div>
      </div>
    </section>

    <!-- Navigation Section -->
    <section class="card border-0 shadow-lg rounded-lg">
      <div class="card-body p-5 text-center">
        <h3 class="card-title mb-4 text-primary font-weight-bold">What would you like to do next?</h3>
        <router-link to="/student-info" class="btn btn-success btn-lg me-3 shadow-lg">
          Go to Student Info
        </router-link>
        <router-link to="/course-info" class="btn btn-info btn-lg shadow-lg">
          Go to Course Info
        </router-link>
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
      const savedStudent = localStorage.getItem('student');
      this.student = savedStudent ? JSON.parse(savedStudent) : db.student;
    },
    goToStudentInfo() {
      this.$router.push('/student-info');
    },
    getImageUrl(photo) {
      return `/images/${photo}`;
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

.image-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two images per row */
  gap: 20px; /* Space between images */
  justify-content: center; /* Center alignment */
}

.student-grid {
  grid-template-columns: repeat(2, 1fr);
}

.certificate-grid {
  grid-template-columns: repeat(2, 1fr);
}

.student-img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: 3px solid #fff;
}

.certificate-img {
  width: 100%;
  max-width: 800px;
  height: auto;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: 3px solid #fff;
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
</style>
