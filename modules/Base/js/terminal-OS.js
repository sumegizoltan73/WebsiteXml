/* 
 * Terminal-OS
 * Author: Zoltan Sumegi - http://www.sumegi.net
 * Design: Vanessza Sumegi
 * 
 * Function.createDelegate() from .NET Framework 4 - http://msdn.microsoft.com
 */

Array.prototype.shiftAndAdd = function () {
    this.push(this.shift());
};

var terminalOS = {
    data: [],
    canvasContainerControlID: 'logocanvas',
    canvasElement: null,
    refreshRate: 350,
    rowIndex: 0,
    statusX: 'off',
    delegates: {},
    initialize: function () {
        var i, datarow, container;
        
        datarow = "0001011100011101010101101010101011110100101011110101000101111";
        for (i = 0; i < 60; i += 15) {
            this.data.push(datarow.substr(i, 15).split(''));
        }

        this.delegates.startscroll = this._createDelegate(this, this._scrollData);
        this.delegates.scroll = this._createDelegate(this, this._scrollDataRow);

        container = document.getElementById(this.canvasContainerControlID);
        if (container) {
            this.canvasElement = document.createElement("canvas");
            this.canvasElement.setAttribute("width", "" + container.offsetWidth);
            this.canvasElement.setAttribute("height", "" + container.offsetHeight);
            container.appendChild(this.canvasElement);
            if (!this.canvasElement.getContext) {
                return;
            }

            this._startX();
        }
    },
    _createDelegate: function (instance, method) {
        // Function.createDelegate()
        return function () {
            return method.apply(instance, arguments);
        };
    },
    _clearX: function () {
        var ctx = this.canvasElement.getContext("2d");
        ctx.clearRect(60, 27, 94, 72);
    },
    _stopX: function () {
        this.statusX = 'off';
        this._clearX();
    },
    _startX: function () {
        window.setTimeout(this._createDelegate(this, this._showApp1), 3000);
        window.setTimeout(this._createDelegate(this, this._startApp2), 5000);
    },
    _showApp1: function () {
        var ctx = this.canvasElement.getContext("2d");
        ctx.fillStyle = "rgba(0, 200, 0, 0.3)";
        ctx.fillRect(132, 47, 22, 40);

        ctx.fillStyle = "rgba(0, 200, 0, 0.3)";
        ctx.fillRect(82, 47, 44, 40);
    },
    _showApp2: function () {
        var ctx = this.canvasElement.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(62, 29);
        ctx.lineTo(62, 73);
        ctx.lineTo(150, 73);
        ctx.lineTo(150, 29);
        ctx.lineTo(62, 29);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(62, 77);
        ctx.lineTo(62, 98);
        ctx.lineTo(150, 98);
        ctx.lineTo(150, 77);
        ctx.lineTo(62, 77);
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = "rgba(0, 0, 200, 0.08)";
        ctx.fillRect(62, 77, 88, 21);

        ctx.fillStyle = "rgba(0, 0, 200, 0.3)";
        ctx.fillRect(62, 29, 88, 44);
        
        ctx.fillStyle = "rgba(0, 70, 0, 1)";
        ctx.font = "9px Arial";
        ctx.fillText('Terminal OS v. 1.0', 66, 85);
        ctx.fillText('>_', 66, 95);
    },
    _startApp2: function () {
        this._showApp2();
        this._onXstarted();
    },
    _onXstarted: function () {
        this.statusX = 'started';
        window.setTimeout(this.delegates.startscroll, 3000);
    },
    _scrollData: function () {
        if (this.statusX != 'off') {
            window.setTimeout(this.delegates.scroll, this.refreshRate);
        }
    },
    _scrollDataRow: function () {
        this.data[0].shiftAndAdd();
        this._showDataRow();

        this._scrollData();
    },
    _showDataRow: function () {
        var i, ctx;

        this._clearX();
        this._showApp1();
        this._showApp2();

        ctx = this.canvasElement.getContext("2d");
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.font = "9px Arial";
        for (i = 0; i < this.data.length; i++) {
            ctx.fillText(this.data[i].join(''), 66, (i * 10) + 40);
        }
        this.data.shiftAndAdd();
    },
    _startOS: function () {
        if ((typeof HTMLCanvasElement) == "undefined") {
            return;
        }
        this.initialize();
    }
};

function TerminalOS_Start() {
    terminalOS._startOS();
}

