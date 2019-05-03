window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  Vue.component('canvas-item', {
    props: ['grid', 'gridSize', 'gridNum', 'width', 'height'],
    context: undefined,
    anim: undefined,
    template: `<canvas width="770px" height="770px" @click="$emit('check-pixel', $event)"></canvas>`,
    methods: {
      drawGrid: function () {
        this.context.strokeStyle = 'black';
        for (let i = 0; i < 11; i++) {
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
        //console.log(this.grid[0][0])
        //debugger
        console.log('get pixels from somewhere and draw them');
        for (let i = 0; i < this.gridNum; i++) {
          for (let j = 0; j < this.gridNum; j++) {
            if (this.$root.$data.grid[i][j].color !== undefined) {
              debugger
              this.fillStyle = this.$root.$data.grid[i][j].color;
              this.context.fillRect(i *  this.gridSize, j * this.gridSize,
                                    this.gridSize, this.gridSize);
            }
          }
        }
      },
      frame: function (dt) {
        this.drawGrid();
        this.drawPixels();
        //console.log(this.grid)
        //window.requestAnimationFrame(this.frame)
      }
    },
    mounted: function () {
      this.context = this.$el.getContext('2d');
      this.drawGrid();
      this.frame();
      //this.anim = window.requestAnimationFrame(this.frame)
    }
  })

  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      currentColor: '#e52420',
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
          <canvas v-on:click="checkPixel" width="770px" height="770px"></canvas>
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
        var interim = this.grid;
        interim[gridX][gridY].color = this.currentColor;
        this.grid = interim;

        //console.log(this.grid)
      },
      changeColor: function(ev) {
        this.currentColor = ev.target.styleBackgroundColor;
        console.log(this.currentColor)
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
