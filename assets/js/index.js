//Catwatch urls

const catwatch = {
  statistics: 'https://catwatch.opensource.zalan.do/statistics?organizations=zalando',
  projects: 'https://catwatch.opensource.zalan.do/projects?organizations=zalando&limit=3&sortBy=-stars'
};

async function getData(url) {
  const response = await fetch(url);
  return await response.json();
}

function setStats(key, value) {
  document.getElementById(key).innerHTML = value;
}

async function getStats(url) {
    const data = await getData(catwatch.statistics);
    const stats = data[0];

    setStats('statistic-languages', stats.programLanguagesCount);
    setStats('statistic-repositories', stats.publicProjectCount);
    setStats('statistic-contributors', stats.allContributorsCount);
    setStats('statistic-stars', stats.allStarsCount);
};

function setProject(project, index) {
  const domElement = `<div class="project dc-card">
    <div class="project__header">
      <div class="project__header-icon">${index + 1}</div>
      <div class="project__header-content">
        <div class="project__header-content-text">
          ${project.name}
        </div>
      </div>
      <div class="project__language">${project.primaryLanguage}</div>
    </div>
    <div class="project__content">
      <p class="dc-p project__description">${project.description}</p>
      <div class="project__statistics">
        <span>Forks: ${project.forksCount}</span>
        <span>Stars: ${project.starsCount}</span>
        <span>Contributors: ${project.contributorsCount}</span>
      </div>
    </div>
  </div>`;

  return domElement;
}

async function getProjects(url) {
    const data = await getData(catwatch.projects);
    const projects = [];

    data.forEach((project, index) => {
      projects.push(setProject(project, index));
    });

    document.getElementById('catwatch-projects').innerHTML = projects;
};

getStats(catwatch.statistics);
getProjects(catwatch.projects);
