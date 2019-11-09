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

  function renderApp() {
    const container = document.createElement('div');
    container.classList.add('container');

    const lectureArea = document.createElement('div');
    lectureArea.classList.add('lecture-area');
    container.appendChild(lectureArea);

    const timetable = document.createElement('div');
    timetable.classList.add('timetable');
    container.appendChild(timetable);

    return container;
  }

  function mount(mountNode) {
    const app = renderApp();

    mountNode.appendChild(app);
  }

  mount(document.getElementById('root'));
})();
