<template>
  <div class="edit-course-container">
    <h2 class="text-center text-primary mb-4">Edit Course Information</h2>
    <form @submit.prevent="updateCourse" class="edit-course-form">
      <!-- Course Code -->
      <div class="mb-4">
        <label for="courseCode" class="form-label">Course Code:</label>
        <input
          v-model="editedCourse.code"
          id="courseCode"
          type="text"
          class="form-control"
          required
          placeholder="Enter course code"
        />
      </div>

      <!-- Course Name -->
      <div class="mb-4">
        <label for="courseName" class="form-label">Course Name:</label>
        <input
          v-model="editedCourse.name"
          id="courseName"
          type="text"
          class="form-control"
          required
          placeholder="Enter course name"
        />
      </div>

      <!-- Credits -->
      <div class="mb-4">
        <label for="credits" class="form-label">Credits:</label>
        <input
          v-model="editedCourse.credits"
          id="credits"
          type="number"
          class="form-control"
          required
          placeholder="Enter credits"
          min="0"
          max="10"
        />
      </div>

      <!-- Grade -->
      <div class="mb-4">
        <label for="grade" class="form-label">Grade:</label>
        <select v-model="editedCourse.grade" id="grade" class="form-control" required>
          <option value="A">A</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="C+">C+</option>
          <option value="C">C</option>
          <option value="D+">D+</option>
          <option value="D">D</option>
          <option value="F">F</option>
        </select>
      </div>

      <!-- Buttons -->
      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-primary btn-lg">Update</button>
        <button type="button" class="btn btn-secondary btn-lg" @click="closeForm">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      required: true,
      validator: (value) => {
        return (
          value &&
          typeof value.code === 'string' &&
          typeof value.name === 'string' &&
          typeof value.credits === 'number' &&
          typeof value.grade === 'string'
        );
      },
    },
  },
  data() {
    return {
      editedCourse: { ...this.course },
    };
  },
  methods: {
    updateCourse() {
      this.$emit('update-course', this.editedCourse);
    },
    closeForm() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.edit-course-container {
  max-width: 700px;
  margin: 30px auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.edit-course-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-label {
  font-weight: 700;
  color: #495057;
}

.form-control {
  padding: 12px;
  border-radius: 10px;
  font-size: 1rem;
}

select.form-control {
  background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 5"><path fill="currentColor" d="M2 0L0 2h4zm0 5L0 3h4z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 8px 10px;
  padding-right: 2.5rem;
}

.btn {
  min-width: 130px;
  padding: 14px 22px;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: 600;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.2);
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
  color: #fff;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #545b62;
}
</style>