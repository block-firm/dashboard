// const gridContainer = document.querySelector(".grid-container");
// const sidebar = document.getElementById("sidebar");

// sidebar.addEventListener("click", () => {
//         gridContainer.classList.toggle("collapse")
//     });

let sidebarOpen = false;
let sidebar = document.getElementById("sidebar");

function openSidebar() {
    if(!sidebarOpen) {
        sidebar.classList.add("sidebar-responsive");
        sidebarOpen = true;
    }
}

function closeSidebar() {
    if(sidebarOpen) {
        sidebar.classList.remove("sidebar-responsive");
        sidebarOpen = false;
    }
}

// Search Bar

document.querySelector('.search-icon').addEventListener('click', () => {
  const searchBar = document.getElementById('search-bar');
  searchBar.classList.toggle('visible');
  searchBar.focus();
});

function performSearch(event) {
  event.preventDefault(); // Prevent form submission
  const query = document.getElementById('search-bar').value.trim();

  clearHighlights();

  if (query) {
      console.log(`Searching for: ${query}`); 
      highlightText(query);
  } else {
      alert('Please enter a search term.');
  }
}

function highlightText(query) {
  const body = document.body;
  const regex = new RegExp(`(${query})`, 'gi'); // Case-insensitive regex for the query

  // Use a recursive function to process all text nodes
  processTextNodes(body, regex);
}

function processTextNodes(element, regex) {
  for (const node of element.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
          // Replace matches in text nodes
          const parent = node.parentNode;
          const text = node.textContent;

          // Only process if there's a match
          if (regex.test(text)) {
              const highlightedHTML = text.replace(regex, '<span class="highlight">$1</span>');
              const tempContainer = document.createElement('div');
              tempContainer.innerHTML = highlightedHTML;

              // Replace text node with its highlighted HTML
              while (tempContainer.firstChild) {
                  parent.insertBefore(tempContainer.firstChild, node);
              }
              parent.removeChild(node); // Remove the original text node
          }
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
          // Recursively process child nodes, skipping <script> and <style> tags
          processTextNodes(node, regex);
      }
  }
}

function clearHighlights() {
  const highlightedElements = document.querySelectorAll('.highlight');
  highlightedElements.forEach((element) => {
      const parent = element.parentNode;
      parent.replaceChild(document.createTextNode(element.textContent), element);
  });
}

function toggleSearch() {
  const searchBar = document.getElementById('search-bar');
  if (searchBar.style.display === 'none' || searchBar.style.display === '') {
      searchBar.style.display = 'block';
      searchBar.focus();
  } else {
      searchBar.style.display = 'none';
      clearHighlights();
  }
}

// ---------- CHARTS ----------

// BAR CHART

const barChartOptions = {
    series: [
      {
        data: [165, 42, 29],
        name: 'Interactions',
      },
    ],
    chart: {
      type: 'bar',
      background: 'transparent',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    colors: ['#2962ff', '#d50000', '#2e7d32'],
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 4,
        horizontal: false,
        columnWidth: '40%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    grid: {
      borderColor: '#55596e',
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
        markers: {
            fillColors: ['#2962ff', '#d50000', '#2e7d32'], // Sync legend colors with bar colors
          },
        labels: {
        colors: '#f5f7ff',
      },
      show: true,
      position: 'top',
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2,
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: 'dark',
    },
    xaxis: {
      categories: ['Burbank', 'Westlake Village', 'Sun Valley'],
      title: {
        style: {
          color: '#f5f7ff',
        },
      },
      axisBorder: {
        show: true,
        color: '#55596e',
      },
      axisTicks: {
        show: true,
        color: '#55596e',
      },
      labels: {
        style: {
          colors: '#f5f7ff',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Count',
        style: {
          color: '#f5f7ff',
        },
      },
      axisBorder: {
        color: '#55596e',
        show: true,
      },
      axisTicks: {
        color: '#55596e',
        show: true,
      },
      labels: {
        style: {
          colors: '#f5f7ff',
        },
      },
    },
  };
  
  const barChart = new ApexCharts(
    document.querySelector('#bar-chart'),
    barChartOptions
  );
  barChart.render();
  