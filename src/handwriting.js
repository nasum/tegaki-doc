const $ = require('jquery')
const Sugar = require('sugar')
const ipc = require('electron').ipcRenderer

const Vue = require('vue/dist/vue.common')

Sugar.extend();

new Vue({
  el: "#app",
  data() {
    return {
      inputText: ''
    }
  },
  computed: {
    tegakinize() {
      const CharBeautyRate = 250

      const tegakinize = this.inputText.split('').map(t => {
        if (t === '\n') return `<br/>`;
        if (t === '\t') return ``;
        return `<span style="${CharBeautyRate > 0 ? hw_generateRandomizeStyle(CharBeautyRate) : ""}">${t}</span>`;
      }).join("");
      return tegakinize
    }
  }
})

function hw_generateRandomizeStyle(CharBeautyRate) {
  var color = Number.random(0, 0x30);
  var colorRgb = [1, 1, 1].map(e => color);
  var tax = 1 + Number.random(-10, 10) / CharBeautyRate;
  var tby = 1 + Number.random(-10, 10) / CharBeautyRate;
  var tay = Number.random(-10, 10) / CharBeautyRate;
  var tbx = Number.random(-10, 10) / CharBeautyRate;
  var transfromLocate = [1, 1].map(e => Number.random(-5, 5) / 10);
  var letterSpace = Number.random(-8, -5) / 5;
  return `
		display: inline-block;
		white-space: pre;
		color: rgb(${colorRgb});
		letter-spacing: ${letterSpace}px;
		transform: matrix(${tax},${tay},${tbx},${tby},${transfromLocate});
	`;
}

const printPDFBtn = document.getElementById('print')

printPDFBtn.addEventListener('click', function (event) {
  ipc.send('print-to-pdf')
})

ipc.on('wrote-pdf', function (event, path) {
  const message = `Wrote PDF to: ${path}`
  document.getElementById('pdf-path').innerHTML = message
})