import java.io.Console;
class Program {

  public static void main(String[] args) throws Exception {

    String A = readDataFromConsole("请输入第一个数字:");
    String B = readDataFromConsole("请输入一个运算符（+-*/）：");
    String C = readDataFromConsole("请输入第二个数字：");
    Float D = Float.parseFloat(A) + Float.parseFloat(C);

    try {
      switch(B) {
        case "+":
          D = Float.parseFloat(A) + Float.parseFloat(C);
          break;
        case "-":
          D = Float.parseFloat(A) - Float.parseFloat(C);
          break;
        case "*":
          D = Float.parseFloat(A) * Float.parseFloat(C);
          break;
        case "/":
          D = Float.parseFloat(A) / Float.parseFloat(C);
          break;
      }
    } catch(Exception e) {
      System.out.print("输入的字符串必须能够转化为数字！"+ e );
      e.printStackTrace();
    }

    System.out.print("本次计算的结果是: " + D);
  }

  private static String readDataFromConsole(String prompt) {
    Console console = System.console();

    if( console == null) {
      throw new IllegalStateException("Console is Illegal");
    }

    return console.readLine(prompt);
  }
}