public class BitCount {
  public int[] countBits(int num) {
    int[] arr = new int[num+1];
    for (int i = 1; i <= num; ++i) {
      arr[i] = arr[i&(i-1)] + 1;
    }

    return arr;
  }
}