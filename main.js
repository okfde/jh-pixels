window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  Vue.component('canvas-item', {
    props: ['grid', 'width', 'height'],
    context: undefined,
    template: `<canvas width="770px" height="770px" @click="$emit('check-pixel', $event)"></canvas>`,
    methods: {
      drawGrid: function () {
        for (let i = 0; i < this.grid; i++) {
          this.context.beginPath();
          this.context.moveTo(70 * i, 0);
          this.context.lineTo(70 * i, 770);
          this.context.stroke(); // vertical
          this.context.beginPath();
          this.context.moveTo(0, 70 * i);
          this.context.lineTo(770, 70 * i);
          this.context.stroke(); //horizontal
        }
      },
      drawPixels: function () {
        console.log('get pixels from somewhere and draw them');
      }
    },
    mounted: function () {
      this.context = this.$el.getContext('2d');
      this.drawGrid();
      this.drawPixels();
    }
  })

  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      gridNum: 11,
      gridSize: 70,
      grid: [],
      colors: [
        {name: 'deep red',
         style: {
           backgroundColor: '#e52420'
         }},
        {name: 'deep orange',
         style: {
           backgroundColor: '#ea680c'
         }},
        {name: 'deep yellow',
         style: {
           backgroundColor: '#ffd003'
         }},
        {name: 'deep green',
         style: {
           backgroundColor: '#4cad37'
         }},
        {name: 'deep blue',
         style: {
           backgroundColor: '#00a6de'
         }},
        {name: 'deep purple',
         style: {
           backgroundColor: '#4c2582'
         }},
        {name: 'deep grey',
         style: {
           backgroundColor: '#52575b'
         }},
        {name: 'black',
         style: {
           backgroundColor: '#000000'
         }},
        {name: 'white',
         style: {
           backgroundColor: '#ffffff'
         }}
      ]
    },
    methods: {
      updateCanvas: function() {
        console.log('foo');
      },
      populateGrid: function() {
        for (let i = 0; i < this.gridNum; i++) {
          this.grid.push([]);
          for (let j = 0; j < this.gridNum; j++) {
            this.grid[i].push({color: undefined})
          }
        }
        //console.log(this.grid);
      },
      checkPixel: function(ev) {
        var gridX = Math.floor(ev.offsetX / this.gridSize);
        var gridY = Math.floor(ev.offsetY / this.gridSize);
      }
    },
    created: function() {
      this.populateGrid();
    },
    mounted: function() {
      this.updateCanvas();
    }
  });

});
