/**
  装饰者设计模式：
    在不改变类原有方法的前提下，丰富方法的能力
 */

public interface Car {
  public void assemble();
}

public class BaseCar implements Car {
  @Override
  public void assemble() {
    System.out.print("Basic Car.");
  }
}


// deractor base class
public class CarDeractor implements Car {

  protected Car car;
  public CarDeractor(Car car) {
    this.car = car;
  }

  @Override
  public void assemble() {
    this.car.assemble();
  }
}



public class SportsCar implements CarDeractor {
  public SportsCar(Car car) {
    super(car);
  }

  @Override
  public void assemble() {
    super.assemble();
    System.out.print("add features of SportsCar Car.");
  }
}

public class LuxuryCar extends CarDecorator {

	public LuxuryCar(Car c) {
		super(c);
	}
	
	@Override
	public void assemble(){
		super.assemble();
		System.out.print(" Adding features of Luxury Car.");
	}
}


// test
public class DecoratorPatternTest {

	public static void main(String[] args) {
		Car sportsCar = new SportsCar(new BasicCar());
		sportsCar.assemble();
		System.out.println("\n*****");
		
		Car sportsLuxuryCar = new SportsCar(new LuxuryCar(new BasicCar()));
		sportsLuxuryCar.assemble();
	}

}
