<template>
  <nav
    class="navbar has-shadow is-spaced"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href>
          <img
            src="../assets/bogenkino_logo_full.png"
            width="117"
            height="28"
          />
        </a>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navBarLinks"
          @click="toggleBurgerMenuState"
          :class="{ 'is-active': isBurgerMenuExpanded }"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navBarLinks"
        class="navbar-menu"
        :class="{ 'is-active': isBurgerMenuExpanded }"
      >
        <div class="navbar-start">
          <a class="navbar-item">Home</a>
          <a class="navbar-item">Anleitung</a>
          <a class="navbar-item">Impressum</a>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <a href class="navbar-item">⌨️ Github</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isBurgerMenuExpanded: false
    };
  },
  methods: {
    toggleBurgerMenuState() {
      this.isBurgerMenuExpanded = !this.isBurgerMenuExpanded;
    }
  }
};
</script>

<style lang="scss" scoped></style>
