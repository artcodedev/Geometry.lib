/*
 * Базовый интерфейс для событий, возвращаю результа чило вычислений
 */
export interface ShapeCalculateEvent extends CustomEvent<{ result: number }> {}

/*
 * Цвет заливки фигуры.
 */
type ShapeColor = "red" | "blue" | "green" | "gray";

/*
 * Базовый интерфейс для всех фигур 2D которые подойдет для всех фигур.
 * Добавил еще цвет, для "псевдо заливки" фигуры.
 */
interface IGeometryShape {
  readonly type: string;
  readonly color: ShapeColor;
  getArea(): Promise<number>;
  getPerimeter(): Promise<number>;
}

/*
 * Абстрактный класс костяк для интерфейса IGeometryShape и класса EventTarget для собитий
 */
abstract class GeometryShape extends EventTarget implements IGeometryShape {
  public abstract readonly type: string;
  public abstract readonly color: ShapeColor;

  public abstract getArea(): Promise<number>;
  public abstract getPerimeter(): Promise<number>;

  protected validatePositive(...values: number[]): void {
    for (const val of values) {
      if (val <= 0) {
        throw new Error(`[${this.type}]: Параметры должны быть больше нуля.`);
      }
    }
  }

  protected emitCalculateArea(result: number): void {
    const event = new CustomEvent("calculate_area", { detail: { result } });
    this.dispatchEvent(event);
  }

  protected emitCalculatePerimeter(result: number): void {
    const event = new CustomEvent("calculate_perimeter", {
      detail: { result },
    });
    this.dispatchEvent(event);
  }
}

/*
 * Пример класса прямоугольник
 */
export class Rectangle extends GeometryShape {
  public readonly type = "Rectangle";
  public readonly width: number;
  public readonly height: number;
  public readonly color: ShapeColor;

  constructor(width: number, height: number, color: ShapeColor) {
    super();
    this.width = width;
    this.height = height;
    this.color = color;
    this.validatePositive(width, height);
  }

  public async getArea(): Promise<number> {
    const area = this.width * this.height;
    this.emitCalculateArea(area);
    return area;
  }

  public async getPerimeter(): Promise<number> {
    const perimeter = 2 * (this.width + this.height);
    this.emitCalculatePerimeter(perimeter);
    return perimeter;
  }
}

/*
 * Пример класса круг
 */
export class Circle extends GeometryShape {
  public readonly type = "Circle";
  public readonly radius: number;
  public readonly color: ShapeColor;

  constructor(radius: number, color: ShapeColor) {
    super();
    this.radius = radius;
    this.color = color;
    this.validatePositive(radius);
  }

  public async getArea(): Promise<number> {
    const area = Math.PI * Math.pow(this.radius, 2);
    this.emitCalculateArea(area);
    return area;
  }

  public async getDiameter(): Promise<number> {
    return this.radius * 2;
  }

  public async getPerimeter(): Promise<number> {
    const perimeter = 2 * Math.PI * this.radius;
    this.emitCalculatePerimeter(perimeter);
    return perimeter;
  }
}

/*
 * Пример класса треугольник
 */
export class Triangle extends GeometryShape {
  public readonly type = "Triangle";
  public readonly a: number;
  public readonly b: number;
  public readonly c: number;
  public readonly color: ShapeColor;

  constructor(a: number, b: number, c: number, color: ShapeColor) {
    super();
    this.a = a;
    this.b = b;
    this.c = c;
    this.color = color;
    this.validatePositive(a, b, c);
    if (a + b <= c || a + c <= b || b + c <= a) {
      throw new Error("Треугольник с такими сторонами не существует.");
    }
  }

  public async getArea(): Promise<number> {
    const p = (this.a + this.b + this.c) / 2;
    const area = Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
    this.emitCalculateArea(area);
    return area;
  }

  public async getPerimeter(): Promise<number> {
    const perimeter = this.a + this.b + this.c;
    this.emitCalculatePerimeter(perimeter);
    return perimeter;
  }
}

/*
 * Пример класса ромб
 */
export class Rhombus extends GeometryShape {
  public readonly type = "Rhombus";
  public readonly a: number;
  public readonly h: number;
  public readonly color: ShapeColor;

  constructor(a: number, h: number, color: ShapeColor) {
    super();
    this.a = a;
    this.h = h;
    this.color = color;

    this.validatePositive(a, h);

    if (h > a) {
      throw new Error("Высота не может быть больше стороны.");
    }
  }

  public async getArea(): Promise<number> {
    const area = this.a * this.h;
    this.emitCalculateArea(area);
    return area;
  }

  public async getPerimeter(): Promise<number> {
    const perimeter = this.a * 4;
    this.emitCalculatePerimeter(perimeter);
    return perimeter;
  }
}
