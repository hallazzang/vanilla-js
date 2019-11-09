(() => {
  const global = this;

  const lectures = [
    {
      id: 1,
      name: 'Lecture 1',
      times: [
        { weekday: 1, beginAt: '09:00', endAt: '11:30' },
        { weekday: 4, beginAt: '12:30', endAt: '14:30' },
      ],
    },
  ];

  function renderLectureItem(lecture) {
    const item = document.createElement('li');
    item.classList.add('lectures__item');

    const container = document.createElement('div');
    container.classList.add('lectures__item-container');

    const lectureName = document.createElement('span');
    lectureName.classList.add('lectures__item-name');
    lectureName.textContent = lecture.name;
    container.appendChild(lectureName);

    const lectureTimes = document.createElement('span');
    lectureTimes.classList.add('lectures__item-times');
    lectureTimes.textContent = '-';
    container.appendChild(lectureTimes);

    item.appendChild(container);

    return item;
  }

  function renderApp() {
    const container = document.createElement('div');
    container.classList.add('container');

    const lectureArea = document.createElement('div');
    lectureArea.classList.add('lecture-area');

    const searchInput = document.createElement('input');
    searchInput.classList.add('lecture-search');
    searchInput.type = 'search';
    searchInput.placeholder = 'Search lecture';
    searchInput.oninput = () => {
      updateLectureList();
    };
    lectureArea.appendChild(searchInput);

    const lectureList = document.createElement('ul');
    lectureList.classList.add('lectures');
    function updateLectureList() {
      const query = searchInput.value.trim();

      while (lectureList.lastChild) {
        lectureList.removeChild(lectureList.lastChild);
      }

      lectures
        .filter(lecture =>
          lecture.name.toLowerCase().includes(query.toLowerCase())
        )
        .forEach(lecture => {
          lectureList.appendChild(renderLectureItem(lecture));
        });
    }
    updateLectureList();
    lectureArea.appendChild(lectureList);

    container.appendChild(lectureArea);

    const timetable = document.createElement('div');
    timetable.classList.add('timetable');
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].forEach((weekday, i) => {
      const weekdayHeader = document.createElement('span');
      weekdayHeader.classList.add('timetable__weekday-header');
      weekdayHeader.textContent = weekday;
      Object.assign(weekdayHeader.style, {
        gridColumn: i + 2,
        gridRow: 1,
      });
      timetable.appendChild(weekdayHeader);
    });
    [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].forEach(
      (hour, i) => {
        const hourHeader = document.createElement('span');
        hourHeader.classList.add('timetable__hour-header');
        hourHeader.textContent = `${String(hour).padStart(2, '0')}:00`;
        Object.assign(hourHeader.style, {
          gridColumn: 1,
          gridRow: i + 2,
        });
        timetable.appendChild(hourHeader);
      }
    );
    container.appendChild(timetable);

    return container;
  }

  function mount(mountNode) {
    const app = renderApp();

    mountNode.appendChild(app);
  }

  mount(document.getElementById('root'));
})();
