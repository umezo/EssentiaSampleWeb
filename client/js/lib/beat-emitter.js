"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var events = _interopRequire(require("events"));

var BeatEmitter = exports.BeatEmitter = (function (_events$EventEmitter) {
  function BeatEmitter(beats) {
    _classCallCheck(this, BeatEmitter);

    this._timeAt = 0;
    this._beats = [0].concat(beats);
    this._index = 0;
  }

  _inherits(BeatEmitter, _events$EventEmitter);

  _prototypeProperties(BeatEmitter, null, {
    tick: {
      value: function tick(duration) {
        this.tickAt(this._timeAt + duration);
      },
      writable: true,
      configurable: true
    },
    tickAt: {
      value: function tickAt(time) {
        this._timeAt = time;

        //console.log('tick');
        var lastIndex = this.update(time);
        //console.log('    tick','index ->',this._index,'last ->',lastIndex,'len ->',this._beats.length);

        if (this._index < lastIndex) {

          var fired = this._beats.slice(this._index + 1, lastIndex + 1);
          this._index = lastIndex;

          this.emit("beat", this._beats[this._index], fired);
        }
      },
      writable: true,
      configurable: true
    },
    reset: {
      value: function reset() {
        this._index = 0;
      },
      writable: true,
      configurable: true
    },
    update: {
      value: function update(pos) {
        //console.log('update');
        for (var i = this._index + 1, n = this._beats.length; i < n; i++) {
          var beat = this._beats[i];
          //console.log('    update', 'condition:', beat>=pos, 'pos -> ', pos, 'beat -> ', beat, 'index -> ',this._index, 'i -> ',i);

          if (pos < beat) {
            return i - 1;
          }
        }

        return this._beats.length - 1;
      },
      writable: true,
      configurable: true
    }
  });

  return BeatEmitter;
})(events.EventEmitter);

Object.defineProperty(exports, "__esModule", {
  value: true
});

// -----------------------------------------A-----------------------------------------------------B-------------------------------------------
// -----------------p-------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------p------------------------------------------------------------------------------- A will fired
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQ08sTUFBTSwyQkFBTSxRQUFROztJQUVkLFdBQVcsV0FBWCxXQUFXO0FBQ1gsV0FEQSxXQUFXLENBQ1YsS0FBSzswQkFETixXQUFXOztBQUVwQixRQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztBQUNqQixRQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hDLFFBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0dBQ2pCOztZQUxVLFdBQVc7O3VCQUFYLFdBQVc7QUFPdEIsUUFBSTthQUFBLGNBQUMsUUFBUSxFQUFFO0FBQ2IsWUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLFFBQVEsQ0FBQyxDQUFDO09BQ3BDOzs7O0FBR0QsVUFBTTthQUFBLGdCQUFDLElBQUksRUFBRTtBQUNYLFlBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDOzs7QUFHcEIsWUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7O0FBR2xDLFlBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLEVBQUU7O0FBRTNCLGNBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLFNBQVMsR0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6RCxjQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQzs7QUFFeEIsY0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDcEQ7T0FDRjs7OztBQUVELFNBQUs7YUFBQSxpQkFBRztBQUNOLFlBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO09BQ2pCOzs7O0FBRUQsVUFBTTthQUFBLGdCQUFDLEdBQUcsRUFBQzs7QUFFVCxhQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUMsQ0FBQyxFQUFHLENBQUMsRUFBRSxFQUFDO0FBQzVELGNBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7OztBQUcxQixjQUFJLEdBQUcsR0FBRyxJQUFJLEVBQUU7QUFDZCxtQkFBTyxDQUFDLEdBQUMsQ0FBQyxDQUFDO1dBQ1o7U0FDRjs7QUFFRCxlQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztPQUM3Qjs7Ozs7O1NBNUNVLFdBQVc7R0FBUyxNQUFNLENBQUMsWUFBWSIsImZpbGUiOiJzcmMvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCBldmVudHMgZnJvbSAnZXZlbnRzJztcblxuZXhwb3J0IGNsYXNzIEJlYXRFbWl0dGVyIGV4dGVuZHMgZXZlbnRzLkV2ZW50RW1pdHRlcntcbiAgY29uc3RydWN0b3IoYmVhdHMpIHtcbiAgICB0aGlzLl90aW1lQXQgPSAwO1xuICAgIHRoaXMuX2JlYXRzID0gWzBdLmNvbmNhdChiZWF0cyk7XG4gICAgdGhpcy5faW5kZXggPSAwO1xuICB9XG5cbiAgdGljayhkdXJhdGlvbikge1xuICAgIHRoaXMudGlja0F0KHRoaXMuX3RpbWVBdCtkdXJhdGlvbik7XG4gIH1cblxuXG4gIHRpY2tBdCh0aW1lKSB7XG4gICAgdGhpcy5fdGltZUF0ID0gdGltZTtcblxuICAgIC8vY29uc29sZS5sb2coJ3RpY2snKTtcbiAgICB2YXIgbGFzdEluZGV4ID0gdGhpcy51cGRhdGUodGltZSk7XG4gICAgLy9jb25zb2xlLmxvZygnICAgIHRpY2snLCdpbmRleCAtPicsdGhpcy5faW5kZXgsJ2xhc3QgLT4nLGxhc3RJbmRleCwnbGVuIC0+Jyx0aGlzLl9iZWF0cy5sZW5ndGgpO1xuXG4gICAgaWYgKHRoaXMuX2luZGV4IDwgbGFzdEluZGV4KSB7XG5cbiAgICAgIGxldCBmaXJlZCA9IHRoaXMuX2JlYXRzLnNsaWNlKHRoaXMuX2luZGV4KzEsbGFzdEluZGV4KzEpO1xuICAgICAgdGhpcy5faW5kZXggPSBsYXN0SW5kZXg7XG5cbiAgICAgIHRoaXMuZW1pdCgnYmVhdCcsIHRoaXMuX2JlYXRzW3RoaXMuX2luZGV4XSwgZmlyZWQpO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuX2luZGV4ID0gMDtcbiAgfVxuXG4gIHVwZGF0ZShwb3Mpe1xuICAgIC8vY29uc29sZS5sb2coJ3VwZGF0ZScpO1xuICAgIGZvciggbGV0IGkgPSB0aGlzLl9pbmRleCsxLCBuID0gdGhpcy5fYmVhdHMubGVuZ3RoOyBpPG4gOyBpKyspe1xuICAgICAgbGV0IGJlYXQgPSB0aGlzLl9iZWF0c1tpXTtcbiAgICAgIC8vY29uc29sZS5sb2coJyAgICB1cGRhdGUnLCAnY29uZGl0aW9uOicsIGJlYXQ+PXBvcywgJ3BvcyAtPiAnLCBwb3MsICdiZWF0IC0+ICcsIGJlYXQsICdpbmRleCAtPiAnLHRoaXMuX2luZGV4LCAnaSAtPiAnLGkpO1xuXG4gICAgICBpZiAocG9zIDwgYmVhdCkge1xuICAgICAgICByZXR1cm4gaS0xO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9iZWF0cy5sZW5ndGgtMTtcbiAgfVxuXG59XG5cblxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAtLS0tLS0tLS0tLS0tLS0tLXAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEEgd2lsbCBmaXJlZFxuIl19