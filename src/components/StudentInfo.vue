<template>
  <div class="student-info-container" style="background-color: rgb(96, 153, 102)">
    <h2 class="mb-4 text-center ">Student Information</h2>

    <!-- Loading State -->
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading student data...</p>
    </div>

    <!-- Student Details -->
    <div v-else class="card shadow-sm" style="background-color: rgb(157, 192, 139);">
      <div class="card-body text-center">
        <img
          :src="getImageUrl('Me2.jpg')"
          alt="Student Photo"
          class="img-fluid rounded-circle mb-4"
          style="width: 170px; height: 170px"
        />
        <h3 class="card-title">{{ student.name }}</h3>
        <p class="card-text"><strong>ID:</strong> {{ student.id }}</p>
        <p class="card-text"><strong>Major:</strong> {{ student.major }}</p>
        <p class="card-text"><strong>Previous School:</strong> {{ student.previousSchool }}</p>
        <button class="btn btn-primary btn-lg" @click="editStudent">Edit</button>
      </div>
    </div>

    <!-- Edit Student Form Modal -->
    <EditStudentForm
      v-if="isEditing"
      :student="student"
      @update-student="updateStudent"
      @close="closeEditForm"
    />
  </div>
</template>

<script>
import EditStudentForm from './EditStudentForm.vue';

export default {
  components: {
    EditStudentForm,
  },
  data() {
    return {
      student: {},
      isEditing: false,
      loading: true,
    };
  },
  mounted() {
    this.fetchStudent();
  },
  methods: {
    async fetchStudent() {
      try {
        const response = await fetch('http://localhost:3000/student');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.student = await response.json();
        this.loading = false;
      } catch (error) {
        console.error('Error fetching student:', error);
        this.loading = false;
        // Handle error appropriately, e.g., display an error message
      }
    },
    editStudent() {
      this.isEditing = true;
    },
    async updateStudent(updatedStudent) {
      try {
        const response = await fetch('http://localhost:3000/student', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedStudent),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        this.student = updatedStudent;
        this.isEditing = false;
        alert('Student information updated successfully!');
        this.fetchStudent(); // Refresh the student data
      } catch (error) {
        console.error('Error updating student:', error);
        // Handle error appropriately, e.g., display an error message
      }
    },
    closeEditForm() {
      this.isEditing = false;
    },
    getImageUrl(photo) {
      return `/images/${photo}`; // Ensure correct path to images
    },
  },
};
</script>

<style scoped>
/* Your styles here */
.student-info-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  border-radius: 8px;
  background-color: #fff;
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 15px;
}

.card-text {
  font-size: 1.1rem;
  margin-bottom: 10px;
}

button {
  font-size: 1.1rem;
  padding: 10px 20px;
  border-radius: 5px;
  min-width: 120px;
}

button:hover {
  background-color: #0069d9;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

img {
  border-radius: 50%;
}

@media (max-width: 768px) {
  .card-body {
    padding: 15px;
  }

  .card-title {
    font-size: 1.5rem;
  }

  .card-text {
    font-size: 1rem;
  }

  button {
    font-size: 1rem;
    padding: 8px 16px;
  }
}
</style>
