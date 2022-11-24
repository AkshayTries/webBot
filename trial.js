var x ="hey there snickerdoodle";
const form = document.querySelector("#form")
const utterThis = new SpeechSynthesisUtterance()
const synth = window.speechSynthesis
form.onsubmit = (event) => {
  utterThis.text = x
  synth.speak(utterThis)
}
