/**
 * Mobile Navigation Toggle
 * Handles opening/closing the mobile navigation menu with accessibility support
 */

;(() => {
  // Get DOM elements
  const navToggle = document.querySelector(".nav-toggle")
  const mainNav = document.querySelector(".main-nav")
  const navLinks = document.querySelectorAll(".nav-list a")

  // Check if elements exist
  if (!navToggle || !mainNav) {
    console.warn("Navigation elements not found")
    return
  }

  /**
   * Toggle navigation menu open/closed
   */
  function toggleNav() {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true"

    // Toggle aria-expanded attribute
    navToggle.setAttribute("aria-expanded", !isOpen)

    // Toggle is-open class on nav
    mainNav.classList.toggle("is-open")

    // Focus management: focus first link when opening
    if (!isOpen && navLinks.length > 0) {
      navLinks[0].focus()
    }
  }

  /**
   * Close navigation menu
   */
  function closeNav() {
    navToggle.setAttribute("aria-expanded", "false")
    mainNav.classList.remove("is-open")
  }

  /**
   * Handle escape key to close menu
   */
  function handleEscape(event) {
    if (event.key === "Escape") {
      closeNav()
      navToggle.focus()
    }
  }

  /**
   * Close menu when clicking outside
   */
  function handleClickOutside(event) {
    const isClickInsideNav = mainNav.contains(event.target)
    const isClickOnToggle = navToggle.contains(event.target)

    if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains("is-open")) {
      closeNav()
    }
  }

  /**
   * Close menu when a nav link is clicked
   */
  function handleNavLinkClick() {
    closeNav()
  }

  // Event listeners
  navToggle.addEventListener("click", toggleNav)
  document.addEventListener("keydown", handleEscape)
  document.addEventListener("click", handleClickOutside)

  // Close menu when clicking nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", handleNavLinkClick)
  })

  /**
   * Smooth scroll for anchor links
   */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      const href = this.getAttribute("href")

      // Skip if href is just "#"
      if (href === "#") {
        event.preventDefault()
        return
      }

      const target = document.querySelector(href)

      if (target) {
        event.preventDefault()

        // Smooth scroll to target
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })

        // Update URL without jumping
        history.pushState(null, null, href)
      }
    })
  })

  console.log("[v0] Coffee shop navigation initialized")
})()
