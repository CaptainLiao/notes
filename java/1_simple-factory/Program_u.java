public class Program_u {
  // Operation 运算类
  public static class Operation {
    private Double _numberA = 0d;
    private Double _numberB = 0d;

    public Double getNumberA() {
      return this._numberA;
    }
    public void setNumberA(Double A) {
      this._numberA = A;
    }

    public Double getNumberB() {
      return this._numberB;
    }
    public void setNumberB(Double B) {
      this._numberB = B;
    }

    // 虚方法
    public Double getResult() {
      Double result = 0d;
      return result;
    }
  }

  // 加减乘除类
  public static class OperationAdd extends Operation {
    public Double getResult() {
      Double result = 0d;
      result = getNumberA() + getNumberB();
      return result;
    }
  }

  public static class OperationSub extends Operation {
    public Double getResult() {
      Double result = 0d;
      result = getNumberA() - getNumberB();
      return result;
    }
  }

  public static class OperationFactory {
    public static Operation createOperate(String operate) {
      Operation oper = null;
      switch (operate) {
        case "+":
          oper = new OperationAdd();
          break;
        case "-":
          oper = new OperationSub();
          break;
      }

      return oper;
    }
  }

  public static void main(String[] args) {
    Operation oper;
    oper = OperationFactory.createOperate("+");
    oper.setNumberA(1.0);
    oper.setNumberB(2.0);
    Double result = oper.getResult();

    System.out.print("result is :" + result);
  }

}