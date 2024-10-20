document.addEventListener("DOMContentLoaded", function () {
  const events = [
    {
      name: "Cloud Innovation Summit",
      date: "2024-10-15",
      speaker: "Jane Doe",
      status: "Completed",
    },
    {
      name: "Blockchain Revolution Conference",
      date: "2024-11-05",
      speaker: "Dr. Peter Smith",
      status: "In Progress",
    },
    {
      name: "AI in Healthcare Symposium",
      date: "2024-12-01",
      speaker: "Dr. Aisha Malik",
      status: "Completed",
    },
    {
      name: "Future of Fintech Forum",
      date: "2024-10-25",
      speaker: "John Lee",
      status: "Completed",
    },
    {
      name: "Data Analytics in Business",
      date: "2024-11-12",
      speaker: "Rachel Moore",
      status: "Completed",
    },
    {
      name: "Sustainable Energy Expo",
      date: "2024-09-28",
      speaker: "Prof. Alan Green",
      status: "Completed",
    },
    {
      name: "Web3 Interfaces Workshop",
      date: "2024-10-10",
      speaker: "Kevin Adams",
      status: "In Progress",
    },
    {
      name: "Cybersecurity for Startups",
      date: "2024-11-19",
      speaker: "Emily Zhang",
      status: "Completed",
    },
    {
      name: "Smart Cities Forum",
      date: "2024-10-18",
      speaker: "Dr. Maria Hernandez",
      status: "In Progress",
    },
    {
      name: "Tech Safari Mixer",
      date: "2024-09-30",
      speaker: "Guest Panel",
      status: "In Progress",
    },
  ];

  const rowsPerPageSelect = document.getElementById("rowsPerPage");
  const tbody = document.querySelector("#eventTable tbody");
  const pagination = document.querySelector(".pagination");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const pageNumbers = document.getElementById("pageNumbers");
  const toggleModeBtn = document.getElementById("toggleModeBtn"); // Toggle Button

  let currentPage = 1;
  let rowsPerPage = parseInt(rowsPerPageSelect.value);

  // Display table data with pagination
  function displayTable(page, rowsPerPage) {
    tbody.innerHTML = "";
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = events.slice(start, end);

    paginatedItems.forEach((event) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${event.name}</td>
        <td>${event.date}</td>
        <td>${event.speaker}</td>
        <td>
          <span class="status ${event.status === "Completed" ? "completed" : "in-progress"}">
            ${event.status === "Completed" ? '<span class="dot completed-dot"></span>' : ""}
            ${event.status === "In Progress" ? '<span class="dot in-progress-dot"></span>' : ""}
            ${event.status}
          </span>
        </td>`;
      tbody.appendChild(row);
    });
    updatePagination();
  }

  // Update pagination buttons
  function updatePagination() {
    const totalPages = Math.ceil(events.length / rowsPerPage);
    pageNumbers.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.textContent = i;
      if (i === currentPage) {
        pageBtn.classList.add("active");
      }
      pageBtn.addEventListener("click", () => {
        currentPage = i;
        displayTable(currentPage, rowsPerPage);
      });
      pageNumbers.appendChild(pageBtn);
    }

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }

  // Change rows per page
  rowsPerPageSelect.addEventListener("change", function () {
    rowsPerPage = parseInt(this.value);
    currentPage = 1;
    displayTable(currentPage, rowsPerPage);
  });

  // Previous page
  prevBtn.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      displayTable(currentPage, rowsPerPage);
    }
  });

  // Next page
  nextBtn.addEventListener("click", function () {
    const totalPages = Math.ceil(events.length / rowsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      displayTable(currentPage, rowsPerPage);
    }
  });

  // Sidebar toggle functionality
 /* document.getElementById('toggleSidebar').addEventListener('click', function () {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed'); // Toggle 'collapsed' class
  });*/

  // Export CSV file
  document.getElementById("exportBtn").addEventListener("click", function () {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Event Name,Date,Speaker,Status\n";
    events.forEach((event) => {
      csvContent += `${event.name},${event.date},${event.speaker},${event.status}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "events.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // Toggle dark/light mode
  toggleModeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  });

  // Chart.js configuration
  const ctx = document.getElementById("eventChart").getContext("2d");
  const eventChart = new Chart(ctx, {
    type: "bar", // Set chart type to bar
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ], // Month labels
      datasets: [
        {
          label: "Event Values", // Label for the dataset
          data: [
            0, 600, 200, 700, 600, 900, 800, 820, 1000, 870, 900, 950, 1000,
          ], // Example values for each month
          backgroundColor: "#8576FF", // Solid background using the primary color
          borderColor: "#8576FF",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Adjusts the chart size responsively
      scales: {
        y: {
          beginAtZero: true, // Start y-axis from 0
          title: {
            display: true,
            text: "Values", // Y-axis title
          },
        },
        x: {
          title: {
            display: true,
            text: "Months", // X-axis title
          },
        },
      },
      plugins: {
        legend: {
          display: true, // Show the legend
          position: "top", // Position of the legend
        },
        tooltip: {
          backgroundColor: "rgba(133, 118, 255, 0.9)", // Tooltip background color
          titleColor: "#fff", // Tooltip title color
          bodyColor: "#fff", // Tooltip body color
        },
      },
    },
  });

  // Initial table display
  displayTable(currentPage, rowsPerPage);
});
