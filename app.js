const products = [
  {
    id: 1,
    title: "Chemistry textbook, edition 8",
    category: "textbooks",
    price: "₦35,000",
    description: "Used but in excellent condition. Includes practice questions, notes, and highlighted chapters.",
    location: "Main Library",
    type: "item"
  },
  {
    id: 2,
    title: "Bluetooth speaker",
    category: "electronics",
    price: "₦22,500",
    description: "Portable sound system with deep bass and full battery. Great for hostel rooms and study sessions.",
    location: "Student Center",
    type: "item"
  },
  {
    id: 3,
    title: "Study desk lamp",
    category: "essentials",
    price: "₦10,500",
    description: "LED lamp with adjustable head and warm lighting. Works for late-night reading and assignments.",
    location: "Hall 2",
    type: "item"
  },
  {
    id: 4,
    title: "Mini bookshelf",
    category: "furniture",
    price: "₦48,000",
    description: "Compact and sturdy shelving unit for books, decor, and dorm accessories.",
    location: "Agodi Estate",
    type: "item"
  }
];

const jobs = [
  {
    id: 101,
    title: "Move-in day helper",
    category: "jobs",
    price: "₦8,000/hr",
    description: "Need 2 students to help carry boxes, move furniture, and organize rooms during orientation week.",
    location: "Hostel Complex",
    type: "job"
  },
  {
    id: 102,
    title: "Campus poster removal",
    category: "jobs",
    price: "₦6,500/hr",
    description: "Simple outdoor cleanup task: remove old posters and tidy noticeboard spaces across campus.",
    location: "Campus Gate",
    type: "job"
  },
  {
    id: 103,
    title: "Dog walking assistant",
    category: "jobs",
    price: "₦7,500/hr",
    description: "Looking for a reliable student to walk a dog after classes and feed it in the evening.",
    location: "Lekki",
    type: "job"
  }
];

const productListEl = document.getElementById("productList");
const jobListEl = document.getElementById("jobList");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-chip");
const listingForm = document.getElementById("listingForm");
const listingType = document.getElementById("listingType");
const category = document.getElementById("category");

let activeFilter = "all";

function renderProducts() {
  const term = searchInput.value.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesFilter = activeFilter === "all" || product.category === activeFilter;
    const matchesSearch =
      !term ||
      product.title.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.location.toLowerCase().includes(term);

    return matchesFilter && matchesSearch;
  });

  if (!filteredProducts.length) {
    productListEl.innerHTML = '<div class="listing-card"><h3>No matching listings</h3><p>Try another keyword or category.</p></div>';
    return;
  }

  productListEl.innerHTML = filteredProducts
    .map(
      (product) => `
        <article class="listing-card">
          <div class="meta-row">
            <span class="category-pill">${capitalize(product.category)}</span>
            <span class="price-tag">${product.price}</span>
          </div>
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <div class="card-footer">
            <span>${product.location}</span>
            <button type="button">Message</button>
          </div>
        </article>
      `
    )
    .join("");
}

function renderJobs() {
  const term = searchInput.value.trim().toLowerCase();

  const filteredJobs = jobs.filter((job) => {
    const matchesFilter = activeFilter === "all" || activeFilter === "jobs" || job.category === activeFilter;
    const matchesSearch =
      !term ||
      job.title.toLowerCase().includes(term) ||
      job.description.toLowerCase().includes(term) ||
      job.location.toLowerCase().includes(term);

    return matchesFilter && matchesSearch;
  });

  if (!filteredJobs.length) {
    jobListEl.innerHTML = '<div class="listing-card"><h3>No matching jobs</h3><p>Try another search or post a new request.</p></div>';
    return;
  }

  jobListEl.innerHTML = filteredJobs
    .map(
      (job) => `
        <article class="listing-card">
          <div class="meta-row">
            <span class="category-pill">${capitalize(job.category)}</span>
            <span class="price-tag">${job.price}</span>
          </div>
          <h3>${job.title}</h3>
          <p>${job.description}</p>
          <div class="card-footer">
            <span>${job.location}</span>
            <button type="button">Apply</button>
          </div>
        </article>
      `
    )
    .join("");
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((chip) => chip.classList.toggle("active", chip === button));
    renderProducts();
    renderJobs();
  });
});

searchInput.addEventListener("input", () => {
  renderProducts();
  renderJobs();
});

listingType.addEventListener("change", () => {
  const type = listingType.value;
  if (type === "job") {
    category.value = "jobs";
  }
});

listingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const price = document.getElementById("price").value.trim();
  const selectedType = listingType.value;
  const selectedCategory = category.value;

  const newEntry = {
    id: Date.now(),
    title,
    category: selectedCategory,
    price,
    description,
    location: "Your campus",
    type: selectedType
  };

  if (selectedType === "job") {
    jobs.unshift(newEntry);
  } else {
    products.unshift(newEntry);
  }

  listingForm.reset();
  category.value = "textbooks";
  listingType.value = "item";

  renderProducts();
  renderJobs();
});

renderProducts();
renderJobs();
