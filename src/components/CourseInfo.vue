<template>
  <div class="container mt-5" >
    <h2 class=" font-weight-bold mb-4 text-center">Course Information</h2>

    <!-- Add Course Form -->
    <div v-if="isAdding" class="mb-4 p-4 rounded shadow-sm" style="background-color: rgb(96, 153, 102)" >
      <h3 class="text-danger font-weight-bold mb-3">Add New Course</h3>
      <form @submit.prevent="addCourse">
        <div class="mb-3">
          <label for="newCourseCode" class="form-label">Course Code:</label>
          <input
            v-model="newCourse.code"
            type="text"
            class="form-control"
            id="newCourseCode"
            required
          />
        </div>
        <div class="mb-3">
          <label for="newCourseName" class="form-label">Course Name:</label>
          <input
            v-model="newCourse.name"
            type="text"
            class="form-control"
            id="newCourseName"
            required
          />
        </div>
        <div class="mb-3">
          <label for="newCredits" class="form-label">Credits:</label>
          <input
            v-model="newCourse.credits"
            type="number"
            class="form-control"
            id="newCredits"
            required
          />
        </div>
        <div class="mb-3">
          <label for="newGrade" class="form-label">Grade:</label>
          <input
            v-model="newCourse.grade"
            type="text"
            class="form-control"
            id="newGrade"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary me-2">Add Course</button>
        <button type="button" class="btn btn-secondary" @click="closeAddForm">Cancel</button>
      </form>
    </div>

    <!-- Edit Course Form -->
    <div v-if="isEditing" class="mb-4 p-4 rounded shadow-sm" style="background-color: rgb(96, 153, 102);">
      <h3 class="text-danger font-weight-bold mb-3">Edit Course</h3>
      <form @submit.prevent="handleUpdateCourse">
        <div class="mb-3">
          <label for="editCourseCode" class="form-label">Course Code:</label>
          <input
            v-model="selectedCourse.code"
            type="text"
            class="form-control"
            id="editCourseCode"
            required
          />
        </div>
        <div class="mb-3">
          <label for="editCourseName" class="form-label">Course Name:</label>
          <input
            v-model="selectedCourse.name"
            type="text"
            class="form-control"
            id="editCourseName"
            required
          />
        </div>
        <div class="mb-3">
          <label for="editCredits" class="form-label">Credits:</label>
          <input
            v-model="selectedCourse.credits"
            type="number"
            class="form-control"
            id="editCredits"
            required
          />
        </div>
        <div class="mb-3">
          <label for="editGrade" class="form-label">Grade:</label>
          <input
            v-model="selectedCourse.grade"
            type="text"
            class="form-control"
            id="editGrade"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary me-2">Update Course</button>
        <button type="button" class="btn btn-secondary" @click="closeEditForm">Cancel</button>
      </form>
    </div>

    <!-- Buttons for Adding and Refreshing -->
    <div class="mb-4 text-center">
      <button class="btn btn-primary me-2" @click="openAddForm" v-if="!isAdding">Add Course</button>
      <button class="btn btn-warning" @click="fetchCourses">Refresh Courses</button>
    </div>

    <!-- Courses Table -->
    <div class="card border-0 shadow-sm" >
      <div class="card-body p-0" >
        <table class="table table-hover mb-0" >
          <thead class="text-white" style="background-color: rgb(96, 153, 102);">
            <tr>
              <th scope="col">Course Code</th>
              <th scope="col">Course Name</th>
              <th scope="col">Credits</th>
              <th scope="col">Grade</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="course in courses" :key="course.id" class="transition-all">
              <td>{{ course.code }}</td>
              <td>{{ course.name }}</td>
              <td>{{ course.credits }}</td>
              <td>{{ course.grade }}</td>
              <td>
                <button class="btn btn-sm btn-outline-primary me-2" @click="openEditForm(course)">
                  Edit
                </button>
                <button class="btn btn-sm btn-outline-danger" @click="deleteCourse(course.id)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courses: [],
      isAdding: false,
      newCourse: {
        code: '',
        name: '',
        credits: '',
        grade: '',
      },
      isEditing: false,
      selectedCourse: {
        code: '',
        name: '',
        credits: '',
        grade: '',
      },
    }
  },
  mounted() {
    this.fetchCourses()
  },
  methods: {
    async fetchCourses() {
      try {
        const response = await fetch('http://localhost:3000/courses')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        this.courses = await response.json()
      } catch (error) {
        console.error('Error fetching courses:', error)
        alert('Failed to load courses. Check console for details.')
        this.courses = []
      }
    },
    openAddForm() {
      this.isAdding = true
    },
    closeAddForm() {
      this.isAdding = false
      this.newCourse = {
        code: '',
        name: '',
        credits: '',
        grade: '',
      }
    },
    async addCourse() {
      try {
        const response = await fetch('http://localhost:3000/courses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.newCourse),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        this.closeAddForm()
        this.fetchCourses()
        alert('Course added successfully!')
      } catch (error) {
        console.error('Could not add course:', error)
        alert('Failed to add course. Check console for details.')
      }
    },
    async deleteCourse(courseId) {
      try {
        const response = await fetch(`http://localhost:3000/courses/${courseId}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        this.fetchCourses()
        alert('Course deleted successfully!')
      } catch (error) {
        console.error('Could not delete course:', error)
        alert('Failed to delete course. Check console for details.')
      }
    },
    openEditForm(course) {
      this.isEditing = true
      this.selectedCourse = { ...course }
    },
    closeEditForm() {
      this.isEditing = false
      this.selectedCourse = {
        code: '',
        name: '',
        credits: '',
        grade: '',
      }
    },
    async handleUpdateCourse() {
      try {
        const response = await fetch(`http://localhost:3000/courses/${this.selectedCourse.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.selectedCourse),
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        this.fetchCourses()
        this.closeEditForm()
        alert('Course updated successfully!')
      } catch (error) {
        console.error('Could not update course:', error)
        alert('Failed to update course. Check console for details.')
      }
    },
  },
}
</script>
<style scoped>
.container {
  max-width: 1200px;
  
}

.card {
  border-radius: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.table thead {
  background-color: #007bff;
}

.table th,
.table td {
  padding: 12px;
  text-align: center;
}

.table td {
  font-size: 0.9rem;
}

.btn-outline-primary {
  border-color: #007bff;
  color: #007bff;
}

.btn-outline-primary:hover {
  background-color: #007bff;
  color: #ffffff;
}

.btn-outline-danger {
  border-color: #dc3545;
  color: #dc3545;
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  color: #ffffff;
}

.form-label {
  font-weight: 600;
}
.form-control {
  max-width: 350px; /* Limit input field width */
  margin: 0 auto; /* Center input fields */
}
</style>