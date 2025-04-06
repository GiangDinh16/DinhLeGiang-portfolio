function changeTab(event, targetId) {
  // Get the closest .tabs parent of the clicked tab
  let parentTabs = event.target.closest(".tabs.desktop")

  // Ensure we're only targeting desktop tabs
  if (!parentTabs) return

  // Remove 'active' class from all tabs within .tabs.desktop
  parentTabs
    .querySelectorAll(".tab")
    .forEach((tab) => tab.classList.remove("active"))
  event.currentTarget.classList.add("active")

  // Hide all content within the .tab-content.desktop container
  let desktopContent = document.querySelector(".tab-content.desktop")
  desktopContent
    .querySelectorAll(".content")
    .forEach((content) => content.classList.remove("active"))

  // Show the corresponding content
  document.getElementById(targetId).classList.add("active")
}

function downloadCV() {
  const link = document.createElement("a")
  link.href = "./assests/images/cv.png" // Ensure this path is correct
  link.download = "CV_DinhLeDinh.png" // Set the downloaded file name
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function toggleMenu() {
  const mobileNav = document.getElementById("nav-menu")
  const desktopMenu = document.getElementById("desktop-menu").cloneNode(true)
  const body = document.body // Reference to the body element

  // Check whether the mobile nav has the desktop menu or not
  if (!mobileNav.hasChildNodes(desktopMenu)) {
    mobileNav.appendChild(desktopMenu)
  }

  // Toggle the visibility
  mobileNav.classList.toggle("open")

  // Toggle scroll prevention on the body
  if (mobileNav.classList.contains("open")) {
    body.classList.add("no-scroll")
  } else {
    body.classList.remove("no-scroll")
  }

  // Close menu when clicking a link inside it
  desktopMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open")
      body.classList.remove("no-scroll") // Re-enable scrolling when menu is closed
    })
  })
}

// Remove `no-scroll` when switching to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    document.body.classList.remove("no-scroll")
    document.getElementById("nav-menu").classList.remove("open")
  }
})

// Animations
document.querySelectorAll(".ml2").forEach((textWrapper) => {
  function wrapLetters(node) {
    if (node.nodeType === 3) {
      return node.nodeValue.replace(/\S/g, "<span class='letter'>$&</span>")
    } else if (node.nodeType === 1) {
      return node.outerHTML.replace(
        node.innerHTML,
        [...node.childNodes].map(wrapLetters).join("")
      )
    }
    return ""
  }

  textWrapper.innerHTML = [...textWrapper.childNodes].map(wrapLetters).join("")

  // Observer to detect when element is in viewport
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime.timeline().add({
            targets: entry.target.querySelectorAll(".letter"),
            scale: [4, 1],
            opacity: [0, 1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 950,
            delay: (el, i) => 70 * i,
          })

          observer.unobserve(entry.target) // Stop observing after animation runs once
        }
      })
    },
    { threshold: 0.3 } // Trigger when 30% of the element is visible
  )

  observer.observe(textWrapper)
})

AOS.init({
  once: true,
  duration: 1000,
})
