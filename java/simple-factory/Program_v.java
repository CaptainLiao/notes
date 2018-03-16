import java.io.Console;

public class Program_v {

  public static class Opteration {
    public static Float GetResult( Float numberA, Float numberB, String opterate) {
      Float result = 0f;
      switch(opterate) {
        case "+":
          result = numberA + numberB;
          break;
        case "-":
          result = numberA - numberB;
          break;
        case "*":
          result = numberA * numberB;
          break;
        case "/":
          result = numberA / numberB;
          break;
      }

      return result;
    }
  }

  private static String readDataFromConsole(String prompt) {
    Console console = System.console();

    return console.readLine(prompt);
  }

  public static void main(String[] args) {
    try {
      String strNumberA = readDataFromConsole("请输入第一个数字:");
      String opterate = readDataFromConsole("请输入一个运算符（+-*/）：");
      String strNumberB = readDataFromConsole("请输入第二个数字：");

      Float result = Opteration.GetResult( 
        Float.parseFloat(strNumberA),
        Float.parseFloat(strNumberB), 
        opterate
      );

      System.out.print("本次计算的结果是: " + result);
    } catch( Exception e ) {
      System.out.print("您的输入有误："+ e);
    }
  }
}