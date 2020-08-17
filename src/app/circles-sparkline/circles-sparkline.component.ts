import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-circles-sparkline',
  templateUrl: './circles-sparkline.component.html',
  styleUrls: ['./circles-sparkline.component.scss'],
})
export class CirclesSparklineComponent implements OnInit, AfterViewInit {
  @Input() width: number;
  @Input() height: number;
  @Input() strokeWidth: number;
  @Input() data: string;
  @Input() id: string = `circles_sparkline`;
  @Input() class: string = ``;

  private fill: any;
  private path: any;

  constructor() {}

  ngOnInit() {
    const inputData = JSON.parse(this.data) as Array<number>;

    this.strokeWidth = +this.strokeWidth;
    const spotRadius = 2;
    const spotDiameter = spotRadius * 2;
    const values = inputData;
    const width = this.width - spotDiameter * 2;
    const fullHeight = this.height;
    const height = fullHeight - this.strokeWidth * 2 - spotDiameter;
    const max = Math.max(...values);
    const lastItemIndex = values.length - 1;
    const offset = width / lastItemIndex;
    const datapoints = [];

    const pathY = this.getY(
      max,
      height,
      this.strokeWidth + spotRadius,
      values[0]
    );

    let pathCoords = `M${spotDiameter} ${pathY}`;

    values.forEach((value, index) => {
      const x = index * offset + spotDiameter;
      const y = this.getY(max, height, this.strokeWidth + spotRadius, value);

      datapoints.push(
        Object.assign({}, this.data[index], {
          index: index,
          x: x,
          y: y,
        })
      );

      pathCoords += ` L ${x} ${y}`;
    });

    this.path = this.buildElement('path', {
      class: 'circles-sparkline-path',
      d: pathCoords,
      fill: 'none',
    });

    let fillCoords = `${pathCoords} V ${fullHeight} L ${spotDiameter} ${fullHeight} Z`;

    this.fill = this.buildElement('path', {
      class: 'circles-sparkline-fill',
      d: fillCoords,
      stroke: 'none',
    });
  }

  ngAfterViewInit() {
    const svg = document.querySelector(`svg#${this.id}`);

    svg.appendChild(this.fill);
    svg.appendChild(this.path);
  }

  getY(max, height, diff, value) {
    return parseFloat((height - (value * height) / max + diff).toFixed(2));
  }

  buildElement(tag, attrs) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', tag);

    for (let name in attrs) {
      element.setAttribute(name, attrs[name]);
    }

    return element;
  }
}
