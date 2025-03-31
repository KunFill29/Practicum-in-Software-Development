<template>
  <div class="edit-student-form">
    <h2 class="text-primary font-weight-bold mb-4">Edit Student Info</h2>
    <form @submit.prevent="updateStudent" class="bg-white p-4 rounded-lg shadow-sm">
      <!-- Name -->
      <div class="mb-4">
        <label for="name" class="form-label font-weight-bold">Name:</label>
        <input
          v-model="editedStudent.name"
          id="name"
          type="text"
          class="form-control form-control-lg"
          required
          placeholder="Enter your name"
        />
      </div>

      <!-- Student ID -->
      <div class="mb-4">
        <label for="id" class="form-label font-weight-bold">Student ID:</label>
        <input
          v-model="editedStudent.id"
          id="id"
          type="text"
          class="form-control form-control-lg"
          required
          placeholder="Enter your student ID"
        />
      </div>

      <!-- Major -->
      <div class="mb-4">
        <label for="major" class="form-label font-weight-bold">Major:</label>
        <input
          v-model="editedStudent.major"
          id="major"
          type="text"
          class="form-control form-control-lg"
          required
          placeholder="Enter your major"
        />
      </div>

      <!-- Previous School -->
      <div class="mb-4">
        <label for="previousSchool" class="form-label font-weight-bold">Previous School:</label>
        <input
          v-model="editedStudent.previousSchool"
          id="previousSchool"
          type="text"
          class="form-control form-control-lg"
          required
          placeholder="Enter your previous school"
        />
      </div>

      <!-- Buttons -->
      <div class="d-flex justify-content-end gap-3">
        <button type="submit" class="btn btn-primary btn-lg shadow-sm">
          Update
        </button>
        <button type="button" class="btn btn-secondary btn-lg shadow-sm" @click="closeForm">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    student: {
      type: Object,
      required: true,
      validator: (value) => {
        return (
          value &&
          typeof value.name === 'string' &&
          typeof value.id === 'string' &&
          typeof value.major === 'string' &&
          typeof value.previousSchool === 'string'
        );
      },
    },
  },
  data() {
    return {
      editedStudent: { ...this.student }, // Local copy of student
    };
  },
  methods: {
    updateStudent() {
      // Emit the updated student data to the parent component
      this.$emit('update-student', this.editedStudent);
    },
    closeForm() {
      // Emit a close event to the parent component
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
/* Custom Styles */
.edit-student-form {
  max-width: 600px;
  margin: 0 auto;
}

.bg-white {
  background-color: #ffffff;
}

.rounded-lg {
  border-radius: 12px;
}

.shadow-sm {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-label {
  font-weight: 600;
  color: #333;
}

.form-control-lg {
  font-size: 1.1rem;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-control-lg:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.btn {
  min-width: 120px;
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #5a6268;
}
</style>
