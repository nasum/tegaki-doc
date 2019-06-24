const Sugar = require('sugar')
const ipc = require('electron').ipcRenderer

const Vue = require('vue/dist/vue.common')

Sugar.extend();

new Vue({
  el: "#app",
  data() {
    return {
      inputText: '',
      filePath: '',
      beauty: 250
    }
  },
  computed: {
    tegakinize() {
      const tegakinize = this.inputText.split('').map(t => {
        if (t === '\n') return `<br/>`;
        if (t === '\t') return ``;
        return `<span style="${this.beauty > 0 ? hw_generateRandomizeStyle(this.beauty) : ""}">${t}</span>`;
      }).join("");
      return tegakinize
    }
  },
  watch: {
    inputText(val) {
      ipc.send('update-file', val, this.filePath)
    }
  },
  methods: {
    printPdf() {
      ipc.send('print-to-pdf')
    },
    openFile() {
      ipc.send('open-dialog')
    },
    newFile() {
      ipc.send('new-file', this.inputText, this.filePath)
    }
  },
  mounted() {
    ipc.on('set-editor', (_, content, filePath) => {
      this.inputText = content
      this.filePath = filePath
    })
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

ipc.on('wrote-pdf', function (event, path) {
  const message = `Wrote PDF to: ${path}`
  document.getElementById('pdf-path').innerHTML = message
})
