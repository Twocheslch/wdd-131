// @media screen and (min-width: 700px) {
//     const element = document.queryselector('')
// }


// @media screen and (min-width: 480px) {
//   body {
//     .hide 
//         display: block;
//   }
// }    

// @media screen and (min-width: 1024px) {
//   body {
//     .menu-btn.classList.remove
//   }
// }    

const deeznutz = document.querySelector(".menu-btn"), n = document.querySelector("nav");
deeznutz.addEventListener("click", () => n.classList.toggle("open"));
