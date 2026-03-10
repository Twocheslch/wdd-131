const hikes = [
  {
    name: "Bechler Falls",
    stub: "bechler_falls",
    imgSrc: "https://www.nps.gov/features/yell/slidefile/water/falls/bechler/Images/10660.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    tags: ["Caves", "Yellowstone", "Waterfall"],
    difficulty: 1,
    description:
      "Beautiful short hike in Yellowstone along the Bechler river to Bechler Falls",
    directions:
      "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead.",
    trailhead: [44.14457, -110.99781]
  },
  {
    name: "Teton Canyon",
    stub: "teton_canyon",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Teton_Canyon_Caribou-Targhee_NF_Tyler_Johnson_%2811715225404%29.jpg",
    imgAlt: "Image of Teton Canyon",
    distance: "3 miles",
    tags: ["Canyon", "Tetons"],
    difficulty: 1,
    description: "Beautiful short (or long) hike through Teton Canyon.",
    directions:
      "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead.",
    trailhead: [43.75567, -110.91521]
  },
  {
    name: "Denanda Falls",
    stub: "denanda_falls",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/d/db/Dunanda_Falls.JPG",
    imgAlt: "Image of Denanda Falls",
    distance: "7 miles",
    tags: ["Caves", "Yellowstone", "Waterfall"],
    difficulty: 3,
    description: "Beautiful hike through Bechler meadows to Denanda Falls",
    directions:
      "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead.",
    trailhead: [44.14974, -111.04564]
  },
  {
    name: "Coffee Pot Rapids",
    stub: "coffee_pot",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/8/80/Kayakcoffeepotrapids_092859.jpg",
    imgAlt: "Image of Coffee Pot Rapids",
    distance: "2.2 miles",
    tags: ["Rafting"],
    difficulty: 1,
    description:
      "Beautiful hike along the Henry's Fork of the Snake River to a set of rapids.",
    directions:
      "Take Highway 20 north to Island Park. Continue almost to Mack's in. From Highway 20, turn west on Flatrock Road for 1 mile then turn off on Coffee Pot Road and travel one-half mile to the campground entrance road. There is a parking lot right outside the campground.",
    trailhead: [44.49035, -111.36619]
  },
  {
    name: "Menan Butte",
    stub: "menan_butte",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/1/11/Menan_Buttes-_Wyoming_big_sagebrush_steppe_%2822895622553%29.jpg",
    imgAlt: "Image of Menan Butte",
    distance: "3.4 miles",
    tags: ["Volcanic", "View"],
    difficulty: 2,
    description:
      "A steep climb to one of the largest volcanic tuff cones in the world. 3.4 miles is the full loop around the crater, can be shortened.",
    directions:
      "Take Highway 33 West out of Rexburg for about 8 miles. Turn left onto E Butte Road, the right onto Twin Butte road after about a mile. Follow that road for about 3 miles. You will see the parking lot/trailhead on the left.",
    trailhead: [43.78555, -111.98996]
  }
];

const hikeContainer = document.querySelector('#hike-container');
const input = document.querySelector('#search');
const searchBtn = document.querySelector('#searchBtn');
const sortBtn = document.querySelector('#sortBtn');
const status = document.querySelector('#status');

let sortAscending = true;

function getDistanceNumber(hike) {
  return parseFloat(hike.distance);
}

function compareHikesByDistance(a, b) {
  if (sortAscending) {
    return getDistanceNumber(a) - getDistanceNumber(b);
  }
  return getDistanceNumber(b) - getDistanceNumber(a);
}

function tagTemplate(tags) {
  return tags.map((tag) => `<span class="hike-tag">${tag}</span>`).join('');
}

function difficultyTemplate(rating) {
  let html = `<span class="rating" role="img" aria-label="Difficulty: ${rating} out of 5 boots">Difficulty: `;

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      html += `<span aria-hidden="true" class="icon-boot">🥾</span>`;
    } else {
      html += `<span aria-hidden="true" class="icon-empty">▫️</span>`;
    }
  }

  html += `</span>`;
  return html;
}

function hikesTemplate(hike) {
  return `
    <article class="hike-card">
      <img class="hike-image" src="${hike.imgSrc}" alt="${hike.imgAlt}">
      <div class="hike-content">
        <div class="hike-top">
          <h2>${hike.name}</h2>
          <div class="hike-distance">${hike.distance}</div>
        </div>
        <div class="hike-tags">${tagTemplate(hike.tags)}</div>
        <p>${hike.description}</p>
        <div class="meta">
          <p>${difficultyTemplate(hike.difficulty)}</p>
        </div>
      </div>
    </article>
  `;
}

function renderHikes(hikesToRender) {
  hikeContainer.innerHTML = '';

  if (hikesToRender.length === 0) {
    hikeContainer.innerHTML = `
      <div class="empty-state">
        <p>No hikes matched that search. Try a word like <strong>waterfall</strong>, <strong>yellowstone</strong>, or <strong>canyon</strong>.</p>
      </div>
    `;
    return;
  }

  hikesToRender.forEach(function (hike) {
    hikeContainer.innerHTML += hikesTemplate(hike);
  });
}

function filterHikes(query) {
  const hikeQuery = query.trim().toLowerCase();

  if (!hikeQuery) {
    return [...hikes].sort(compareHikesByDistance);
  }

  return hikes.filter(function (hike) {
    return (
      hike.name.toLowerCase().includes(hikeQuery) ||
      hike.description.toLowerCase().includes(hikeQuery) ||
      hike.tags.find((tag) => tag.toLowerCase().includes(hikeQuery))
    );
  }).sort(compareHikesByDistance);
}

function updateStatus(resultCount, query, isInitial = false) {
  if (isInitial) {
    status.textContent = 'Showing a random hike to get started.';
    return;
  }

  if (!query.trim()) {
    status.textContent = `Showing all ${resultCount} hikes, sorted by distance.`;
    return;
  }

  status.textContent = `Found ${resultCount} hike${resultCount === 1 ? '' : 's'} for "${query}".`;
}

function search() {
  const query = input.value;
  const filteredHikes = filterHikes(query);
  renderHikes(filteredHikes);
  updateStatus(filteredHikes.length, query);
}

function handleEnter(event) {
  if (event.key === 'Enter') {
    search();
  }
}

function toggleSort() {
  sortAscending = !sortAscending;
  sortBtn.textContent = sortAscending ? 'Sort: Shortest First' : 'Sort: Longest First';
  sortBtn.classList.toggle('active', !sortAscending);
  sortBtn.setAttribute('aria-pressed', String(!sortAscending));
  search();
}

function init() {
  const randomNum = Math.floor(Math.random() * hikes.length);
  renderHikes([hikes[randomNum]]);
  updateStatus(1, '', true);
}

searchBtn.addEventListener('click', search);
input.addEventListener('keypress', handleEnter);
input.addEventListener('input', search);
sortBtn.addEventListener('click', toggleSort);

init();