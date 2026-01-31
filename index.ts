import { Circle, Triangle } from "./GeometryLibrary";
import type { ShapeCalculateEvent } from "./GeometryLibrary";


// ########################## Круг ##########################

const circle = new Circle(10, "red");

circle.addEventListener("calculate_area", ((event: ShapeCalculateEvent) => {
  console.log(`Площадь: ${event.detail.result.toFixed(2)}`);
}) as EventListener);

circle.addEventListener("calculate_perimeter", ((
  event: ShapeCalculateEvent,
) => {
  console.log(`Периметр: ${event.detail.result.toFixed(2)}`);
}) as EventListener);

circle.getArea();
circle.getPerimeter();


// ########################## Треугольник ##########################

const triangle = new Triangle(10, 20, 30, "blue");

triangle.addEventListener("calculate_area", ((event: ShapeCalculateEvent) => {
  console.log(`Площадь: ${event.detail.result.toFixed(2)}`);
}) as EventListener);

triangle.addEventListener("calculate_perimeter", ((
  event: ShapeCalculateEvent,
) => {
  console.log(`Периметр: ${event.detail.result.toFixed(2)}`);
}) as EventListener);

triangle.getArea();
triangle.getPerimeter();
