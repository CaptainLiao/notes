/**
  装饰者设计模式：
    在不改变类原有方法的前提下，丰富方法的能力

  假设我们要实现两种 car：
    首先我们创建一个含有 assemble 方法的接口 Car；
    接着创建一个实现接口 Car 的 BaseCar 类；
    最终，创建两个继承于 BaseCar 的 SportsCar 和 LuxuryCar;

    如下：
          Car 
        BaseCar
  SportsCar LuxuryCar  

  如果我们想在【运行时】，得到一辆同时包含 sport 和 luxury 功能的小车，要怎么做？
  如果还想指定装配的顺序呢？
  如果我们有很多辆车，又该如何实现上面的功能？

  要解决这些问题，我们需要使用装饰者设计模式。
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
