$(".toggle-password").click(function () {
  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $($(this).attr("toggle"));
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});

// let curr_track1 = document.createElement("audio");
// function getTimeMusic(url_file) {
//   curr_track1.src = "music/" + url_file;
//   curr_track1.load();
//   let durationMinutes1 = Math.floor(curr_track1.duration / 60);
//   let durationSeconds1 = Math.floor(
//     curr_track1.duration - durationMinutes1 * 60
//   );

//   if (durationSeconds1 < 10) {
//     durationSeconds1 = "0" + durationSeconds1;
//   }
//   if (durationMinutes1 < 10) {
//     durationMinutes1 = "0" + durationMinutes1;
//   }

//   timemusic = durationMinutes1 + ":" + durationSeconds1;
//   return timemusic;
// }
// let top8bxh = document.querySelector(".top8bxh");
// console.log(top8bxh.textContent);
// curr_track.src = top8bxh.textContent;
// curr_track.load();

// const formatDuration = (time) => {
//   if (isNaN(time)) {
//     return;
//   }

//   let hours = Math.floor(time / 3600);
//   let mins = Math.floor(time / 60);
//   let seconds = Math.floor(time % 60);

//   if (hours == 0) {
//     seconds < 10 ? (seconds = "0" + seconds) : seconds;
//     return `${mins}:${seconds}`;
//   } else {
//     mins < 10 ? (mins = "0" + mins) : mins;
//     seconds < 10 ? (seconds = "0" + seconds) : seconds;
//     return `${hours}:${mins}:${seconds}`;
//   }
// };
