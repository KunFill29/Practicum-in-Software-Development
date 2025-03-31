<template>
  <div id="app">
    <!-- Optional: Global header or navigation bar -->
    <header>
      <h1>Student Information App</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/student-info">Student Info</router-link>
        <router-link to="/course-info">Course Info</router-link>
      </nav>
    </header>

    <!-- The main content area that renders routed components -->
    <main>
      <router-view></router-view> <!-- Renders the component based on the current route -->
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  padding: 20px;
}

header {
  background-color: #42b983;
  color: white;
  padding: 10px;
}

nav {
  margin-top: 20px;
}

nav a {
  margin: 0 15px;
  text-decoration: none;
  color: white;
}

nav a:hover {
  text-decoration: underline;
}

main {
  margin-top: 40px;
}
</style>
