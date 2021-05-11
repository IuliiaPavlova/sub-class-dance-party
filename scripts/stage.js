/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-constructor */
/* eslint-disable max-classes-per-file */
class Dancer {
  constructor(top, left, speed) {
    this.setPosition(top, left);
    this.top = top;
    this.left = left;
    this.speed = speed;
  }

  setPosition() {
    this.$node = $('<div class="dancer"></div>');
    this.$node.css({ top: this.top, left: this.left });
  }

  notLazy() {
    const newq = makeNewPosition();
    this.$node.animate({ top: newq[0], left: newq[1] }, this.speed, () => {
      this.notLazy(this.speed);
    });
  }
}

class Tapper extends Dancer {
  constructor(top, left, speed) {
    super(top, left, speed);
  }
}

class Rainbow extends Dancer {
  constructor(top, left, speed) {
    super(top, left, speed);
  }
}

$(() => {
  const cache = [];
  $('#regular').on('click', () => {
    const dancer = new Dancer(Math.random() * $('#stage').height(), Math.random() * $('#stage').width(), 2000);
    dancer.setPosition();
    dancer.notLazy();
    $('#stage').append(dancer.$node);
    cache.push(dancer);
  });

  $('#tapper').on('click', () => {
    const tapper = new Tapper(Math.random() * $('#stage').height(), Math.random() * $('#stage').width(), 600);
    tapper.setPosition();
    tapper.notLazy();
    $('#stage').append(tapper.$node);
    tapper.$node.addClass('tapper');
    cache.push(tapper);
  });

  $('#rainbow').on('click', () => {
    const rainbow = new Rainbow(Math.random() * $('#stage').height(), Math.random() * $('#stage').width(), 1200);
    rainbow.setPosition();
    rainbow.notLazy();
    $('#stage').append(rainbow.$node);
    rainbow.$node.addClass('rainbow');
  });

  $('#rest').on('click', () => {
    $('.dancer').stop().animate({ top: $('#stage').height() - 30 }, 2000);
  });

  $('#clean').on('click', () => {
    $('.dancer').remove();
  });
});

// ----------------------------------------------------

function makeNewPosition() {
  // Get viewport dimensions (remove the dimension of the div)
  const h = $(window).height() - 50;
  const w = $(window).width() - 50;
  const nh = Math.floor(Math.random() * h);
  const nw = Math.floor(Math.random() * w);
  return [nh, nw];
}
