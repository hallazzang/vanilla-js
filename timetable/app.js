(() => {
  const global = this;

  const data = {
    lectures: [
      {
        id: 1,
        name: 'Lecture 1',
        times: [
          { weekday: 0, beginAt: '09:00', endAt: '11:30' },
          { weekday: 3, beginAt: '12:30', endAt: '14:30' },
        ],
      },
      {
        id: 2,
        name: 'Lecture 2',
        times: [
          { weekday: 1, beginAt: '13:00', endAt: '15:00' },
          { weekday: 2, beginAt: '18:30', endAt: '20:00' },
        ],
      },
      {
        id: 3,
        name: 'Lecture 3',
        times: [
          { weekday: 1, beginAt: '12:00', endAt: '14:00' },
          { weekday: 2, beginAt: '18:30', endAt: '20:00' },
        ],
      },
    ],
    selectedLectures: new Set(),
    searchInputRef: undefined,
    searchResultListRef: undefined,
    weekdayTrackRefs: [],
  };

  function parseTime(s) {
    const [hour, minute] = s.split(':').map(Number);

    return hour * 60 + minute;
  }

  function renderSearchResultList() {
    const query = data.searchInputRef.value.trim();

    while (data.searchResultListRef.lastChild) {
      data.searchResultListRef.removeChild(data.searchResultListRef.lastChild);
    }

    data.lectures
      .filter(lecture =>
        lecture.name.toLowerCase().includes(query.toLowerCase())
      )
      .forEach(lecture =>
        data.searchResultListRef.appendChild(createSearchResult(lecture))
      );
  }

  function createSearchResult(lecture) {
    const item = document.createElement('li');
    item.classList.add('search__result-item');

    const container = document.createElement('div');
    container.classList.add('search__result-item__container');

    const lectureName = document.createElement('span');
    lectureName.classList.add('search__result-item__name');
    lectureName.textContent = lecture.name;
    container.appendChild(lectureName);

    const lectureTimes = document.createElement('span');
    lectureTimes.classList.add('search__result-item__times');
    lectureTimes.textContent = '-';
    container.appendChild(lectureTimes);

    item.appendChild(container);
    item.onclick = () => {
      if (!data.selectedLectures.has(lecture.id)) {
        data.selectedLectures.add(lecture.id);
      } else {
        data.selectedLectures.delete(lecture.id);
      }
      renderSelectedLectures();
    };

    return item;
  }

  function renderSelectedLectures() {
    renderLectures(
      data.lectures.filter(lecture => data.selectedLectures.has(lecture.id))
    );
  }

  function clearWeekdayTracks() {
    data.weekdayTrackRefs.forEach(weekdayTrackRef => {
      while (weekdayTrackRef.lastChild) {
        weekdayTrackRef.removeChild(weekdayTrackRef.lastChild);
      }
    });
  }

  function renderLectures(lectures) {
    clearWeekdayTracks();

    lectures.forEach(lecture => renderLecture(lecture));
  }

  function renderLecture(lecture) {
    lecture.times.forEach(time =>
      data.weekdayTrackRefs[time.weekday].appendChild(
        createLectureCell(lecture, time)
      )
    );
  }

  function createLectureCell(lecture, time) {
    const begin = parseTime(time.beginAt) - 480;
    const end = parseTime(time.endAt) - 480;

    const cell = document.createElement('div');
    cell.classList.add('timetable__lecture-cell');
    cell.textContent = lecture.name;
    Object.assign(cell.style, {
      top: `${(begin / 840) * 100}%`,
      height: `${((end - begin) / 840) * 100}%`,
    });

    return cell;
  }

  function createApp() {
    const container = document.createElement('div');
    container.classList.add('container');

    const searchArea = document.createElement('div');
    searchArea.classList.add('search');

    const searchInput = document.createElement('input');
    data.searchInputRef = searchInput;
    searchInput.classList.add('search__input');
    searchInput.type = 'search';
    searchInput.placeholder = 'Search lecture';
    searchInput.oninput = () =>
      renderSearchResultList(searchInput.value.trim());
    searchArea.appendChild(searchInput);

    const searchResultList = document.createElement('ul');
    data.searchResultListRef = searchResultList;
    searchResultList.classList.add('search__result');
    renderSearchResultList('');
    searchArea.appendChild(searchResultList);

    container.appendChild(searchArea);

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

      const weekdayTrack = document.createElement('div');
      data.weekdayTrackRefs.push(weekdayTrack);
      weekdayTrack.classList.add('timetable__weekday-track');
      Object.assign(weekdayTrack.style, {
        gridColumn: i + 2,
        gridRow: '2 / -1',
      });

      timetable.appendChild(weekdayTrack);
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
    const app = createApp();

    mountNode.appendChild(app);
  }

  mount(document.getElementById('root'));
})();
