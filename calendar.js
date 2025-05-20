const monthYear = document.getElementById('monthYear');
const calendarDates = document.getElementById('calendarDates');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentDate = new Date();
let events = [];

async function loadEvents() {
  try {
    const res = await fetch('events.json');
    events = await res.json();
    renderCalendar();
  } catch (error) {
    console.error('Failed to load events:', error);
  }
}

function renderCalendar() {
  calendarDates.innerHTML = '';

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Add empty cells for days before the 1st of the month
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement('div');
    calendarDates.appendChild(emptyCell);
  }

  // Add day cells
  for (let day = 1; day <= lastDate; day++) {
    const dayCell = document.createElement('div');
    dayCell.classList.add('day-cell');
    dayCell.textContent = day;

    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    // Find if there's an event for this day
    const dayEvent = events.find(e => e.date === dateStr);
    if (dayEvent) {
      const eventText = document.createElement('div');
      eventText.classList.add('event-text');
      eventText.textContent = dayEvent.event;
      dayCell.appendChild(eventText);
    }

    calendarDates.appendChild(dayCell);
  }
}

prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// Load events first, then render the calendar
loadEvents();

