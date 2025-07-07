document.addEventListener("DOMContentLoaded", function () {
  const events = [
      { id: 1, title: "Rock Concert", date: "2025-03-20", category: "Music", description: "An electrifying rock concert in the city!", image: "concert.jpg" },
      { id: 2, title: "Tech Meetup", date: "2025-04-15", category: "Tech", description: "A networking event for tech enthusiasts.", image: "tech.jpg" },
      { id: 3, title: "Football Match", date: "2025-05-10", category: "Sports", description: "An exciting football match between top teams!", image: "football.jpg" },
      { id: 4, title: "Art Exhibition", date: "2025-06-05", category: "Art", description: "An inspiring exhibition featuring local artists.", image: "art.jpg" },
      { id: 5, title: "Food Festival", date: "2025-07-12", category: "Food", description: "Taste delicious food from around the world!", image: "food.jpg" }
  ];

  function getSearchParams() {
      const params = new URLSearchParams(window.location.search);
      return {
          query: params.get("query") || "",
          date: params.get("date") || "",
          category: params.get("category") || ""
      };
  }

  function displayEvents(filteredEvents) {
      const eventList = document.getElementById("eventList");
      if (!eventList) return;
      eventList.innerHTML = "";

      if (filteredEvents.length === 0) {
          eventList.innerHTML = `<p class="text-center text-muted">No events found.</p>`;
          return;
      }

      filteredEvents.forEach(event => {
          let card = `
              <div class="col-md-4">
                  <div class="card event-card p-3 mb-3">
                      <h4>${event.title}</h4>
                      <p>${event.date} | ${event.category}</p>
                      <a href="event-details.html?id=${event.id}" class="btn btn-primary">View Details</a>
                  </div>
              </div>
          `;
          eventList.innerHTML += card;
      });
  }

  function loadEvents() {
      if (window.location.pathname.includes("events.html")) {
          const searchParams = getSearchParams();
          let filtered = events.filter(event =>
              (event.title.toLowerCase().includes(searchParams.query.toLowerCase()) || searchParams.query === "") &&
              (event.date === searchParams.date || searchParams.date === "") &&
              (event.category === searchParams.category || searchParams.category === "")
          );
          displayEvents(filtered);
      }

      if (window.location.pathname.includes("event-details.html")) {
          const params = new URLSearchParams(window.location.search);
          const eventId = params.get("id");
          const event = events.find(e => e.id == eventId);

          if (event) {
              document.getElementById("eventTitle").textContent = event.title;
              document.getElementById("eventDate").textContent = "Date: " + event.date;
              document.getElementById("eventCategory").textContent = "Category: " + event.category;
              document.getElementById("eventDescription").textContent = event.description;
          }
      }
  }

  loadEvents();
});
