const mainCard = document.querySelector("#ContentWarpper");
const songImg = document.querySelector("#SongImg");
const controlButtons = document.querySelector(".control");
const currentYear = new Date().getFullYear();

const playPauseButton = document.querySelector("#PausePlay");
const audio = document.querySelector("audio");
const artist = document.querySelector("#Artist");
const songName = document.querySelector("#SongName");
const previousButton = document.querySelector("#Previous");
const nextButton = document.querySelector("#Next");
const songImgAtTheTop = document.querySelector("img");

let startDuration = document.querySelector("#Start");
const endDuration = document.querySelector("#End");
const meter = document.querySelector("#ProgrssMeterChild");
const progressBar = document.querySelector("#ProgressMeterContainer");

let isPlaying = false;
let index = 0;

const songDataBase = [
  {
    songSrc: "./music/music1.mp3",
    title: "Pirai Thedum",
    artist: "G.V.Prakash",
    imgSrc: "./img/music1.jpg",
  },
  {
    songSrc: "./music/music2.mp3",
    title: "Amali-Thumali",
    artist: "Harris Jayaraj",
    imgSrc: "./img/music2.jpg",
  },
  {
    songSrc: "./music/music3.mp3",
    title: "Arabic Kuthu",
    artist: "Anirudh",
    imgSrc: "./img/music3.jpg",
  },
  {
    songSrc: "./music/music4.mp3",
    title: "Kutti Puli Kootam",
    artist: "Harris Jayaraj",
    imgSrc: "./img/music4.jpg",
  },
  {
    songSrc: "./music/music5.mp3",
    title: "Danga Maari Oodhari",
    artist: "Harris Jayaraj",
    imgSrc: "./img/music5.jpg",
  },
  {
    songSrc: "./music/music6.mp3",
    title: "Azhagiya Theeye",
    artist: "Harris Jayaraj",
    imgSrc: "./img/music6.jpg",
  },
  {
    songSrc: "./music/music7.mp3",
    title: "Asku Laska",
    artist: "Harris Jayaraj",
    imgSrc: "./img/music7.jpg",
  },
  {
    songSrc: "./music/music8.mp3",
    title: "Arima Arima",
    artist: "A.R.Rahman",
    imgSrc: "./img/music8.jpg",
  },
  {
    songSrc: "./music/music9.mp3",
    title: "Marghazhi Poove",
    artist: "A.R.Rahman",
    imgSrc: "./img/music9.jpg",
  },
  {
    songSrc: "./music/music10.mp3",
    title: "Naan Sonnadhum Mazhai",
    artist: "G.V.Prakash",
    imgSrc: "./img/music10.jpg",
  },
  {
    songSrc: "./music/music11.mp3",
    title: "Nenjai Kasakki",
    artist: "Yuvan",
    imgSrc: "./img/music11.jpg",
  },
  {
    songSrc: "./music/music12.mp3",
    title: "Pookal Pookkum",
    artist: "G.V.Prakash",
    imgSrc: "./img/music12.jpg",
  },
  {
    songSrc: "./music/music13.mp3",
    title: "Poova Poova Poove",
    artist: "Yuvan",
    imgSrc: "./img/music13.jpg",
  },
  {
    songSrc: "./music/music14.mp3",
    title: "Pulpesum Poo Pesum",
    artist: "Yuvan",
    imgSrc: "./img/music14.jpg",
  },
  {
    songSrc: "./music/music15.mp3",
    title: "Soniya Soniya",
    artist: "A.R.Rahman",
    imgSrc: "./img/music15.jpg",
  },
  {
    songSrc: "./music/music16.mp3",
    title: "Thozhiya En Kadhaliya",
    artist: "Vijay Antony",
    imgSrc: "./img/music16.jpg",
  },
  {
    songSrc: "./music/music17.mp3",
    title: "Usilambatti Pen Kutti",
    artist: "A.R.Rahman",
    imgSrc: "./img/music17.jpg",
  },
  {
    songSrc: "./music/music18.mp3",
    title: "Vaada Vaada Paiya",
    artist: "D.Imman",
    imgSrc: "./img/music18.jpg",
  },
  {
    songSrc: "./music/music19.mp3",
    title: "Eppadio-Mattikiten",
    artist: "Yuvan",
    imgSrc: "./img/music19.jpg",
  },
  {
    songSrc: "./music/music20.mp3",
    title: "Vennam Machan",
    artist: "Harris Jayaraj",
    imgSrc: "./img/music20.jpg",
  },
];

const loadMusic = () => {
  audio.src = songDataBase[index].songSrc;
  artist.textContent = songDataBase[index].artist;
  songName.textContent = songDataBase[index].title;
  songImgAtTheTop.src = songDataBase[index].imgSrc;
};
audio.addEventListener("ended", () => {
  loadMusic(index++);
  play();
});

loadMusic();

nextButton.addEventListener("click", () => {
  if (index < songDataBase.length - 1) {
    loadMusic(index++);
    play();
  } else {
    pause();
  }
});
previousButton.addEventListener("click", () => {
  if (index > 0) {
    loadMusic(index--);
    play();
  } else {
    pause();
  }
});

const play = () => {
  isPlaying = true;
  audio.play();
  playPauseButton.classList.replace("fa-play", "fa-pause");
  songImg.classList.add("anime");
};
const pause = () => {
  isPlaying = false;
  audio.pause();
  playPauseButton.classList.replace("fa-pause", "fa-play");
  songImg.classList.remove("anime");
};

playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
});
let minute, second;
const timeStamp = (event) => {
  let { duration, currentTime } = event.srcElement;
  const full_second = Math.floor(duration % 60);
  const full_minute = Math.floor(duration / 60);
  const start_second = Math.floor(currentTime % 60);
  const start_minute = Math.floor(currentTime / 60);
  const totalDuration = `${full_minute} : ${full_second}`;
  const currenDuration = `${start_minute} : ${start_second}`;
  if (duration) {
    endDuration.textContent = totalDuration;
  }
  startDuration.textContent = currenDuration;
  const percentage = (currentTime / duration) * 100;
  meter.style.width = `${percentage}%`;
};
audio.addEventListener("timeupdate", timeStamp);
progressBar.addEventListener("click", (event) => {
  const { duration } = audio;
  const moreProgress =
    (event.offsetX / event.srcElement.clientWidth) * duration;
  audio.currentTime = moreProgress;
});

document.querySelector("#Year").innerHTML = currentYear;

mainCard.addEventListener("mouseover", (event) => {
  const xAxis = (window.innerWidth / 2 - event.pageX) / 15;
  const yAxis = (window.innerHeight / 2 - event.pageY) / 15;
  mainCard.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
  songImg.style.transform = `rotate(${xAxis}deg)`;
  controlButtons.style.transform = `rotate(${xAxis}deg)`;
});
mainCard.addEventListener("mouseleave", () => {
  mainCard.style.transform = "rotateX(0deg) rotateY(0deg)";
  songImg.style.transform = "rotate(0deg)";
  controlButtons.style.transform = "rotate(0deg)";
});
